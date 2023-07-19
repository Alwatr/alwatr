/**
 * Flattens the underlying C structures of a concatenated JavaScript string.
 */
export const flatStr = (s: string): string => {
  // @ts-expect-error because it alters wrong compilation errors.
  s | 0;
  return s;
};
