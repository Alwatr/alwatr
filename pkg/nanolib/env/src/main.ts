import {toNumber} from '@alwatr/is-number';
import {platformInfo} from '@alwatr/platform-info';

/**
 * Parameters for retrieving an environment variable value.
 */
export type GetEnvOption = {
  /**
   * The name of the environment variable.
   */
  name: string;

  /**
   * The default value to use if the environment variable is not set.
   * If not provided, the environment variable is required and an error will be thrown if it is not set.
   * Except in development mode, where the development value will be used instead if provided.
   */
  defaultValue?: string;

  /**
   * The value to use in a development environment.
   * It will overwrite the default value in development mode and completely ignored in production mode.
   */
  developmentValue?: string;
};

/**
 * Parameters for retrieving a numeric environment variable value.
 */
export type GetNumberEnvOption = {
  /**
   * The name of the environment variable.
   */
  name: string;

  /**
   * The default value to use if the environment variable is not set.
   * If not provided, the environment variable is required and an error will be thrown if it is not set.
   * Except in development mode, where the development value will be used instead if provided.
   */
  defaultValue?: number;

  /**
   * The value to use in a development environment.
   * It will overwrite the default value in development mode and completely ignored in production mode.
   */
  developmentValue?: number;
};

/**
 * Retrieves the string value of an environment variable.
 *
 * @param option - Configuration options for retrieving the environment variable.
 * @returns The string value of the environment variable.
 * @throws Error if the environment variable is required and not set.
 */
export function getEnv(option: GetEnvOption): string {
  let value = process.env[option.name];
  if (value === '') value = undefined; // empty string is considered as undefined in environment variables

  if (platformInfo.development) {
    value ??= option.developmentValue ?? option.defaultValue;
  } else {
    value ??= option.defaultValue;
  }

  if (value == null) {
    throw new Error(`Environment variable "${option.name}" is required.`);
  }

  return value;
}

/**
 * Retrieves the numeric value of an environment variable.
 *
 * Uses `@alwatr/is-number` to validate and convert the resolved value into a finite number.
 *
 * @param option - Configuration options for retrieving the numeric environment variable.
 * @returns The parsed number value.
 * @throws Error if the environment variable is required and not set.
 * @throws Error if the resolved value cannot be converted to a finite number.
 *
 * @example
 * ```ts
 * const port = getNumberEnv({name: 'PORT', defaultValue: 8080});
 * ```
 */
export function getNumberEnv(option: GetNumberEnvOption): number {
  let value: string | number | undefined = process.env[option.name];
  if (value === '') value = undefined; // empty string is considered as undefined in environment variables

  if (platformInfo.development) {
    value ??= option.developmentValue ?? option.defaultValue;
  } else {
    value ??= option.defaultValue;
  }

  if (value == null) {
    throw new Error(`Environment variable "${option.name}" is required.`);
  }

  const num = toNumber(value);
  if (num === null) {
    throw new Error(`Environment variable "${option.name}" must be a valid number, received: "${value}".`);
  }

  return num;
}
