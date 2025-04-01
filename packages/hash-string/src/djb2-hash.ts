/**
 * DJB2 Hash Algorithm - A fast string hashing function.
 *
 * This implementation is based on Daniel J. Bernstein's popular 'times 33' hash algorithm,
 * commonly known as DJB2. It's known for its simplicity, speed, and good distribution properties
 * for short strings, making it suitable for general purpose hashing needs.
 *
 * Performance notes:
 * - Uses right-to-left iteration to avoid repeated length lookups
 * - Employs bit shifting operations for faster computation
 * - Final right shift ensures unsigned 32-bit integer output
 *
 * @param {string} str - The input string to be hashed
 * @returns {number} A 32-bit unsigned integer hash value
 *
 * @example
 * // Returns a numeric hash value
 * const hashValue = djb2Hash("hello world");
 */
export function djb2Hash(str: string): number {
  // 5381 is a prime number used as initial value in the DJB2 algorithm
  let hashValue = 5381;

  // Reverse loop for better performance - avoids repeated length property lookup
  for (let i = str.length - 1; i >= 0; i--) {
    // Using left shift (*2) and addition instead of multiplication by 33
    // (hash * 33) is equivalent to ((hash << 5) + hash)
    hashValue = ((hashValue << 5) + hashValue) ^ str.charCodeAt(i);
  }

  return hashValue >>> 0;
}
