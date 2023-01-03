import {isNumber} from '@alwatr/math';

import type {JsonSchema, ValidType} from './type.js';

export {JsonSchema};

export function validator<T extends ValidType>(
    validSchema: JsonSchema,
    targetObject: Record<string, unknown>,
    path = '.',
): T {
  if (typeof targetObject !== 'object' || targetObject == null) {
    throw new Error('invalid_type', {
      cause: {
        itemPath: path,
        itemSchema: 'JsonSchema',
        itemValue: String(targetObject),
      },
    });
  }

  for (const itemName in targetObject) {
    if (!Object.prototype.hasOwnProperty.call(targetObject, itemName)) continue;

    const itemPath = `${path}/${itemName}`;
    const itemSchema = validSchema[itemName];
    const itemValue = targetObject[itemName] as string | number | boolean | Record<string, unknown>;

    if (itemSchema == null) {
      throw new Error('invalid_type', {
        cause: {
          itemPath,
          itemSchema: 'undefined',
          itemValue: String(itemValue),
        },
      });
    }

    else if (typeof itemSchema === 'object') {
      // nested object
      targetObject[itemName] = validator<ValidType>(
          itemSchema,
          itemValue as Record<string, unknown>,
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
            itemPath,
            itemSchema: 'Boolean',
            itemValue: String(itemValue),
          },
        });
      }
    }

    else if (itemSchema === Number) {
      if (isNumber(itemValue)) {
        targetObject[itemName] = +itemValue;
      }
      else {
        throw new Error('invalid_type', {
          cause: {
            itemPath,
            itemSchema: 'Number',
            itemValue: String(itemValue),
          },
        });
      }
    }

    else if (itemSchema === String) {
      if (typeof itemValue === 'string') {
        targetObject[itemName] = itemValue;
      }
      else {
        throw new Error('invalid_type', {
          cause: {
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
