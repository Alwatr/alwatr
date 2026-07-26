/**
 * @alwatr/weaver — the build factory.
 *
 * `Weaver` composes the pieces a renderer leaves out of scope: it bundles client JS (Bun),
 * builds CSS (Bun + Tailwind), takes rendered HTML from the app's `render()` function, copies
 * static assets, optionally minifies, and — in dev — serves everything from memory.
 *
 * Watch strategy (KISS): weaver runs no file watcher of its own. Start the dev server under
 * Bun's native watcher — `bun --watch src/weaver.ts serve` — and Bun restarts the process on
 * any source change. A fresh process re-imports the entire module graph (pages, partials, the
 * renderer), so every rebuild reflects the latest source with zero temp files, zero re-bundling
 * and no stale module cache. The browser reconnects to the live-reload socket and reloads when
 * it sees a new build id.
 */
import {watch} from 'node:fs';
import {access, cp, mkdir, rm} from 'node:fs/promises';
import {networkInterfaces} from 'node:os';
import type {NetworkInterfaceInfo} from 'node:os';
import {dirname, extname, isAbsolute, join, relative, resolve} from 'node:path';

import {createLogger, platformInfo} from '@alwatr/core';
import tailwindPlugin from 'bun-plugin-tailwind';
import type {BuildArtifact, Server, ServerWebSocket} from 'bun';

import {helpText, parseArgs, version} from './cli.js';
import {injectReloadScript, reloadPath, reloadTopic} from './reload-client.js';
import type {Artifact, RenderResult, WeaverConfig} from './type.js';

/**
 * Extensions that trigger an in-process bundler-input rebuild in serve mode. Deliberately
 * excludes `.tsx`: those are render/page templates, owned by `bun --watch`'s process restart
 * (re-rendering them in-process would need a fresh module graph, which only a restart gives).
 * `.css` → styles; `.ts`/`.js`/`.mjs` → scripts (+ styles, since lit `html` templates in `.ts`
 * carry Tailwind classes).
 */
const INPUT_WATCH_EXTENSIONS = new Set(['.css', '.ts', '.js', '.mjs']);

/** Directory names never reacted to when watching inputs — keeps the watch cheap and quiet. */
const WATCH_IGNORE_DIRS = new Set(['node_modules', 'dist', 'deploy', 'coverage', '.cache']);

/** The normalized configuration with every default resolved — the factory's source of truth. */
interface ResolvedConfig {
  render: () => RenderResult[] | Promise<RenderResult[]>;
  outDir: string;
  publicDir?: string;
  scripts: string[];
  styles: string[];
  watch: string[];
  banner: string;
}

/** A served route (rendered page) plus the exact content-type to emit. */
interface RouteEntry {
  body: string;
  type: string;
}

/** HTML minify settings (production only) — mirrors the previous weaver's @swc/html profile. */
// const SWC_HTML_OPTIONS: SwcHtmlOptions = {
//   forceSetHtml5Doctype: true,
//   quotes: true,
//   collapseWhitespaces: 'smart',
//   removeEmptyMetadataElements: true,
//   removeComments: true,
//   preserveComments: [],
//   normalizeAttributes: true,
//   minifyJs: true,
//   minifyCss: true,
//   sortAttributes: true,
//   tagOmission: false,
//   selfClosingVoidElements: true,
//   sortSpaceSeparatedAttributeValues: false,
// };

export class Weaver {
  protected readonly logger_ = createLogger('weaver');
  protected readonly config_: ResolvedConfig;

  // --- runtime flags, defaulted here and overridden by `run()` from the CLI ---
  protected prod_ = !platformInfo.development;
  protected reload_ = false;
  protected verbose_ = false;
  protected port_: number;
  protected host_: string;

  /**
   * Unique per process run. Sent to the browser when the live-reload socket opens; a new id
   * after a reconnect means `bun --watch` restarted us, so the page reloads. (See reload-client.)
   */
  protected readonly buildId__ = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  // --- build state, served from memory in dev ---
  protected scriptArtifacts_ = new Map<string, Artifact>();
  protected styleArtifacts_ = new Map<string, Artifact>();
  protected htmlResults_: RenderResult[] = [];
  protected htmlRoutes_ = new Map<string, RouteEntry>();
  protected server__: Server<undefined> | undefined;

  // --- per-phase timings, surfaced in the build report ---
  protected renderMs_ = 0;
  protected scriptsMs_ = 0;
  protected stylesMs_ = 0;

  // --- input-watch debounce/coalescing (serve mode only) ---
  private pendingExt__ = new Set<string>();
  private debounce__: ReturnType<typeof setTimeout> | undefined;
  private rebuilding__ = false;

