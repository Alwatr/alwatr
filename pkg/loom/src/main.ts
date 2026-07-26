/**
 * @alwatr/loom — public entry point.
 *
 * A tiny, zero-dependency static site generator core: TSX in, HTML out. No React,
 * no virtual DOM, no client runtime.
 */
export { Fragment, SafeHtml, jsx, jsxs, raw } from "./jsx-runtime.js";
export type { Child, Children, ClassValue, Component, VNode } from "./jsx-runtime.js";

export { render } from "./render.js";

export { collection, definePage } from "./page.js";
export type { Page } from "./page.js";

export { buildSite, defineSite } from "./build.js";
export type { SiteConfig, BuildResult } from "./build.js";
