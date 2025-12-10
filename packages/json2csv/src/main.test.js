import {jsonToCsv} from '@alwatr/json2csv';
import {describe, it, expect} from '@jest/globals';

describe('jsonToCsv', () => {
  it('should convert a JSON object to CSV', () => {
    const json = {
      name: 'John Doe',
      age: 30,
      city: 'New York',
    };
    const csv = jsonToCsv(json);
    expect(csv).toBe('name,age,city\nJohn Doe,30,New York');
  });
});
