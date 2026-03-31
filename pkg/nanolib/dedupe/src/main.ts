import {getGlobalThis} from '@alwatr/global-this';
import {hasOwn} from '@alwatr/has-own';


const globalThis_ = getGlobalThis<{__alwatr_dedupe__: string | true}>();

if (typeof globalThis_.__alwatr_dedupe__ === 'undefined') {
  globalThis_.__alwatr_dedupe__ = __package_version__;
}
else {
  if (globalThis_.__alwatr_dedupe__ === true) {
    globalThis_.__alwatr_dedupe__ = '1.0.x';
  }

  console.error(
    new Error('duplication_detected', {
      cause: {
        name: __package_name__,
        oldVersion: globalThis_.__alwatr_dedupe__,
        newVersion: __package_version__,
      },
    }),
  );
}

const list: DictionaryOpt<true> = {};

/**
 * Prevent duplication in any entities like loading node packages.
 * @param name package name including scope. e.g. `@scope/package-name`
 * @param version package version (optional)
 *
 * @example
 * ```typescript
 * deduplicate({name: __package_name__, strict: true});
 * ```
 */
export function deduplicate(args: {name: string; strict?: true}): void {
  if (hasOwn(list, args.name)) {
    const error = new Error('duplication_detected', {
      cause: {
        name: args.name,
      },
    });

    if (args.strict) {
      throw error;
    }
    else {
      console.error(error);
    }
  }

  list[args.name] = true;
}

deduplicate({name: __package_name__});

/**
 * Old `definePackage` for backward compatibility.
 * @deprecated Use `deduplicate` instead.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function definePackage(packageName: string, _?: string): void {
  console.warn('`definePackage` in `@alwatr/dedupe` is deprecated. Use `deduplicate` instead.');
  deduplicate({name: packageName});
}
