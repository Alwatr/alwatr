import {isNumber} from '@alwatr/math';

import type {Schema} from './type.js';

export {validator, Schema};

function validator<DataType extends Record<string, unknown>>(value: Record<string, unknown>, schema: Schema): DataType {
  for (const paramName in schema) {
    if (!Object.prototype.hasOwnProperty.call(schema, paramName)) continue;

    const valueType = schema[paramName];
    // nested object
    if (typeof schema[paramName] === 'object') {
      value[paramName] =
        validator<DataType>(value[paramName] as Record<string, unknown>, schema[paramName] as Schema);
    }

    const validValue = value[paramName] as string | number | boolean;

    if (valueType === 'boolean') {
      if (validValue === true || validValue === false) {
        value[paramName] = validValue;
      }
      else {
        throw new Error('invalid_type', {
          cause: {
            name: 'boolean',
            message: JSON.stringify(value),
          },
        });
      }
    }
    else if (valueType === 'number') {
      if (isNumber(validValue)) {
        value[paramName] = +validValue;
      }
      else {
        throw new Error('invalid_type', {
          cause: {
            name: 'number',
            message: JSON.stringify(value),
          },
        });
      }
    }
    else if (valueType === 'string') {
      value[paramName] = validValue.toString();
    }
  }

  return value as DataType;
}
