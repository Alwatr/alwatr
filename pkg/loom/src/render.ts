/**
 * @alwatr/loom — the renderer.
 *
 * Walks a JSX tree and returns an HTML string. Synchronous and allocation-light:
 * a single recursive function plus string concatenation, no virtual DOM, no diff.
 */
import { Fragment, SafeHtml } from "./jsx-runtime.js";
import type { Child, ClassValue, Component, VNode } from "./jsx-runtime.js";
import { escapeHtml } from "./escape.js";

/** HTML void elements: rendered as `<tag>` with no closing tag or children. */
const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

/** Render a JSX tree to an HTML string. */
export function render(node: Child): string {
  // Nothing to emit for nullish or boolean (matches JSX `{cond && <x/>}` semantics).
  if (node == null || node === true || node === false) return "";

  // Trusted markup passes through untouched.
  if (node instanceof SafeHtml) return node.value;

  const type = typeof node;
  if (type === "string") return escapeHtml(node as string);
  if (type === "number" || type === "bigint") return String(node);

  if (Array.isArray(node)) {
    let out = "";
    for (const child of node) out += render(child);
    return out;
  }

  const { type: tag, props } = node as VNode;

  if (tag === Fragment) return render(props.children as Child);

  // Components are plain functions: call and render their output.
  if (typeof tag === "function") return render((tag as Component)(props));

  // Intrinsic element.
  const attributes = serializeAttributes(props);
  if (VOID_ELEMENTS.has(tag)) return `<${tag}${attributes}/>`;
  return `<${tag}${attributes}>${render(props.children as Child)}</${tag}>`;
}

/** Serialize a props object into an attribute string (leading space included). */
function serializeAttributes(props: Record<string, unknown>): string {
  let out = "";
  for (const name in props) {
    if (name === "children" || name === "key" || name === "ref") continue;

    const value = props[name];
    if (value == null || value === false) continue;

    // Boolean attribute: `disabled`, `scrim-overlay`, ...
    if (value === true) {
      out += ` ${name}`;
      continue;
    }

    if (name === "class") {
      const className = classToString(value as ClassValue);
      if (className !== "") out += ` class="${escapeHtml(className)}"`;
      continue;
    }

    if (name === "style" && typeof value === "object") {
      out += ` style="${escapeHtml(styleToString(value as Record<string, unknown>))}"`;
      continue;
    }

    // Attribute names are passed through verbatim (kebab-case, data-*, aria-*, custom).
    out += ` ${name}="${escapeHtml(String(value))}"`;
  }
  return out;
}

/** Resolve a `class` value (string | list | `{name: enabled}` map) to a class string. */
function classToString(value: ClassValue): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) {
    let out = "";
    for (const item of value) {
      const part = classToString(item);
      if (part !== "") out += (out === "" ? "" : " ") + part;
    }
    return out;
  }
  if (value != null && typeof value === "object") {
    let out = "";
    for (const key in value) {
      if (value[key]) out += (out === "" ? "" : " ") + key;
    }
    return out;
  }
  return "";
}

/** Serialize a style object to a CSS declaration string (camelCase keys → kebab-case). */
function styleToString(style: Record<string, unknown>): string {
  let out = "";
  for (const key in style) {
    const value = style[key];
    if (value == null || typeof value === "boolean") continue;
    const property = key.replace(/[A-Z]/g, (char) => "-" + char.toLowerCase());
    out += `${property}:${String(value)};`;
  }
  return out;
}
