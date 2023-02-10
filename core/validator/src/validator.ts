import {isNumber} from '@alwatr/math';

import type {JsonSchema, ValidType} from './type.js';
import type {Stringifyable, StringifyableRecord} from '@alwatr/type';

export type {JsonSchema};

export function validator<T extends ValidType>(
    validSchema: JsonSchema,
    targetObject: StringifyableRecord,
    additionalProperties = false,
    path = '.',
): T {
  if (typeof targetObject !== 'object' || targetObject == null) {
    throw new Error('invalid_type', {
      cause: {
        message: 'targetObject is not a function or null',
        itemPath: path,
        itemSchema: 'JsonSchema',
        itemValue: String(targetObject),
      },
    });
  }

  if (
    additionalProperties === false &&
    Object.keys(validSchema).sort().join() !== Object.keys(targetObject).sort().join()
  ) {
    throw new Error('invalid_type', {
      cause: {
        message: 'Object.keys(validSchema) !== Object.keys(targetObject)',
        itemPath: path,
        itemSchema: String(validSchema),
        itemValue: String(targetObject),
      },
    });
  }

  for (const itemName in validSchema) {
    if (!Object.prototype.hasOwnProperty.call(validSchema, itemName)) continue;

    const itemPath = `${path}/${itemName}`;
    const itemSchema = validSchema[itemName];
    const itemValue = targetObject[itemName] as Stringifyable;

    if (typeof itemSchema === 'object' && itemSchema != null) {
      // nested object
      targetObject[itemName] = validator<ValidType>(
          itemSchema,
        itemValue as StringifyableRecord,
        additionalProperties,
        itemPath,
      );
    }
    else if (itemSchema === Boolean) {
      const strValue = String(itemValue).toLowerCase();
      if (strValue === 'true') {
        targetObject[itemName] = true;
      }
      else if (strValue === 'false') {
        targetObject[itemName] = false;
      }
      else {
        throw new Error('invalid_type', {
          cause: {
            message: 'invalid type',
            itemPath,
            itemSchema: 'Boolean',
            itemValue: String(itemValue),
          },
        });
      }
    }
    else if (itemSchema === Number) {
      if (isNumber(itemValue)) {
        targetObject[itemName] = +<string>itemValue;
      }
      else {
        throw new Error('invalid_type', {
          cause: {
            message: 'invalid type',
            itemPath,
            itemSchema: 'Number',
            itemValue: String(itemValue),
          },
        });
      }
    }
    else if (itemSchema === String) {
      if (typeof itemValue !== 'string' || itemValue === '') {
        throw new Error('invalid_type', {
          cause: {
            message: 'invalid type',
            itemPath,
            itemSchema: 'String',
            itemValue: String(itemValue),
          },
        });
      }
    }
    else {
      if (itemValue !== itemSchema) {
        throw new Error('invalid_type', {
          cause: {
            message: 'invalid enum value',
            itemPath,
            itemSchema: String(itemSchema),
            itemValue: String(itemValue),
          },
        });
      }
    }
  }

  return targetObject as T;
}
