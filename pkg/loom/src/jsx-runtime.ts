/**
 * @alwatr/loom — JSX runtime.
 *
 * The automatic JSX runtime. With `"jsxImportSource": "@alwatr/loom"` in tsconfig,
 * the compiler (Bun/tsc) rewrites every `<tag/>` into a call to `jsx`/`jsxs` from
 * this module. We don't build a virtual DOM — `jsx` just records a lightweight
 * node, and `render()` (see `render.ts`) turns the tree into an HTML string.
 */

/** Marker for a `<>...</>` fragment — its children are concatenated with no wrapper tag. */
export const Fragment = Symbol.for('alwatr.loom.fragment');

/**
 * Pre-escaped HTML. The renderer passes its `value` through verbatim, so it is
 * the single, explicit escape hatch for trusted markup. Build it with {@link raw}.
 */
export class SafeHtml {
  constructor(readonly value: string) {}
}

/** Wrap a trusted HTML string so the renderer emits it without escaping. */
export const raw = (html: string): SafeHtml => new SafeHtml(html);

/** Anything that may appear as a child in the tree. */
export type Child = string | number | bigint | boolean | null | undefined | SafeHtml | VNode | Child[];

/** A child or list of children. */
export type Children = Child | Child[];

/** Value accepted by the `class` attribute (string, list, or `{name: enabled}` map). */
export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

/** A component is just a function from props to a tree. Synchronous by design. */
export type Component<P = Record<string, unknown>> = (props: P & {children?: Children}) => Child;

/** A node recorded by {@link jsx}: an element tag, a component, or a fragment. */
export interface VNode {
  type: string | Component<any> | typeof Fragment;
  props: Record<string, unknown>;
}

/** Records a node. Called by the compiler for every JSX expression. */
export function jsx(type: VNode['type'], props: Record<string, unknown> | null): VNode {
  return {type, props: props ?? {}};
}

/** Same as {@link jsx}; the compiler uses it for elements with static children. */
export const jsxs = jsx;

/**
 * The JSX type contract. Intentionally permissive: any tag and any attribute is
 * allowed so custom elements and attributes (e.g. `on-click`, `scrim-overlay`)
 * work without fighting the type checker, while common props stay typed.
 */
export namespace JSX {
  export type Element = VNode;

  export interface ElementChildrenAttribute {
    children: Record<never, never>;
  }

  interface BaseAttributes {
    class?: ClassValue;
    id?: string;
    style?: string | Record<string, string | number>;
    children?: Children;
    [attribute: string]: unknown;
  }

  export interface IntrinsicElements {
    [tag: string]: BaseAttributes;
  }
}
