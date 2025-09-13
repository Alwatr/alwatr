import type {} from '@alwatr/type-helper';

/**
 * A single configuration object for creating a Debouncer.
 * This groups all settings for a cleaner API.
 * 
 * Key notes:
 * - `leading` and `trailing` control execution timing: leading executes immediately on first trigger, trailing after delay.
 * - If both are true, execution happens on first trigger and last trigger (after delay).
 * - `thisContext` ensures the callback is bound to the correct `this` value, useful in class methods or event handlers.
 * - `delay` must be a positive number; zero disables debouncing.
 */
export interface DebouncerConfig<F extends AnyFunction> {
  /**
   * The function to be executed after the delay.
   * Can be any function type, with type safety enforced by generics.
   */
  callback: F;

  /**
   * The `this` context to be used when invoking the callback.
   * If provided, it will be stored and used for all invocations.
   * Omit if the callback doesn't rely on `this` or uses arrow functions.
   */
  thisContext?: ThisParameterType<F>;

  /**
   * The delay in milliseconds before the function is executed.
   * Must be a positive integer; affects performance and responsiveness.
   */
  delay: number;

  /**
   * If `true`, the function is called on the leading edge of the timeout.
   * Useful for immediate feedback (e.g., button press).
   * @default false
   */
  leading?: boolean;

  /**
   * If `true`, the function is called on the trailing edge of the timeout.
   * Ensures the last call is executed after inactivity.
   * @default true
   */
  trailing?: boolean;
}