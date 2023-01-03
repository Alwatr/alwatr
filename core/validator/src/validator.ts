import {isNumber} from '@alwatr/math';

import type {JsonSchema, ValidType} from './type.js';

export {JsonSchema};

export function validator<T extends ValidType>(
    validSchema: JsonSchema,
    targetObject: Record<string, unknown>,
    path = '.',
): T {
  const validObject: ValidType = {};

  if (typeof targetObject !== 'object' || targetObject == null) {
    throw new Error('invalid_type', {
      cause: {
        itemPath: path,
        itemSchema: 'JsonSchema',
        itemValue: String(targetObject),
      },
    });
  }

  for (const itemName in validSchema) {
    if (!Object.prototype.hasOwnProperty.call(validSchema, itemName)) continue;

    const itemPath = `${path}/${itemName}`;
    const itemSchema = validSchema[itemName];

    if (typeof itemSchema === 'object') {
      // nested object
      const itemValue = targetObject[itemName] as Record<string, unknown>;
      validObject[itemName] = validator<ValidType>(itemSchema, itemValue, itemPath);
      continue;
    }
    // else

    const itemValue = targetObject[itemName] as string | number | boolean;

    if (itemSchema === Boolean) {
      const strValue = String(itemValue).toLowerCase();
      if (strValue === 'true') {
        validObject[itemName] = true;
      }
      else if (strValue === 'false') {
        validObject[itemName] = false;
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
        validObject[itemName] = +itemValue;
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
        validObject[itemName] = itemValue;
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
      throw new Error('invalid_schema', {
        cause: {
          itemPath,
          itemSchema: String(itemSchema),
          itemValue: String(itemValue),
        },
      });
    }
  }

  return validObject as T;
}
