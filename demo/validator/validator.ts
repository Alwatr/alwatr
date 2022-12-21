import {isNumber} from '@alwatr/math';

import type {valid} from './type.js';

function validator<T extends Record<string, unknown>>(valueObj: Record<string, unknown>, params: valid): T {
  const validObj: Record<string, unknown> = {};
  for (const paramName in params) {
    if (!Object.prototype.hasOwnProperty.call(params, paramName)) continue;
    const type = params[paramName];
    if (typeof params[paramName] === 'object') {
      validObj[paramName] = validator<T>(valueObj[paramName] as Record<string, unknown>, params[paramName] as valid);
    }

    let value = valueObj[paramName] as string | number | boolean;

    if (type === 'boolean') {
      if (value === true) {
        validObj[paramName] = true;
      }
      else if (value === false) {
        validObj[paramName] = false;
      }
      else if (value === 1) {
        validObj[paramName] = true;
      }
      else if (value === 0) {
        validObj[paramName] = false;
      }
      else if (typeof value === 'string') {
        value = value.trim();
        if (value === 'true' || value === '1') {
          validObj[paramName] = true;
        }
        else if (value === 'false' || value === '0') {
          value = value.trim();
          validObj[paramName] = false;
        }
        else {
          throw new Error('invalid_type', {
            cause: {
              name: 'boolean_validator',
              message: `'${value}' not valid`,
            },
          });
        }
      }
      else {
        throw new Error('invalid_type', {
          cause: {
            name: 'boolean_validator',
            message: `'${value}' not valid`,
          },
        });
      }
    }
    else if (type === 'number') {
      if (isNumber(value)) {
        validObj[paramName] = +value;
      }
      else {
        throw new Error('invalid_type', {
          cause: {
            name: 'number_validator',
            message: `'${value}' not valid`,
          },
        });
      }
    }
    else if (type === 'string') {
      validObj[paramName] = value.toString();
    }
  }

  return validObj as T;
}

// number
console.log(validator<{a: number}>({a: 2}, {a: 'number'}));
console.log(validator<{a: number}>({a: '2'}, {a: 'number'}));

// boolean
console.log(validator<{a: boolean}>({a: '1'}, {a: 'boolean'}));
console.log(validator<{a: boolean}>({a: 'true'}, {a: 'boolean'}));
console.log(validator<{a: boolean}>({a: '0'}, {a: 'boolean'}));
console.log(validator<{a: boolean}>({a: 'false'}, {a: 'boolean'}));

// string
console.log(validator<{a: string}>({a: false}, {a: 'string'}));
console.log(validator<{a: string}>({a: 'false'}, {a: 'string'}));
console.log(validator<{a: string}>({a: 1}, {a: 'string'}));

// nested object
console.log(
    validator<{a: number; b: {c: boolean}}>(
        {a: '2', b: {c: 'true', d: {e: 1}}},
        {a: 'number', b: {c: 'boolean', d: {e: 'number'}}},
    ),
);

// not valid
try {
  console.log(
      validator<{a: number; b: {c: boolean}}>(
          {a: '2', b: {c: 'true', d: {e: true}}},
          {a: 'number', b: {c: 'boolean', d: {e: 'number'}}},
      ),
  );
}
catch (error) {
  console.log(error as Error);
}

try {
  console.log(validator<{a: boolean}>({a: 'tru'}, {a: 'boolean'}));
}
catch (error) {
  console.log(error as Error);
}
