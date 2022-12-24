import {isNumber} from '@alwatr/math';

import type {schema} from './type.js';

export {validator};

function validator<DataType extends Record<string, unknown>>(value: Record<string, unknown>, schema: schema): DataType {
  for (const paramName in schema) {
    if (!Object.prototype.hasOwnProperty.call(schema, paramName)) continue;

    const valueType = schema[paramName];
    if (typeof schema[paramName] === 'object') {
      value[paramName] =
        validator<DataType>(value[paramName] as Record<string, unknown>, schema[paramName] as schema);
    }

    const validValue = value[paramName] as string | number | boolean;

    if (valueType === 'boolean') {
      if (validValue === true || validValue === false) {
        value[paramName] = true;
      }
      else {
        throw new Error('invalid_type', {
          cause: {
            name: 'boolean_validator',
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
            name: 'number_validator',
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