  constructor(config: WeaverConfig) {
    this.config_ = {
      render: config.render,
      outDir: config.outDir ?? 'deploy/dist',
      publicDir: config.publicDir,
      scripts: config.scripts ?? [],
      styles: config.styles ?? [],
      watch: config.watch ?? ['src'],
      banner: config.banner ?? '/* Alwatr Weaver Kit */',
    };
    this.port_ = config.port ?? (process.env.PORT != null ? Number(process.env.PORT) : 3000);
    this.host_ = config.host ?? '0.0.0.0';
  }

  /** CLI entry point: parse argv and dispatch to the matching command. */
  async run(argv: readonly string[]): Promise<void> {
    const args = parseArgs(argv);

    if (args.command === 'help') {
      console.log(helpText);
      return;
    }
    if (args.command === 'version') {
      console.log(`@alwatr/weaver v${version}`);
      return;
    }

    // Resolve dev/prod: explicit flags win, otherwise follow NODE_ENV.
    this.prod_ =
      args.prod ? true
      : args.dev ? false
      : !platformInfo.development;
    this.verbose_ = args.verbose;
    if (args.port != null) this.port_ = args.port;
    if (args.host != null) this.host_ = args.host;
    if (args.out != null) this.config_.outDir = args.out;

    if (args.command === 'serve') {
      this.reload_ = !args.noReload;
      await this.serve();
    } else {
      await this.build();
    }
  }

  /** One-shot build: render everything in memory, then write it to `outDir`. */
  async build(): Promise<void> {
    const startTime = performance.now();
    await this.buildAll_();
    await this.writeToDisk_();
    this.printReport_('build', performance.now() - startTime);
  }

