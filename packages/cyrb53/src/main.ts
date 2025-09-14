/**
 * cyrb53: A modern, high-quality, and fast 53-bit string hash function.
 *
 * Excellent collision resistance due to its large output space.
 * The best choice for new general-purpose hashing needs in JS/TS.
 *
 * @param str The input string.
 * @param seed An optional seed value.
 * @returns A 53-bit hash number.
 *
 * @example
 * ```ts
 * const hash = cyrb53('some string');
 * ```
 */
export function cyrb53(str: string, seed = 0): number {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;

  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}
