/**
 * @alwatr/loom — the build.
 *
 * Renders an explicit list of pages to HTML and writes the static site to disk.
 * Page discovery is the caller's job: import each page and list it in `pages`.
 * No globbing, no dynamic import, no file-system magic — the route set is a plain,
 * statically-analyzable array, so the bundler and your editor can see every page.
 */
import {access, cp, mkdir, writeFile} from 'node:fs/promises';
import {dirname, extname, isAbsolute, join, relative, resolve} from 'node:path';

import {render} from './render.js';
import type {Page} from './page.js';

export interface SiteConfig {
  /** Every page to render, in any order. Spread collections with `...`. */
  pages: Page[];
  /** Directory the static site is written to (cleaned on each build). Resolved from cwd. */
  outDir?: string;
  /** Optional directory copied verbatim into `outDir` before rendering. Resolved from cwd. */
  publicDir?: string;
  /** Optional post-processing hook, e.g. HTML minification. */
  transform?: (html: string, page: Page) => string | Promise<string>;
}

export interface BuildResult {
  /** The page permalink. */
  permalink: string;
  /** The generated HTML content (only present when outDir is disabled). */
  html?: string;
  /** The final output file path (only present when outDir is enabled). */
  filePath?: string;
}

/** Identity helper that gives a site config its type and editor support. */
export const defineSite = (config: SiteConfig): SiteConfig => config;

/** Render every page in `config.pages` and write the result to `outDir` if provided. */
export async function buildSite(config: SiteConfig): Promise<BuildResult[]> {
  console.log('\n🧵 loom: building…\n');
  const outDir = config.outDir != null ? resolve(config.outDir) : null;

  if (outDir != null) {
    // outDir is intentionally NOT wiped on each build: a caller may share it with another
    // generator (e.g. weaver during an njk→tsx migration), where a clean would delete the
    // other tool's output. Re-enable the line below once loom owns the directory exclusively.
    // await rm(outDir, { recursive: true, force: true });
    await mkdir(outDir, {recursive: true});

    if (config.publicDir != null) {
      const publicDir = resolve(config.publicDir);
      const publicExists = await access(publicDir).then(
        () => true,
        () => false,
      );
      if (publicExists) await cp(publicDir, outDir, {recursive: true, force: true});
    }
  }

  const results: BuildResult[] = [];

  for (const page of config.pages) {
    let html = render(page.render());
    if (config.transform != null) html = await config.transform(html, page);

    const resultItem: BuildResult = {
      permalink: page.permalink,
    };

    if (outDir == null) {
      resultItem.html = html;
    } else {
      const filePath = permalinkToPath(outDir, page.permalink);
      await mkdir(dirname(filePath), {recursive: true});
      await writeFile(filePath, html);
      resultItem.filePath = filePath;
      console.log(`       → ${page.permalink.padEnd(24)} ${filePath}`);
    }

    results.push(resultItem);
  }

  console.log(`\n✅ build complete ${results.length} pages\n`);
  return results;
}

/**
 * Map a permalink to an output file path (directory permalinks get `index.html`).
 * Guards against directory traversal: a permalink built from external data must
 * never resolve outside `outDir`.
 */
function permalinkToPath(outDir: string, permalink: string): string {
  let path = permalink.replace(/^\/+/, '');
  if (path === '' || permalink.endsWith('/')) path += 'index.html';
  else if (extname(path) === '') path += '/index.html';

  const filePath = join(outDir, path);
  const rel = relative(outDir, filePath);
  if (rel === '' || rel.startsWith('..') || isAbsolute(rel)) {
    throw new Error(`loom: permalink "${permalink}" resolves outside the output directory`);
  }
  return filePath;
}
