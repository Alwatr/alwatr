/**
 * @alwatr/weaver — public & internal type contracts.
 *
 * weaver is a *composition* layer: something renders TSX into HTML, Bun bundles client JS,
 * and Tailwind builds the CSS. This file declares the single, explicit configuration surface
 * (`WeaverConfig`) plus the small internal shapes the factory passes around.
 *
 * Decoupling note: the core never imports `@alwatr/loom`. It consumes a render *function*
 * that returns a plain `{permalink, html}` list (`RenderResult`), so the two packages stay
 * independent. The loom-aware sugar lives behind the `@alwatr/weaver` subpath, the one
 * place weaver intentionally couples to loom (see `loom.ts`).
 */

declare global {
  const DEV_MODE: boolean;
}

/**
 * The explicit configuration an app hands to `new Weaver(...)`.
 *
 * Every path is resolved from the current working directory (the app folder, since
 * `package.json` scripts run there). There is no config-file discovery and no dynamic
 * config naming — the app constructs this object by hand in its own `src/weaver.ts`.
 */
export interface WeaverConfig {
  /**
   * The render function: returns the site's pages, rendered in memory — `() => RenderResult[]`
   * (sync or async). The core stays render-agnostic; the loom adapter wires `buildSite` in for
   * you (see `@alwatr/weaver`).
   *
   * Freshness in dev is not weaver's job: run the server under Bun's native watcher
   * (`bun --watch src/weaver.ts serve`) and a source change restarts the process, so this
   * function re-runs over a freshly imported module graph — no temp files, no re-bundling, no
   * stale module cache.
   */
  render: () => RenderResult[] | Promise<RenderResult[]>;

  /** Output directory for disk builds, wiped and rewritten on each `build`. Default `deploy/dist`. */
  outDir?: string;

  /** Optional directory copied verbatim into `outDir` (build) and served on demand (serve). */
  publicDir?: string;

  /** Client TypeScript entrypoints, bundled to ESM by Bun (e.g. `['src/main.ts']`). */
  scripts?: string[];

  /** CSS entrypoints, bundled by Bun with the Tailwind plugin (e.g. `['src/main.css']`). */
  styles?: string[];

  /**
   * Directories watched **in dev serve for the bundler inputs only** — client JS and CSS.
   * Default `['src']`.
   *
   * These are the files passed to `Bun.build` (scripts/styles), which are *not* part of the
   * server's import graph and so are invisible to `bun --watch`. weaver watches them itself,
   * rebuilds the affected bundle, and live-reloads. Page/render changes (`.tsx`, loom) need no
   * entry here — they ride `bun --watch`'s process restart.
   */
  watch?: string[];

  /** Dev server port. Default: `PORT` env, else `3000`. */
  port?: number;

  /** Dev server hostname. Default: `0.0.0.0`. */
  host?: string;

  /** Banner prepended to bundled JS/CSS. Default: `/* Alwatr Weaver Kit *​/`. */
  banner?: string;
}

/**
 * The render output weaver consumes — structurally identical to loom's `BuildResult`,
 * but declared locally so the core does not depend on loom (Rule 3: duck typing for decoupling).
 */
export interface RenderResult {
  /** The page route, e.g. `'/'`, `'/about/'`, `'/site.webmanifest'`. */
  permalink: string;
  /** The rendered HTML (always present: the render runs in memory, with no `outDir`). */
  html?: string;
}

/** A built asset (a Bun bundler output) ready to be served from memory or written to disk. */
export interface Artifact {
  /** URL path the asset is served at and the relative path it is written to, e.g. `/main.js`. */
  path: string;
  /** The raw bytes (a `Bun.BuildArtifact`, which is a `Blob`). */
  blob: Blob;
  /** Resolved `content-type` used when serving. */
  type: string;
}

/** What the CLI parser resolves an argv vector into. */
export interface ParsedArgs {
  command: 'build' | 'serve' | 'help' | 'version';
  /** Force production output (minify, no sourcemap, `DEV_MODE=false`). */
  prod: boolean;
  /** Force development output, overriding `NODE_ENV`. */
  dev: boolean;
  /** Disable live-reload injection in serve mode. */
  noReload: boolean;
  verbose: boolean;
  port?: number;
  host?: string;
  /** Override `outDir` for this run. */
  out?: string;
}
