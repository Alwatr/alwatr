/**
 * Curated re-exports from `lit-html` for use within `@alwatr/flux`.
 *
 * Only the subset of `lit-html` APIs that are commonly needed in a Flux-based
 * application is exported here. This keeps the public surface minimal and
 * avoids pulling in advanced directive utilities that most consumers never use.
 *
 * **Exported APIs:**
 * - `html` — tagged template literal that produces a `TemplateResult`
 * - `render` — renders a `TemplateResult` into a DOM container
 * - `noChange` — sentinel that tells lit-html to leave the current part value unchanged
 * - `nothing` — sentinel that renders nothing (removes the node/attribute)
 * - `ifDefined` — renders a value only when it is not `undefined`
 * - `cache` — caches rendered templates to avoid re-parsing on state changes
 * - `classMap` — efficiently sets/removes CSS classes from an object map
 * - `when` — conditional rendering helper (`when(condition, trueCase, falseCase)`)
 *
 * @example
 * ```typescript
 * import {html, render, classMap, when} from '@alwatr/flux';
 *
 * const template = (isActive: boolean) => html`
 *   <div class=${classMap({active: isActive, hidden: !isActive})}>
 *     ${when(isActive, () => html`<span>Active</span>`, () => html`<span>Inactive</span>`)}
 *   </div>
 * `;
 *
 * render(template(true), document.getElementById('app')!);
 * ```
 */
export {
  html,
  svg,
  mathml,
  render,
  noChange,
  nothing,
  type TemplateResult,
  type HTMLTemplateResult,
  type SVGTemplateResult,
  type MathMLTemplateResult,
} from 'lit-html';
export {unsafeSVG} from 'lit-html/directives/unsafe-svg.js';
export {ifDefined} from 'lit-html/directives/if-defined.js';
export {cache} from 'lit-html/directives/cache.js';
export {classMap, type ClassInfo} from 'lit-html/directives/class-map.js';
export {when} from 'lit-html/directives/when.js';
export {repeat, type RepeatDirectiveFn, type KeyFn, type ItemTemplate} from 'lit-html/directives/repeat.js';
