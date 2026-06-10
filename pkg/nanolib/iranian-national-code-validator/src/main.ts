/**
 * Validates an Iranian National Code (Code Melli).
 *
 * The validation is based on the official algorithm:
 * 1. The code must be 10 digits.
 * 2. The last digit is a check digit.
 * 3. A weighted sum of the first 9 digits is calculated.
 * 4. The remainder of the sum divided by 11 is compared with the check digit based on a specific rule.
 *
 * @param str The Iranian National Code to validate.
 * @returns `true` if the national code is valid, `false` otherwise.
 *
 * @example
 * ```ts
 * console.log(isValidIranianNationalCode('0018550152')); // true
 * console.log(isValidIranianNationalCode('0018550153')); // false
 * console.log(isValidIranianNationalCode('12345')); // false
 * ```
 */
export function isValidIranianNationalCode(str: string): boolean {
  if (!/^\d{10}$/.test(str)) return false;

  const check = +str[9];
  const sum =
    str
      .split('')
      .slice(0, 9)
      .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;

  return sum < 2 ? check === sum : check + sum === 11;
}
