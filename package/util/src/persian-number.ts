const persianNumbers = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
];

const arabicNumbers = [
  /٠/g,
  /١/g,
  /٢/g,
  /٣/g,
  /٤/g,
  /٥/g,
  /٦/g,
  /٧/g,
  /٨/g,
  /٩/g,
];

/**
 * persianNumberToEnglishNumber
 */
export function persianNumberToEnglishNumber(string: string): string {
  if (typeof string === 'string') {
    for (let number = 0; number < 10; number++) {
      string = string
          .replace(persianNumbers[number], number.toString())
          .replace(arabicNumbers[number], number.toString());
    }
  }
  return string;
}
