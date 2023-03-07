import {isNumber} from '@alwatr/math';

import type {JsonSchema} from './type.js';
import type {Stringifyable, StringifyableRecord} from '@alwatr/type';

export type {JsonSchema};

export function validator<T extends StringifyableRecord>(
    validSchema: JsonSchema,
    targetObject?: StringifyableRecord | null,
    additionalProperties = false,
    path = '.',
): T {
  if (targetObject == null || typeof targetObject !== 'object') {
    throw new Error('invalid_type', {
      cause: {
        message: 'targetObject root not valid',
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

    if (Array.isArray(itemSchema)) {
      // array
      if (!Array.isArray(itemValue)) {
        throw new Error('invalid_type', {
          cause: {
            message: 'invalid type',
            itemPath,
            itemSchema: 'Array',
            itemValue: String(itemValue),
          },
        });
      }
      // else
      const schema = itemSchema[0];
      for (const index in itemValue) {
        if (!Object.prototype.hasOwnProperty.call(itemSchema, index)) continue;
        const item = itemValue[index];
        targetObject[index] = validator<StringifyableRecord>(
            schema,
            item,
            additionalProperties,
            `${itemPath}[${index}]`,
        );
      }
    }
    else if (typeof itemSchema === 'object' && itemSchema != null) {
      // nested object
      targetObject[itemName] = validator<StringifyableRecord>(
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
        targetObject[itemName] = +(<string>itemValue);
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
