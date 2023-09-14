/**
 * Get default export from dynamic es-module import without resolve promise.
 *
 * Example:
 *
 * ```ts
 * const starIcon = defaultExport(import('@alwatr/icon/svg/star-outline.svg'));
 *
 * render(`<div class="icon">${await starIcon}</div>`)
 * ```
 */
export const defaultExport = <K extends string, T extends {default: K}>(m: Promise<T>): Promise<K> =>
  m.then((_m) => _m.default);
