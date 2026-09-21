/**
 * @alwatr/loom — the renderer.
 *
 * Walks a JSX tree and returns an HTML string. Synchronous and allocation-light:
 * a single recursive function plus string concatenation, no virtual DOM, no diff.
 */
import {Fragment, SafeHtml} from './jsx-runtime.js';
import type {Child, ClassValue, Component, VNode} from './jsx-runtime.js';
import {escapeHtml} from './escape.js';

/** HTML void elements: rendered as `<tag>` with no closing tag or children. */
const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

/** Render a JSX tree to an HTML string. */
export function render(node: Child): string {
  // Nothing to emit for nullish or boolean (matches JSX `{cond && <x/>}` semantics).
  if (node == null || node === true || node === false) return '';

  // Trusted markup passes through untouched.
  if (node instanceof SafeHtml) return node.value;

  const type = typeof node;
  if (type === 'string') return escapeHtml(node as string);
  if (type === 'number' || type === 'bigint') return String(node);

  if (Array.isArray(node)) {
    let out = '';
    for (const child of node) out += render(child);
    return out;
  }

  const {type: tag, props} = node as VNode;

  if (tag === Fragment) return render(props.children as Child);

  // Components are plain functions: call and render their output.
  if (typeof tag === 'function') return render((tag as Component)(props));

  // Intrinsic element.
  const attributes = serializeAttributes(props);
  if (VOID_ELEMENTS.has(tag)) return `<${tag}${attributes}/>`;
  return `<${tag}${attributes}>${render(props.children as Child)}</${tag}>`;
}

/** Serialize a props object into an attribute string (leading space included). */
function serializeAttributes(props: Record<string, unknown>): string {
  let out = '';
  for (const name in props) {
    if (name === 'children' || name === 'key' || name === 'ref') continue;

    const value = props[name];

    // Arbitrary / non-standard attribute maps passed via `_`.
    if (name === '_' && value != null && typeof value === 'object' && !Array.isArray(value)) {
      out += serializeAttributeMap(value as Record<string, unknown>);
      continue;
    }

    out += serializeSingleAttribute(name, value);
  }
  return out;
}

/** Serialize an arbitrary key-value attribute map (used by `_`). */
function serializeAttributeMap(map: Record<string, unknown>): string {
  let out = '';
  for (const attrName in map) {
    if (!Object.hasOwn(map, attrName)) continue;
    out += serializeSingleAttribute(attrName, map[attrName]);
  }
  return out;
}

/** Serialize a single HTML attribute name-value pair (leading space included). */
function serializeSingleAttribute(name: string, value: unknown): string {
  if (value == null || value === false) return '';

  // Boolean attribute: `disabled`, `scrim-overlay`, `x-cloak`, ...
  if (value === true) return ` ${name}`;

  if (name === 'class') {
    const className = classToString(value as ClassValue);
    return className !== '' ? ` class="${escapeHtml(className)}"` : '';
  }

  if (name === 'style' && typeof value === 'object') {
    return ` style="${escapeHtml(styleToString(value as Record<string, unknown>))}"`;
  }

  // Attribute names are passed through verbatim (kebab-case, data-*, aria-*, Alpine directives).
  return ` ${name}="${escapeHtml(String(value))}"`;
}

/** Resolve a `class` value (string | list | `{name: enabled}` map) to a class string. */
function classToString(value: ClassValue): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (Array.isArray(value)) {
    let out = '';
    for (const item of value) {
      const part = classToString(item);
      if (part !== '') out += (out === '' ? '' : ' ') + part;
    }
    return out;
  }
  if (value != null && typeof value === 'object') {
    let out = '';
    for (const key in value) {
      if (value[key]) out += (out === '' ? '' : ' ') + key;
    }
    return out;
  }
  return '';
}

/** Serialize a style object to a CSS declaration string (camelCase keys → kebab-case). */
function styleToString(style: Record<string, unknown>): string {
  let out = '';
  for (const key in style) {
    const value = style[key];
    if (value == null || typeof value === 'boolean') continue;
    const property = key.replace(/[A-Z]/g, (char) => '-' + char.toLowerCase());
    out += `${property}:${String(value)};`;
  }
  return out;
}
