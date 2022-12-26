import {isNumber} from '@alwatr/math';

import type {Schema} from './type.js';

export {validator, Schema};

function validator<DataType extends Record<string, unknown>>(value: Record<string, unknown>, schema: Schema): DataType {
  for (const instance in schema) {
    if (!Object.prototype.hasOwnProperty.call(schema, instance)) continue;

    const valueType = schema[instance];
    // nested object
    if (typeof schema[instance] === 'object') {
      value[instance] = validator<DataType>(value[instance] as Record<string, unknown>, schema[instance] as Schema);
    }

    const valueKey = value[instance] as string | number | boolean;

    if (valueType === 'boolean') {
      if (valueKey === true || valueKey === false) {
        value[instance] = valueKey;
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
      if (isNumber(valueKey)) {
        value[instance] = +valueKey;
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
      if (typeof valueKey === 'string') {
        value[instance] = valueKey;
      }
      else {
        throw new Error('invalid_type', {
          cause: {
            name: 'string',
            message: JSON.stringify(value),
          },
        });
      }
    }
  }

  return value as DataType;
}
