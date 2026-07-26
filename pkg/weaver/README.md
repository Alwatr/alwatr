# @alwatr/weaver

**weaver** is a bun-native build tool and development server for [`@alwatr/loom`](../loom)
sites. It is the _composition layer_ loom intentionally leaves out of scope: loom renders TSX
to HTML, and weaver wraps that with client-JS bundling, Tailwind CSS, static assets,
minification, an in-memory dev server, and native browser live-reload — all on Bun.

## Why a rewrite (vs. the original `@alwatr/weaver`)

|             | `@alwatr/weaver` (old)                                             | `@alwatr/weaver`                               |
| ----------- | ------------------------------------------------------------------ | ----------------------------------------------- |
| HTML engine | Eleventy / Nunjucks (`.njk`)                                       | `@alwatr/loom` (`.tsx`), in-process             |
| HTML build  | **separate child process** (to dodge 11ty's watch-mode cache bugs) | a `render()` function you supply                |
| Config      | auto-discovered `weaver.config.ts` (file magic)                    | an explicit object you construct                |
| Dev watch   | bespoke incremental watcher                                        | `bun --watch` (pages) + in-process JS/CSS watch |
| Live-reload | —                                                                  | Bun-native WebSocket + build id                 |

The old tool offloaded HTML generation to a child process **only** because Eleventy's
incremental cache went stale in watch mode. weaver sidesteps that: start the dev server under
Bun's native watcher and a page change restarts the process — a fresh process re-imports the
entire render graph (pages, partials, loom), so HTML is always current with **no temp files,
no re-bundling, and no stale module cache**. Client JS and CSS are `Bun.build` inputs that live
outside that import graph, so weaver watches them itself (see below).

## Explicit configuration — no magic

There is no config-file discovery and no dynamic config naming. Each app declares its build in
its own `src/weaver.ts`. For loom sites use the `@alwatr/weaver` facade: hand it the page
registry and it renders with loom's `buildSite`, then runs the CLI.

```ts
// app/<name>/src/weaver.ts
import {weave} from '@alwatr/weaver';

import {pages} from './site.js';

await weave({
  pages,
  outDir: 'deploy/dist',
  publicDir: 'public',
  scripts: ['src/main.ts'],
  styles: ['src/main.css'],
});
```

```ts
// app/<name>/src/site.ts — a pure page registry, nothing else
import type {Page} from '@alwatr/loom';

import {aboutPage} from './page/about.jsx';
// …

export const pages: Page[] = [aboutPage /* … */];
```

Because freshness comes from the process restart (not from re-bundling), passing the live
`pages` array is always current in watch mode.

### Render-agnostic core

The core (`@alwatr/weaver`) never imports loom. It takes a `render()` function returning
`{permalink, html}[]`; the `/loom` subpath is the one place weaver couples to loom. Non-loom
callers use the core directly:

```ts
import {Weaver} from '@alwatr/weaver';

await new Weaver({
  render: () => myRenderer(), // () => RenderResult[] | Promise<RenderResult[]>
  outDir: 'dist',
  scripts: ['src/main.ts'],
  styles: ['src/main.css'],
}).run(Bun.argv.slice(2));
```

## CLI

```bash
bun src/weaver.ts build                  # one-shot build to outDir (honors NODE_ENV)
NODE_ENV=production bun src/weaver.ts build
bun --watch src/weaver.ts serve          # dev server :3000, live-reload, restart-on-change
bun --watch src/weaver.ts serve -p 8080  # dev server :8080
bun src/weaver.ts --help
```

| Option                       | Meaning                                                                       |
| ---------------------------- | ----------------------------------------------------------------------------- |
| `build` (default)            | Build the site to disk.                                                       |
| `-s`, `--serve`              | In-memory dev server + live-reload. Run under `bun --watch` for the dev loop. |
| `--prod` / `--dev`           | Force production / development output.                                        |
| `-p`, `--port <n>`           | Dev server port (default `PORT` env or `3000`).                               |
| `--host <h>`                 | Dev server hostname (default `0.0.0.0`).                                      |
| `--out <dir>`                | Override the output directory.                                                |
| `--no-reload`                | Disable live-reload injection.                                                |
| `-v`, `--verbose`            | Verbose logging.                                                              |
| `-h`, `--help` / `--version` | Help / version.                                                               |

## How the dev loop works

Watch is split by what each tool can actually see:

1. **Pages / render graph** (`.tsx`, loom). `bun --watch src/weaver.ts serve` lets Bun watch the
   _server's_ import graph (`site.ts` → pages → loom) and restart the process on a change —
   re-rendering over a fresh module graph. `serve` itself just builds once and serves.
2. **Client JS + CSS.** These are `Bun.build` inputs, not imports of the server process, so
   `bun --watch` can't see them. weaver watches the `watch` roots (default `['src']`) in-process
   and rebuilds only the affected bundle on change.
3. **Serves from memory.** Generated HTML/JS/CSS/fonts live in memory; nothing is written to
   `outDir`. Static files are streamed straight from `publicDir` on demand.
4. **Live-reload.** Each process run has a unique build id (restart → new id → reload); an
   in-process JS/CSS rebuild publishes a `reload` message. The injected client acts on either,
   and ignores a plain network blip (same id).

## Scope

weaver owns bundling, CSS, static copy, minification, serving, and watching its bundler
inputs (JS/CSS). loom owns TSX→HTML, and `bun --watch` owns watching the render graph. The
core is decoupled from loom — it consumes a `render()` function's plain `{permalink, html}`
output via structural typing; the `@alwatr/weaver` adapter is the single, opt-in
coupling point.
