import {jsonToCsv} from '@alwatr/json2csv';
import {describe, it, expect} from 'bun:test';

describe('jsonToCsv', () => {
  const testData = [
    {name: 'Ali', age: 30, city: 'Tehran'},
    {name: 'Reza', age: 25, city: 'Mashhad'},
  ];

  it('should convert simple JSON to CSV with default options', () => {
    const csv = jsonToCsv(testData);
    const expected = 'name,age,city\nAli,30,Tehran\nReza,25,Mashhad';
    expect(csv).toBe(expected);
  });

  it('should handle custom delimiter', () => {
    const csv = jsonToCsv(testData, ';');
    const expected = 'name;age;city\nAli;30;Tehran\nReza;25;Mashhad';
    expect(csv).toBe(expected);
  });

  it('should exclude headers when includeHeaders is false', () => {
    const csv = jsonToCsv(testData, ',', false);
    const expected = 'Ali,30,Tehran\nReza,25,Mashhad';
    expect(csv).toBe(expected);
  });

  it('should handle values needing escaping (quotes and delimiters)', () => {
    const complexData = [
      {id: 1, text: 'Hello, World'},
      {id: 2, text: 'He said "Hello"'},
      {id: 3, text: 'Line\nBreak'},
    ];
    const csv = jsonToCsv(complexData);
    const expected = 'id,text\n1,"Hello, World"\n2,"He said ""Hello"""\n3,"Line\nBreak"';
    expect(csv).toBe(expected);
  });

  it('should handle nested objects', () => {
    const nestedData = [{id: 1, info: {name: 'Ali', active: true}}];
    const csv = jsonToCsv(nestedData);
    // Nested objects are stringified and escaped
    expect(csv).toContain('{"name":"Ali","active":true}'.replace(/"/g, '""').replace(/^|$/g, '"'));
  });

  it('should handle null and undefined values', () => {
    const nullData = [
      {id: 1, value: null},
      {id: 2, value: undefined},
      {id: 3, value: 'test'},
    ];
    const csv = jsonToCsv(nullData);
    const expected = 'id,value\n1,\n2,\n3,test';
    expect(csv).toBe(expected);
  });

  it('should use replacer function', () => {
    const replacer = (key, value) => (key === 'age' ? String(value) + ' years' : value);
    const csv = jsonToCsv(testData, ',', true, replacer);
    const expected = 'name,age,city\nAli,30 years,Tehran\nReza,25 years,Mashhad';
    expect(csv).toBe(expected); // Note: replacer applies to value processing if implemented in stringify or custom logic
  });

  it('should handle arrays in fields', () => {
    const arrayData = [{list: [1, 2]}];
    const csv = jsonToCsv(arrayData);
    expect(csv).toBe('list\n"[1,2]"'); // Arrays are stringified and then escaped
  });

  it('should return empty string for empty input', () => {
    expect(jsonToCsv([])).toBe('');
    expect(jsonToCsv(null)).toBe('');
    expect(jsonToCsv(undefined)).toBe('');
  });

  it('should handle array with primitive first element safely', () => {
    // This used to crash before the fix
    const mixedData = [1, {a: 1}];
    const csv = jsonToCsv(mixedData);
    // Since the first element is not an object, headers cannot be extracted safely.
    // It should return empty string (or valid error handling if designed so, but currently returns '' based on logic).
    expect(csv).toBe('');
  });
});
