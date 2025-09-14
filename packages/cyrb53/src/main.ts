const H1_SEED = 0xdeadbeef;
const H2_SEED = 0x41c6ce57;
const M_K1 = 2654435761;
const M_K2 = 1597334677;
const F_K1 = 2246822507;
const F_K2 = 3266489909;
const P_K1 = 4294967296; // 2^32
const P_K2 = 2097151; // 2^21 - 1

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
  let h1 = H1_SEED ^ seed;
  let h2 = H2_SEED ^ seed;

  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, M_K1);
    h2 = Math.imul(h2 ^ ch, M_K2);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), F_K1);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), F_K2);
  h2 = Math.imul(h2 ^ (h2 >>> 16), F_K1);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), F_K2);

  return P_K1 * (P_K2 & h2) + (h1 >>> 0);
}
