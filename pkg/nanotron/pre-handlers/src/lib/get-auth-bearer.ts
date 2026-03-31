/**
 * Extracts the Bearer token from the authorization header.
 *
 * This function takes an optional authorization header string, extracts the Bearer token, and returns it.
 * If the header is invalid or the token is missing, it returns null.
 *
 * @param {string} [authorizationHeader] - The authorization header string.
 * @returns {string | null} The extracted Bearer token or null if the header is invalid.
 *
 * @example
 * ```ts
 * console.log(this.headers.authorization); // 'Bearer myToken123'
 * const token = getAuthBearer(this.headers.authorization);
 * console.log(token); // 'myToken123'
 *
 * const invalidToken = getAuthBearer('Basic myToken123');
 * console.log(invalidToken); // null
 * ```
 */
export function getAuthBearer(authorizationHeader?: string): string | null {
  const auth = authorizationHeader?.split(' ');
  if (!auth || auth[0].toLowerCase() !== 'bearer' || !auth[1]) {
    return null;
  }
  return auth[1];
}