  /**
   * Dev server: build into memory, then serve it. No internal watcher — run this under
   * `bun --watch` and the process restarts (rebuilding from fresh source) on every change.
   */
  async serve(): Promise<void> {
    const startTime = performance.now();
    await this.buildAll_();
    this.startServer__();
    this.printReport_('serve', performance.now() - startTime);
    this.printServerBanner__();
    this.startInputWatch__();
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Builders
  // ──────────────────────────────────────────────────────────────────────────

  /** Render HTML + bundle scripts + bundle styles, in parallel. */
  protected async buildAll_(): Promise<void> {
    await Promise.all([this.renderAndStore_(), this.buildScripts_(), this.buildStyles_()]);
  }

  /** Run the app's render function and store the served route map (live-reload injected in dev). */
  protected async renderAndStore_(): Promise<void> {
    this.logger_.logMethod?.('renderAndStore');
    const startTime = performance.now();

    const results = await this.config_.render();
    this.htmlResults_ = results;

    const routes = new Map<string, RouteEntry>();
    for (const result of results) {
      const isHtml = this.isHtmlPermalink__(result.permalink);
      let body = result.html ?? '';
      if (isHtml && this.reload_) body = injectReloadScript(body);
      const type = isHtml ? 'text/html; charset=utf-8' : this.contentType__(result.permalink);
      for (const key of this.routeKeys__(result.permalink)) routes.set(key, {body, type});
    }
    this.htmlRoutes_ = routes;
    this.renderMs_ = performance.now() - startTime;
  }

  /** Bundle client TypeScript entrypoints to ESM (browser target). */
  protected async buildScripts_(): Promise<void> {
    if (this.config_.scripts.length === 0) {
      this.scriptArtifacts_.clear();
      return;
    }
    this.logger_.logMethod?.('buildScripts');
    const startTime = performance.now();

    const built = await Bun.build({
      entrypoints: this.config_.scripts,
      target: 'browser',
      format: 'esm',
      packages: 'bundle',
      minify: this.prod_,
      sourcemap: this.prod_ ? 'none' : 'linked',
      define: {DEV_MODE: JSON.stringify(!this.prod_)},
      banner: this.config_.banner,
    });
    if (!built.success) {
      this.logBuildErrors__('buildScripts', built.logs);
      return;
    }
    this.scriptArtifacts_ = this.collectArtifacts__(built.outputs);
    this.scriptsMs_ = performance.now() - startTime;
  }

  /** Bundle CSS entrypoints through the Tailwind plugin. */
  protected async buildStyles_(): Promise<void> {
    if (this.config_.styles.length === 0) {
      this.styleArtifacts_.clear();
      return;
    }
    this.logger_.logMethod?.('buildStyles');
    const startTime = performance.now();

    const built = await Bun.build({
      entrypoints: this.config_.styles,
      target: 'browser',
      packages: 'bundle',
      plugins: [tailwindPlugin],
      minify: this.prod_,
      sourcemap: this.prod_ ? 'none' : 'linked',
      banner: this.config_.banner,
    });
    if (!built.success) {
      this.logBuildErrors__('buildStyles', built.logs);
      return;
    }
    this.styleArtifacts_ = this.collectArtifacts__(built.outputs);
    this.stylesMs_ = performance.now() - startTime;
  }

  /** Turn Bun build outputs into served/writable artifacts keyed by URL path. */
  private collectArtifacts__(outputs: readonly BuildArtifact[]): Map<string, Artifact> {
    const map = new Map<string, Artifact>();
    for (const output of outputs) {
      const path = this.toUrlPath__(output.path);
      map.set(path, {path, blob: output, type: this.contentType__(path, output.type)});
    }
    return map;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Disk output
  // ──────────────────────────────────────────────────────────────────────────

  /** Write the rendered site + assets + static files to `outDir` (wiping it first). */
  protected async writeToDisk_(): Promise<void> {
    const outDir = resolve(this.config_.outDir);
    await rm(outDir, {recursive: true, force: true});
    await mkdir(outDir, {recursive: true});

    if (this.config_.publicDir != null) {
      const publicDir = resolve(this.config_.publicDir);
      if (await this.exists__(publicDir)) {
        await cp(publicDir, outDir, {recursive: true, force: true});
      }
    }

    for (const result of this.htmlResults_) {
      let html = result.html ?? '';
      // if (this.prod_ && this.isHtmlPermalink__(result.permalink)) html = await this.minifyHtml__(html);
      const filePath = this.permalinkToPath__(outDir, result.permalink);
      await mkdir(dirname(filePath), {recursive: true});
      await Bun.write(filePath, html);
    }

    for (const artifact of [...this.scriptArtifacts_.values(), ...this.styleArtifacts_.values()]) {
      await Bun.write(join(outDir, artifact.path), artifact.blob);
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Dev server (in-memory)
  // ──────────────────────────────────────────────────────────────────────────

  protected startServer__(): void {
    this.server__ = Bun.serve({
      hostname: this.host_,
      port: this.port_,
      development: true,
      // Arrow functions close over `this` lexically — no aliasing needed.
      fetch: (request, server) => this.handleRequest__(request, server),
      websocket: {
        // Live-reload is server→client only: subscribe for in-process JS/CSS rebuild signals
        // and announce this run's build id (for restart detection). Inbound is ignored.
        open: (ws: ServerWebSocket<undefined>) => {
          ws.subscribe(reloadTopic);
          ws.send(this.buildId__);
        },
        message: () => undefined,
      },
    });
  }

  /** Resolve a request to an in-memory artifact, a rendered route, a static file, or 404. */
  protected async handleRequest__(request: Request, server: Server<undefined>): Promise<Response | undefined> {
    const url = new URL(request.url);
    const pathname = decodeURIComponent(url.pathname);

    // Live-reload WebSocket upgrade.
    if (pathname === reloadPath) {
      if (server.upgrade(request)) return undefined;
      return new Response('expected websocket', {status: 426});
    }

    // Bundled assets (JS, CSS, fonts, sourcemaps).
    const asset = this.scriptArtifacts_.get(pathname) ?? this.styleArtifacts_.get(pathname);
    if (asset != null) {
      return new Response(asset.blob, {headers: {'content-type': asset.type}});
    }

    // Rendered routes (HTML, web manifest, …).
    const route = this.htmlRoutes_.get(pathname) ?? this.htmlRoutes_.get(pathname + '/');
    if (route != null) {
      this.logger_.logMethodArgs?.('serve', pathname);
      return new Response(route.body, {headers: {'content-type': route.type}});
    }

    // Static files served straight from the public directory.
    if (this.config_.publicDir != null) {
      const file = Bun.file(join(resolve(this.config_.publicDir), pathname));
      if (await file.exists()) return new Response(file);
    }

    this.logger_.incident?.('handleRequest', 'not_found', {pathname});
    return new Response('Not Found', {status: 404});
  }

  protected printServerBanner__(): void {
    const interfaces = Object.values(networkInterfaces()).flat() as NetworkInterfaceInfo[];
    const lan = interfaces
      .filter((info) => info.family === 'IPv4' && !info.internal)
      .map((info) => `   ↠ http://${info.address}:${this.port_}`);
    console.log(`\n   ↠ http://localhost:${this.port_}`);
    if (lan.length > 0) console.log(lan.join('\n'));
    console.log(`   live-reload: ${this.reload_ ? 'on' : 'off'}  ·  watch with: bun --watch src/weaver.ts serve\n`);
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Input watch (serve) — client JS + CSS only; bun --watch owns the page/render graph
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * Watch the bundler-input roots and rebuild scripts/styles on change.
   *
   * This covers exactly what `bun --watch` cannot: the `Bun.build` entrypoints (and their import
   * graphs) are not part of *this* process's module graph, so a restart watcher never sees them.
   * Page/render changes (`.tsx`, loom) are intentionally left out — they ride bun --watch's
   * process restart, which re-renders them over a fresh module graph.
   */
  protected startInputWatch__(): void {
    if (!this.reload_) return; // no client to push a reload to
    for (const root of this.config_.watch) {
      const dir = resolve(root);
      try {
        // One recursive watcher per root. Noisy paths are filtered per event (not pre-pruned),
        // so new folders are picked up automatically and setup stays O(roots).
        watch(dir, {recursive: true}, (_event, filename) => {
          if (filename == null) return;
          const path = filename.toString();
          if (this.isIgnoredPath__(path)) return;
          this.onInputEvent__(path);
        });
      } catch (error) {
        this.logger_.incident?.('startInputWatch', 'watch_failed', {dir, error});
      }
    }
    console.log(`👀 watching JS/CSS inputs: ${this.config_.watch.join(', ')}  (pages reload via bun --watch)\n`);
  }

  /** True when a path lives under an ignored directory segment (or a dotfolder). */
  private isIgnoredPath__(path: string): boolean {
    for (const segment of path.split(/[\\/]/)) {
      if (segment.startsWith('.') || WATCH_IGNORE_DIRS.has(segment)) return true;
    }
    return false;
  }

  /** Queue a debounced rebuild for the changed extension (ignores extensions we don't bundle). */
  private onInputEvent__(filename: string): void {
    const ext = extname(filename);
    if (!INPUT_WATCH_EXTENSIONS.has(ext)) return;
    this.pendingExt__.add(ext);
    if (this.debounce__ != null) clearTimeout(this.debounce__);
    this.debounce__ = setTimeout(() => void this.flushInputRebuild__(), 40);
  }

  /** Rebuild only the bundles the changed extensions affect, then live-reload the browser. */
  private async flushInputRebuild__(): Promise<void> {
    if (this.rebuilding__) return; // a rebuild is already draining the queue
    this.rebuilding__ = true;
    try {
      while (this.pendingExt__.size > 0) {
        const extensions = [...this.pendingExt__];
        this.pendingExt__.clear();

        // A `.ts`/`.js` edit can change client JS and — via Tailwind's content scan — CSS too;
        // a pure `.css` edit only touches styles. Styles are always rebuilt, scripts on demand.
        const needScripts = extensions.some((ext) => ext !== '.css');
        const tasks: Promise<void>[] = [this.buildStyles_()];
        if (needScripts) tasks.push(this.buildScripts_());

        const startTime = performance.now();
        await Promise.all(tasks);
        console.log(`🔁 rebuilt ${needScripts ? 'js+css' : 'css'} in ${Math.round(performance.now() - startTime)}ms`);
      }
    } catch (error) {
      this.logger_.accident?.('flushInputRebuild', 'rebuild_failed', error);
    } finally {
      this.rebuilding__ = false;
    }
    this.server__?.publish(reloadTopic, reloadTopic);
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Build report
  // ──────────────────────────────────────────────────────────────────────────

  /** Pretty, per-file build summary: every page/script/style with its byte size and phase timing. */
  private printReport_(phase: 'build' | 'serve', totalMs: number): void {
    // [group, label, bytes] for every emitted artifact.
    const rows: Array<[group: 'pages' | 'scripts' | 'styles', label: string, bytes: number]> = [];
    for (const result of this.htmlResults_)
      rows.push(['pages', result.permalink, Buffer.byteLength(result.html ?? '')]);
    for (const artifact of this.scriptArtifacts_.values()) rows.push(['scripts', artifact.path, artifact.blob.size]);
    for (const artifact of this.styleArtifacts_.values()) rows.push(['styles', artifact.path, artifact.blob.size]);

    const labelWidth = rows.reduce((max, [, label]) => Math.max(max, label.length), 0);
    const sizeWidth = rows.reduce((max, [, , bytes]) => Math.max(max, this.fmtSize__(bytes).length), 0);

    const lines = ['', `🧵 weaver  ·  ${this.prod_ ? 'production' : 'development'}`];
    const groups: Array<[group: 'pages' | 'scripts' | 'styles', ms: number]> = [
      ['pages', this.renderMs_],
      ['scripts', this.scriptsMs_],
      ['styles', this.stylesMs_],
    ];

    let totalBytes = 0;
    let totalFiles = 0;
    for (const [group, ms] of groups) {
      const groupRows = rows.filter(([rowGroup]) => rowGroup === group);
      if (groupRows.length === 0) continue;
      lines.push('', `  ${group}  ·  ${groupRows.length} files · ${Math.round(ms)}ms`);
      for (const [, label, bytes] of groupRows.sort((a, b) => a[1].localeCompare(b[1]))) {
        lines.push(`    ${label.padEnd(labelWidth)}   ${this.fmtSize__(bytes).padStart(sizeWidth)}`);
        totalBytes += bytes;
        totalFiles += 1;
      }
    }

    const destination = phase === 'build' ? `  →  ${this.config_.outDir}` : '';
    lines.push(
      '',
      `  Σ  ${totalFiles} files · ${this.fmtSize__(totalBytes)} · ${Math.round(totalMs)}ms${destination}`,
      '',
    );
    console.log(lines.join('\n'));
  }

  /** Human-readable byte size (`948 B`, `18.0 KB`, `1.24 MB`). */
  private fmtSize__(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Helpers
  // ──────────────────────────────────────────────────────────────────────────

  /** Whether a permalink renders an HTML document (vs. a file route like `/site.webmanifest`). */
  private isHtmlPermalink__(permalink: string): boolean {
    if (permalink === '/' || permalink.endsWith('/')) return true;
    const ext = extname(permalink);
    return ext === '' || ext === '.html';
  }

  /** Every URL key a permalink should answer to when served. */
  private routeKeys__(permalink: string): string[] {
    if (!this.isHtmlPermalink__(permalink)) return [permalink]; // file route, served as-is
    const dir = permalink.endsWith('/') ? permalink : permalink + '/';
    const keys = [dir, dir + 'index.html'];
    if (dir !== '/') keys.push(dir.slice(0, -1)); // tolerate the missing trailing slash
    return keys;
  }

  /** Map a permalink to its on-disk output path (directory routes get `index.html`). */
  private permalinkToPath__(outDir: string, permalink: string): string {
    let path = permalink.replace(/^\/+/, '');
    if (path === '' || permalink.endsWith('/')) path += 'index.html';
    else if (extname(path) === '') path += '/index.html';

    const filePath = join(outDir, path);
    const rel = relative(outDir, filePath);
    if (rel === '' || rel.startsWith('..') || isAbsolute(rel)) {
      throw new Error(`weaver: permalink "${permalink}" resolves outside the output directory`);
    }
    return filePath;
  }

  /** Normalize a Bun output path (`./main.js`) to a served URL path (`/main.js`). */
  private toUrlPath__(path: string): string {
    if (path.startsWith('./')) return '/' + path.slice(2);
    if (path.startsWith('/')) return path;
    return '/' + path;
  }

  /** Resolve a content-type from a file extension, falling back to the bundler's guess. */
  private contentType__(path: string, fallback?: string): string {
    switch (extname(path)) {
      case '.html':
        return 'text/html; charset=utf-8';
      case '.js':
      case '.mjs':
        return 'text/javascript; charset=utf-8';
      case '.css':
        return 'text/css; charset=utf-8';
      case '.json':
      case '.map':
        return 'application/json; charset=utf-8';
      case '.webmanifest':
        return 'application/manifest+json; charset=utf-8';
      case '.xml':
        return 'application/xml; charset=utf-8';
      case '.svg':
        return 'image/svg+xml';
      case '.woff2':
        return 'font/woff2';
      case '.woff':
        return 'font/woff';
      default:
        return fallback != null && fallback !== '' ? fallback : 'application/octet-stream';
    }
  }

  // private async minifyHtml__(content: string): Promise<string> {
  //   console.log('🔁 minifying HTML…', content.length);
  //   try {
  //     const result = await swcMinifyHtml(Buffer.from(content), SWC_HTML_OPTIONS);
  //     return result.code;
  //   } catch (error) {
  //     this.logger_.accident?.('minifyHtml', 'minify_failed', error);
  //     return content;
  //   }
  // }

  private async exists__(path: string): Promise<boolean> {
    return access(path).then(
      () => true,
      () => false,
    );
  }

  private logBuildErrors__(method: string, logs: readonly unknown[]): void {
    this.logger_.error(method, 'bundle_failed', {logs});
    for (const log of logs) console.error(log);
  }
}
