export function jsonToCsv(
  jsonData?: DictionaryOpt<unknown>[],
  delimiter = ',',
  includeHeaders = true,
  replacer?: (key: string, value: JsonValue) => JsonValue,
): string {
  if (!Array.isArray(jsonData) || jsonData.length === 0 || !jsonData[0]) {
    return '';
  }

  const delimiterRegex = new RegExp(`[${delimiter}\\n"]`, 'g'); // Pre-compile regex
  const doubleQuoteRegex = /"/g;

  // 1. Extract Headers (Keys)
  const headers = Object.keys(jsonData[0]);

  // 2. Create CSV (using Array for better performance)
  const csvRows: string[] = [];
  if (includeHeaders) {
    csvRows.push(headers.map((header) => escapeCsvValue(header, delimiterRegex, doubleQuoteRegex)).join(delimiter));
  }

  // 3. Iterate through Data and Create CSV Rows
  for (const row of jsonData) {
    if (typeof row !== 'object' || row === null || Array.isArray(row)) {
      // Handle non-object rows
      const cellValue = Array.isArray(row) ? JSON.stringify(row, replacer) : row === null ? '' : String(row);
      csvRows.push(escapeCsvValue(cellValue, delimiterRegex, doubleQuoteRegex));
      continue;
    }

    const rowValues: string[] = [];
    for (const header of headers) {
      const cellValue = (row as DictionaryOpt<JsonObject>)[header];

      if (cellValue === null || cellValue === undefined) {
        rowValues.push(escapeCsvValue('', delimiterRegex, doubleQuoteRegex));
      }
      else if (typeof cellValue === 'object') {
        rowValues.push(escapeCsvValue(JSON.stringify(cellValue, replacer), delimiterRegex, doubleQuoteRegex));
      }
      else {
        rowValues.push(escapeCsvValue(String(cellValue), delimiterRegex, doubleQuoteRegex));
      }
    }
    csvRows.push(rowValues.join(delimiter));
  }

  return csvRows.join('\n'); // Join at the very end (more efficient)
}

// Helper function to escape CSV values (extracted for performance)
function escapeCsvValue(value: string, delimiterRegex: RegExp, doubleQuoteRegex: RegExp): string {
  if (typeof value !== 'string' || value === '') {
    return value; // No escaping needed
  }
  const escapedValue = value.replace(doubleQuoteRegex, '""');
  return delimiterRegex.test(escapedValue) ? `"${escapedValue}"` : escapedValue;
}
