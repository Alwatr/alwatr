import type {Logger} from './type';

/**
 * Define `window.Vatr.registeredList`
 */
export const vatrRegisteredList = window.Vatr?.registeredList || [];
window.Vatr ??= {};
window.Vatr.registeredList = vatrRegisteredList;

vatrRegisteredList.push({
  name: '@vatr/logger',
  version: '{{VATR_VERSION}}', // TODO: replace with real version at release time.
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

const debugString = window.localStorage?.getItem('VATR_LOG')?.trim();
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
      debugString.indexOf('*') === 0 && // starts with `*` for example: `*vatr*`
      scope.indexOf(debugString.replaceAll('*', '')) !== -1
    ) ||
    (
      debugString.indexOf('*') === debugString.length - 1 && // ends with `*` for example: `vatr/*`
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
 * @example
 *  const logger = createLogger('demo');
 *  function sayHello (name: string) {
 *    logger.logMethodArgs('sayHello', {name});
 *  }
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

  // else if debug is true for this scope
  return {
    color,
    scope,

    logProperty: debug ? console.debug.bind(
        console,
        '%c%s%c.%s = %o;',
        style.scope.replace('{{color}}', color),
        scope,
        style.reset,
    ) : empty,

    logMethod: debug ? console.debug.bind(
        console,
        '%c%s%c.%s();',
        style.scope.replace('{{color}}', color),
        scope,
        style.reset,
    ) : empty,

    logMethodArgs: debug ? console.debug.bind(
        console,
        '%c%s%c.%s(%o);',
        style.scope.replace('{{color}}', color),
        scope,
        style.reset,
    ) : empty,

    logMethodFull: debug ? console.debug.bind(
        console,
        '%c%s%c.%s(%o); // %o',
        style.scope.replace('{{color}}', color),
        scope,
        style.reset,
    ) : empty,


    incident: debug ? console.trace.bind(
        console,
        '%c%s%c.%s() => Incident: "%s" (%s)!',
        style.scope.replace('{{color}}', color),
        scope,
        style.reset,
    ) : empty,

    accident: console.warn.bind(
        console,
        '%c%s%c.%s => Accident: "%s" (%s)!',
        style.scope.replace('{{color}}', color),
        scope,
        style.reset,
    ),

    error: console.error.bind(
        console,
        '%c%s%c.%s "%s" =>',
        style.scope.replace('{{color}}', color),
        scope,
        style.reset,
    ),

    logOther: debug ? console.debug.bind(
        console,
        '%c%s',
        style.scope.replace('{{color}}', color),
        scope,
    ) : empty,
  };
};
