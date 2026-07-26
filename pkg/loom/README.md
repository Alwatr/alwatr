# @alwatr/loom

**Loom** is a tiny, zero-dependency static site generator core. You write pages as
**TSX** components; Loom renders them to HTML strings. No React, no Preact, no
virtual DOM, no client runtime — JSX is just ergonomic syntax over functions that
return HTML.

## Why

- **Own JSX runtime** — a string renderer in ~150 lines. The whole engine is yours.
- **Zero dependencies** — pure TypeScript on Bun.
- **Auto-escaping** — dynamic text is escaped by default; opt out explicitly with `raw()`.
- **Honest HTML** — `class` (not `className`), and arbitrary attributes (`on-click`,
  `scrim-overlay`, `data-*`, `aria-*`) pass through verbatim. Great for custom elements.
- **Explicit routing** — a page exports its own `permalink`; no file-name magic.
- **Fast** — synchronous, allocation-light string concatenation.

## Setup

`tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@alwatr/loom",
  },
}
```

## Pages

A page is a **named export**: an explicit `permalink` plus a `render` thunk. The
thunk is pure — defining a page renders nothing and writes nothing.

```tsx
// src/page/about.tsx
import { definePage } from "@alwatr/loom";
import { Document } from "../layout/document.tsx";

export const aboutPage = definePage({
  permalink: "/about/",
  render: () => (
    <Document title="About">
      <h1>About</h1>
    </Document>
  ),
});
```

### Collections (one page per item — the typed replacement for pagination)

```tsx
// src/page/posts.tsx
import { collection } from "@alwatr/loom";
import { posts } from "../data/posts.js";

export const postPages = collection(posts, (post) => ({
  permalink: `/post/${post.slug}/`,
  render: () => <PostPage post={post} />,
}));
```

### Layouts, partials, data

There is no magic. A **layout** is a component that takes `children`. A **partial**
is a component you `import`. **Data** is a typed module you `import`. **Filters** are
plain functions.

## Registry & build

Routing is an **explicit registry**, not file-system discovery: you import every
page into one source-of-truth and list it. No globbing, no dynamic import — the
route set is a plain array your editor and bundler can see.

```ts
// src/site.ts — declarations only, zero side-effects
import { defineSite } from "@alwatr/loom";
import { homePage } from "./page/index.tsx";
import { aboutPage } from "./page/about.tsx";
import { postPages } from "./page/posts.tsx";

export const site = defineSite({
  // outDir is optional: if omitted, no files are written to disk
  outDir: "dist",
  publicDir: "public", // copied verbatim
  pages: [homePage, aboutPage, ...postPages],
  // transform: (html) => minify(html),   // optional post-processing hook
});
```

```ts
// build.ts — the only file that touches the disk. Run: `bun run build.ts`
import { build } from "@alwatr/loom";
import { site } from "./src/site.js";

const results = await build(site);
```

Definition (`site.ts`) is fully separate from execution (`build.ts`). Each page is
written to `<permalink>/index.html`; permalinks with an extension (e.g. `/feed.xml`)
are written as-is.

If `outDir` is omitted, `build()` will not write any files to disk. Instead, it returns the rendered pages in memory, allowing you to manually process or write them:

```ts
const results = await build({
  pages: [aboutPage],
});
// results = [{ permalink: '/about/', html: '<h1>About</h1>' }]
```

> [!TIP]
> When `outDir` is provided, the raw `html` payload is omitted (undefined) from the returned array of `BuildResult` to save RAM overhead during large builds.

## Standalone Data Pipeline

The build-time data pipeline (previously available as `@alwatr/loom/data`) has been extracted into a separate, independent package: [`@alwatr/bobbin`](../bobbin). Please use `@alwatr/bobbin` for declaring data sources, configurations, and running the data build pipeline.

## Scope

Loom renders TSX to a static site. Asset bundling (client JS, Tailwind/CSS),
minification, and a dev server are intentionally **out of scope** — compose them in
your own build script, or hang minification off the `transform` hook.

## API

| Export                    | Description                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| `definePage(page)`        | Type a single page (`{permalink, render}`).                                                |
| `collection(items, map)`  | Map a list to one page per item.                                                           |
| `defineSite(config)`      | Type a site config (`{pages, outDir, …}`).                                                 |
| `build(config)`           | Render pages. Writes to `outDir` if provided, otherwise returns `BuildResult[]` in memory. |
| `render(node)`            | Render a JSX tree to an HTML string.                                                       |
| `raw(html)`               | Mark a trusted string so it is emitted unescaped.                                          |
| `Fragment`, `jsx`, `jsxs` | JSX runtime primitives (used by the compiler).                                             |

See [`example/`](./example) for a complete, runnable site.
