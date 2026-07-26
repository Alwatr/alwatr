/**
 * @alwatr/weaver — the loom-aware convenience facade.
 *
 * The core (`@alwatr/weaver`) is render-agnostic: you hand `Weaver` a `render()` function and
 * it owns bundling, serving and disk output. This adapter is the one place weaver couples to
 * loom: pass your page registry and `weave` renders it with loom's `buildSite`, then runs the
 * same build/serve CLI. Importing this subpath is opt-in, so the core stays loom-free.
 *
 *   // src/weaver.ts
 *   import {weave} from '@alwatr/weaver';
 *   import {pages} from './site.ts';
 *   await weave({pages, publicDir: 'public', scripts: ['src/main.ts'], styles: ['src/main.css']});
 *
 * Freshness in dev comes from the process, not from re-bundling: run it under Bun's watcher
 * (`bun --watch src/weaver.ts serve`) and a source change restarts the process, re-importing
 * `site.ts` (and every page) from scratch — so passing the live `pages` array is always fresh.
 */
import {buildSite} from '@alwatr/loom';
import type {Page} from '@alwatr/loom';

import {Weaver} from './weaver.js';
import type {WeaverConfig} from './type.js';

/** The loom-aware config: a page registry plus the core's build/serve options (minus `render`). */
export interface WeaveConfig extends Omit<WeaverConfig, 'render'> {
  /** The page registry — your `site.ts`'s `pages`. Rendered in memory with loom's `buildSite`. */
  pages: Page[];
}

/**
 * Render `pages` with loom and run weaver's build/serve CLI over the result.
 *
 * A thin wrapper around `new Weaver({render: () => buildSite({pages}), ...}).run(...)` — it
 * exists only so apps never have to hand-write the render thunk (the old `build_site.ts`).
 */
export async function weave(config: WeaveConfig): Promise<void> {
  const {pages, ...weaverConfig} = config;
  await new Weaver({
    ...weaverConfig,
    // buildSite runs with no outDir, so it returns rendered `{permalink, html}` in memory —
    // structurally a RenderResult[], which weaver then owns (serve from memory / write to disk).
    render: () => buildSite({pages}),
  }).run(Bun.argv.slice(2));
}
