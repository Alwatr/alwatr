import type {} from '@alwatr/type-helper';

/**
 * A single configuration object for creating a Debouncer.
 * This groups all settings for a cleaner API.
 */
export interface DebouncerConfig<F extends AnyFunction> {
  /**
   * The function to be executed after the delay.
   */
  callback: F;

  /**
   * The delay in milliseconds before the function is executed.
   */
  delay: number;

  /**
   * If `true`, the function is called on the leading edge of the timeout.
   * @default false
   */
  leading?: boolean;

  /**
   * If `true`, the function is called on the trailing edge of the timeout.
   * @default true
   */
  trailing?: boolean;
}