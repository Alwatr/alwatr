
/**
 * A module for tracking package information.
 * This module is useful for keeping track of loaded packages and their versions.
 * It does not prevent the same package from being added multiple times!
 * For that, you can use the `@alwatr/dedupe` package.
 *
 * @example
 * ```typescript
 * import { packageTracer } from './package-tracer';
 *
 * packageTracer.add('express', '4.18.2');
 * packageTracer.add('lodash', '4.17.21');
 *
 * if (packageTracer.has('express')) {
 *   const versions = packageTracer.get('express');
 *   console.log('Express versions:', versions);
 * }
 * ```
 */
export const packageTracer = {
  /**
   * A dictionary storing package names and their corresponding versions.
   */
  list: {} as Readonly<DictionaryOpt<readonly string[]>>,

  /**
   * Adds a package and its version to the tracker.
   * It does not prevent the same package from being added multiple times!
   * For that, you can use the `@alwatr/dedupe` package.
   *
   * @param packageName - The name of the package.
   * @param version - The version of the package.
   *
   * @example
   * ```typescript
   * packageTracer.add(__package_name__, __package_version__);
   * ```
   */
  add(packageName: string, version: string): void {
    (this.list[packageName] as string[]) ??= [];
    (this.list[packageName] as string[]).push(version);
  },

  /**
   * Checks if a package exists in the tracker.
   *
   * @param packageName - The name of the package.
   * @returns `true` if the package exists, `false` otherwise.
   *
   * @example
   * ```typescript
   * if (packageTracer.has('axios')) {
   *   console.log('Axios is tracked!');
   * }
   * ```
   */
  has(packageName: string): boolean {
    const exist = Object.prototype.hasOwnProperty.call(this.list, packageName);
    return exist;
  },

  /**
   * Retrieves the versions of a package.
   *
   * @param packageName - The name of the package.
   * @returns An array of versions or `undefined` if the package doesn't exist.
   *
   * @example
   * ```typescript
   * const reactVersions = packageTracer.get('react');
   * if (reactVersions) {
   *   console.log('React versions:', reactVersions);
   * }
   * ```
   */
  get(packageName: string): readonly string[] | undefined {
    return this.list[packageName];
  },
} as const;

__dev_mode__: packageTracer.add(__package_name__, __package_version__);
