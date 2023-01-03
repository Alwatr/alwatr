import {isNumber} from '@alwatr/math';

import type {JsonSchema, ValidType} from './type.js';

export {JsonSchema};

export function validator<T extends ValidType>(
    validSchema: JsonSchema,
    targetObject: Record<string, unknown>,
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
    const itemValue = targetObject[itemName] as string | number | boolean | Record<string, unknown>;

    if (typeof itemSchema === 'object' && itemSchema != null) {
      // nested object
      targetObject[itemName] = validator<ValidType>(
          itemSchema,
        itemValue as Record<string, unknown>,
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
        targetObject[itemName] = +itemValue;
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
      if (typeof itemValue !== 'string') {
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
