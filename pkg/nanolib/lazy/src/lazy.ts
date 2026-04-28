/**
 * A generic, memory-efficient lazy evaluation wrapper.
 *
 * Defers execution of an expensive initializer until `.value` is first accessed.
 * After the first access the result is cached and the initializer reference is
 * dropped, allowing the GC to reclaim any closure memory.
 *
 * @template T The type of the wrapped value.
 *
 * @example
 * ```typescript
 * import {Lazy, lazy} from '@alwatr/lazy';
 *
 * // Class API
 * const heavyService = new Lazy(() => new ExpensiveService());
 * console.log(heavyService.isInitialized()); // false — not yet created
 * console.log(heavyService.value);           // ExpensiveService instance (created now)
 * console.log(heavyService.isInitialized()); // true
 *
 * // Factory function API (preferred for type inference)
 * const config = lazy(() => loadConfig());
 * ```
 */
export class Lazy<T> {
  /**
   * Cached value — undefined until the initializer has been called.
   *
   * Using `undefined` as the sentinel (rather than `null`) so that
   * `T` can itself be `null` without ambiguity.
   */
  private value__?: T;

  /**
   * The deferred initializer function.
   * Set to `undefined` after first execution to release the closure reference.
   */
  private initializer__?: () => T;

  constructor(initializer: () => T) {
    this.initializer__ = initializer;
  }

  /**
   * Returns the lazily-initialized value.
   *
   * On the **first** access:
   * 1. Captures the initializer reference.
   * 2. Deletes `initializer__` **before** calling it (prevents re-entry).
   * 3. Calls the initializer and caches the result.
   *
   * On **subsequent** accesses the cached value is returned directly — O(1),
   * no function call overhead.
   */
  get value(): T {
    if (this.initializer__ !== undefined) {
      // Capture the initializer and immediately delete the reference.
      // This prevents infinite recursion if the initializer itself accesses `.value`.
      const init = this.initializer__;
      // Explicitly delete (not just assign undefined) so the property is removed
      // from the object shape, giving V8 a stronger GC hint.
      delete this.initializer__;
      // Now call the initializer — if it re-enters `.value`, it will see
      // initializer__ === undefined and return the (still-undefined) value__.
      this.value__ = init();
    }
    // value__ is guaranteed to be set at this point (unless initializer re-entered).
    return this.value__ as T;
  }

  /**
   * Returns `true` if the initializer has already been executed and the value
   * is cached; `false` if the value has not been accessed yet.
   *
   * Useful for conditional logic that should only run after initialization,
   * or for diagnostics / health-checks.
   *
   * @example
   * ```typescript
   * if (!service.isInitialized()) {
   *   console.log('Service not yet started — skipping teardown.');
   *   return;
   * }
   * service.value.shutdown();
   * ```
   */
  isInitialized(): boolean {
    // initializer__ is deleted (not just set to undefined) after first access,
    // so checking for undefined covers both the "never accessed" and "deleted" states.
    return this.initializer__ === undefined;
  }
}

/**
 * Factory function for creating a {@link Lazy} instance.
 *
 * Preferred over `new Lazy(...)` because TypeScript infers `T` from the
 * initializer's return type without requiring an explicit type parameter.
 *
 * @param initializer A zero-argument function that produces the value.
 * @returns A new `Lazy<T>` wrapping the given initializer.
 *
 * @example
 * ```typescript
 * const db = lazy(() => new DatabaseConnection(config));
 * // db.value is only created when first accessed
 * ```
 */
export function lazy<T>(initializer: () => T): Lazy<T> {
  return new Lazy<T>(initializer);
}
