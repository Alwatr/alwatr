/**
 * Simple hash string for fast hashing (like md5).
 * This function is not very secure and should not be used for security purposes.
 * But it cannot be reversed easily and brute force can take up to years for fast computers.
 *
 * @param str - The string or number to hash
 * @param prefix - A prefix to add to the beginning of the hash result
 * @param repeat - Number of times to repeat the hashing process for increased complexity (default: 3)
 * @returns A hashed string with the specified prefix
 */
export function nanoHash(str: string | number, prefix: string, repeat = 1): string {
  if (repeat < 1) {
    throw new Error('The repeat parameter must be greater than or equal to 1');
  }

  let hash1 = 0xdeadbeef;
  let hash2 = 0x41c6ce57;

  if (typeof str === 'number') {
    str = str.toString();
  }

  const len = str.length;
  for (let i = 0; i < len; i++) {
    const char = str.charCodeAt(i);
    hash1 = Math.imul(hash1 ^ char, 2654435761);
    hash2 = Math.imul(hash2 ^ char, 1597334677);
  }

  hash1 = Math.imul(hash1 ^ (hash1 >>> 16), 2246822507) ^ Math.imul(hash2 ^ (hash2 >>> 13), 3266489909);
  hash2 = Math.imul(hash2 ^ (hash2 >>> 16), 2246822507) ^ Math.imul(hash1 ^ (hash1 >>> 13), 3266489909);

  const result = prefix + (hash1 >>> 0).toString(36) + (hash2 >>> 0).toString(36);
  if (repeat === 1) {
    return result;
  } else {
    return nanoHash(result, prefix, repeat - 1);
  }
}
