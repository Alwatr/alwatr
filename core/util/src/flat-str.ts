/**
 * Flattens the underlying C structures of a concatenated JavaScript string.
 */
export const flatStr = (s: string): string => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore because it alters wrong compilation errors.
  s | 0;
  return s;
};
