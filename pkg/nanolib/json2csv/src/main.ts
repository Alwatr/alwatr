import type {DictionaryOpt, JsonValue} from '@alwatr/type-helper';

/**
 * Converts a JSON array of objects to a CSV string.
 *
 * @param jsonData - The Array of JSON objects to convert.
 * @param delimiter - The delimiter character to use (default: ',').
 * @param includeHeaders - Whether to include the header row (default: true).
 * @param replacer - A function that handles value replacement, similar to `JSON.stringify`.
 * @returns The CSV string.
 *
 * @example
 * ```ts
 * const data = [{name: 'Ali', age: 30}, {name: 'John', age: 25}];
 * const csv = jsonToCsv(data);
 * // "name,age\nAli,30\nJohn,25"
 * ```
 */
export function jsonToCsv(
  jsonData?: DictionaryOpt<unknown>[],
  delimiter = ',',
  includeHeaders = true,
  replacer?: (key: string, value: unknown) => JsonValue,
): string {
  if (!Array.isArray(jsonData) || jsonData.length === 0 || typeof jsonData[0] !== 'object' || jsonData[0] === null) {
    return '';
  }

  const delimiterRegex = new RegExp(`[${delimiter}\\n"]`);
  const doubleQuoteRegex = /"/g;

  // 1. Extract Headers (Keys)
  const headers = Object.keys(jsonData[0]);
  const headersLen = headers.length;

  // 2. Create CSV
  const csvRows: string[] = [];

  if (includeHeaders) {
    let headerRow = '';
    for (let i = 0; i < headersLen; i++) {
      if (i > 0) headerRow += delimiter;
      headerRow += escapeCsvValue(headers[i], delimiterRegex, doubleQuoteRegex);
    }
    csvRows.push(headerRow);
  }

  // 3. Iterate through Data and Create CSV Rows
  for (const row of jsonData) {
    if (typeof row !== 'object' || row === null || Array.isArray(row)) {
      // Skip non-object rows
      continue;
    }

    let rowStr = '';
    for (let i = 0; i < headersLen; i++) {
      if (i > 0) rowStr += delimiter;

      const header = headers[i];
      let cellValue = (row as DictionaryOpt<JsonValue>)[header];

      if (replacer && cellValue !== undefined) {
        cellValue = replacer(header, cellValue);
      }

      if (cellValue == null) {
        // skip empty value
      } else if (typeof cellValue === 'object') {
        rowStr += escapeCsvValue(JSON.stringify(cellValue, replacer), delimiterRegex, doubleQuoteRegex);
      } else {
        rowStr += escapeCsvValue(String(cellValue), delimiterRegex, doubleQuoteRegex);
      }
    }
    csvRows.push(rowStr);
  }

  return csvRows.join('\n');
}

// Optimized helper function
function escapeCsvValue(value: string, delimiterRegex: RegExp, doubleQuoteRegex: RegExp): string {
  if (value === '') return value;

  // Only replace if necessary
  if (delimiterRegex.test(value)) {
    return `"${value.replace(doubleQuoteRegex, '""')}"`;
  }

  return value;
}
