import type {Logger} from './type';

/**
 * Define `window.Alwatr.registeredList`
 */
export const alwatrRegisteredList = window.Alwatr?.registeredList || [];
window.Alwatr ??= {};
window.Alwatr.registeredList = alwatrRegisteredList;

alwatrRegisteredList.push({
  name: '@alwatr/logger',
  version: '{{ALWATR_VERSION}}', // TODO: replace with real version at release time.
});

/**
 * Color list storage for logger.
 */
let colorIndex = 0;
const colorList = [
  '#f05561',
  '#35b997',
  '#ee224a',
  '#91c13e',
  '#22af4b',
  '#f0e995',
  '#0fe995',
  '#0f89ca',
  '#08b9a5',
  '#fee851',
  '#ee573d',
  '#f9df30',
  '#1da2dc',
  '#f05123',
  '#ee2524',
];

const getNextColor = (): string => {
  const color = colorList[colorIndex];
  colorIndex++;
  if (colorIndex >= colorList.length) {
    colorIndex = 0;
  }
  return color;
};

const debugString = window.localStorage?.getItem('ALWATR_LOG')?.trim();
const getDebugState = (scope: string, force: boolean ): boolean => {
  if (
    debugString == null ||
    debugString == ''
  ) {
    return false;
  }

  if (
    force ||
    debugString === scope ||
    (
      debugString.indexOf('*') === 0 && // starts with `*` for example: `*alwatr*`
      scope.indexOf(debugString.replaceAll('*', '')) !== -1
    ) ||
    (
      debugString.indexOf('*') === debugString.length - 1 && // ends with `*` for example: `alwatr/*`
      scope.indexOf(debugString.replaceAll('*', '')) === 0
    )
  ) {
    return true;
  }

  // else
  return false;
};

export const style = {
  scope: 'color: {{color}};',
  reset: 'color: inherit;',
};

/**
 * Create a logger function for fancy console debug with custom scope.
 *
 * - **color** is optional and automatically select from internal fancy color list.
 * - **force** is optional and default to false.
 *
 * Example:
 *
 * ```ts
 * import {createLogger} from 'https://esm.run/@alwatr/logger';
 * const logger = createLogger('logger/demo');
 * ```
 */
export const createLogger = (
    scope: string,
    color: string = getNextColor(),
    force = false,
): Logger => {
  scope = scope.trim();

  const debug = getDebugState(scope, force);

  const first = scope.charAt(0);
  if (first !== '[' && first !== '{' && first !== '(' && first !== '<') {
    scope = '[' + scope + ']';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const empty = (): void => {};

  const styleScope = style.scope.replaceAll('{{color}}', color);

  /**
   * Required logger object, accident, error always reported even when the debug is false.
   */
  const requiredItems = {
    debug,
    color,
    scope,

    accident: console.warn.bind(
        console,
        '%c%s%c.%s => Accident: "%s" (%s)!',
        styleScope,
        scope,
        style.reset,
    ),

    error: console.error.bind(
        console,
        '%c%s%c.%s "%s" =>',
        styleScope,
        scope,
        style.reset,
    ),
  };

  if (!debug) {
    return {
      ...requiredItems,
      logProperty: empty,
      logMethod: empty,
      logMethodArgs: empty,
      logMethodFull: empty,
      incident: empty,
      logOther: empty,
    };
  }

  // else if debug is true for this scope
  return {
    ...requiredItems,

    logProperty: console.debug.bind(
        console,
        '%c%s%c.%s = %o;',
        styleScope,
        scope,
        style.reset,
    ),

    logMethod: console.debug.bind(
        console,
        '%c%s%c.%s();',
        styleScope,
        scope,
        style.reset,
    ),

    logMethodArgs: console.debug.bind(
        console,
        '%c%s%c.%s(%o);',
        styleScope,
        scope,
        style.reset,
    ),

    logMethodFull: console.debug.bind(
        console,
        '%c%s%c.%s(%o); // %o',
        styleScope,
        scope,
        style.reset,
    ),

    incident: console.trace.bind(
        console,
        '%c%s%c.%s() => Incident: "%s" (%s)!',
        styleScope,
        scope,
        style.reset,
    ),

    logOther: console.debug.bind(
        console,
        '%c%s',
        styleScope,
        scope,
    ),
  };
};
