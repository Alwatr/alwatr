import {nothing} from '../lit-html.js';

/**
 * Returns an iterable containing the result of calling `f(value)` on each value in `items`.
 *
 * @example
 *
 * ```ts
 * render() {
 *   return html`
 *     <ul>
 *       ${map(items, (i) => html`<li>${i}</li>`, this)}
 *     </ul>
 *   `;
 * }
 * ```
 */
export function* map<T>(
    items: Iterable<T> | undefined,
    f: (value: T) => unknown,
    _this?: unknown,
    loading?: () => unknown,
): unknown {
  if (items === undefined) {
    return loading?.() ?? nothing;
  }

  for (const value of items) {
    yield f.call(_this, value);
  }
}

/**
 * Returns an iterable containing the result of calling `f(value)` on each value in `items`.
 *
 * @example
 *
 * ```ts
 * render() {
 *   return html`
 *     <ul>
 *       ${mapObject(items, (i) => html`<li>${i}</li>`, this)}
 *     </ul>
 *   `;
 * }
 * ```
 */
export function* mapObject<T>(
    items: Record<string, T> | undefined | null,
    f: (value: T, key: string) => unknown,
    _this?: unknown,
    loading?: () => unknown,
): unknown {
  if (items === undefined) {
    return loading?.() ?? nothing;
  }

  for (const key in items) {
    if (!Object.prototype.hasOwnProperty.call(items, key)) continue;
    yield f.call(_this, items[key], key);
  }
}
