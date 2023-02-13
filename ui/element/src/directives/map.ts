/**
 * Returns an iterable containing the result of calling `f(value)` on each value in `items`.
 *
 * @example
 *
 * ```ts
 * render() {
 *   return html`
 *     <ul>
 *       ${mapIterable(this, items, (i) => html`<li>${i}</li>`, 'loading...')}
 *     </ul>
 *   `;
 * }
 * ```
 */
export function* mapIterable<T>(
    _this: unknown,
    items: Iterable<T> | undefined,
    f: (value: T) => unknown,
    loading?: unknown,
): unknown {
  if (items === undefined) {
    return loading;
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
 *       ${mapObject(this, items, (i) => html`<li>${i}</li>`, 'loading...')}
 *     </ul>
 *   `;
 * }
 * ```
 */
export function* mapObject<T>(
    _this: unknown,
    items: Record<string, T> | undefined | null,
    f: (value: T, key: string) => unknown,
    loading?: unknown,
): unknown {
  if (items == null) {
    return loading;
  }
  for (const key in items) {
    if (!Object.prototype.hasOwnProperty.call(items, key)) continue;
    yield f.call(_this, items[key], key);
  }
}
