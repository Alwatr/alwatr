/**
 * @alwatr/weaver — public entry point (the render-agnostic core).
 *
 * A bun-native build tool and dev server. Construct a {@link Weaver} with an explicit
 * {@link WeaverConfig} (you supply a `render()` function) in your app's `src/weaver.ts`, then
 * call `.run(Bun.argv.slice(2))` to expose the CLI (build / serve).
 *
 * For loom sites, prefer the `@alwatr/weaver` subpath: `weave({pages, ...})` wires loom's
 * `buildSite` in for you. This core never imports loom, keeping the two packages decoupled.
 *
 * Dev watch is delegated to Bun: `bun --watch src/weaver.ts serve`.
 */

import './type.js';
export {Weaver} from './weaver.js';
export {version} from './cli.js';
export {weave, type WeaveConfig} from './loom.js';
export type {WeaverConfig, RenderResult} from './type.js';
