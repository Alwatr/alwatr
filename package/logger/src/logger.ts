export type LoggerFunction = (message: string, ...restParam: Array<unknown>) => void;
export type LogLevels = 'debug' | 'error' | 'info' | 'log' | 'trace' | 'warn';

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

const debug = window.localStorage?.getItem('DEBUG')?.trim();

/**
 * Create a logger function for fancy console debug with custom scope.
 *
 * @property {boolean} force - if set to true logger will work even if its not in debug mode.
 * @example
 * const log = createLogger('my scope', 'log', true);
 * log('my log message :)');
 */
export function createLogger(
    scope: string,
    level: LogLevels = 'debug',
    force?: boolean,
): LoggerFunction {
  const color = getNextColor();

  if (debug != null) {
    if (debug === scope) {
      force = true;
    } else if (
      debug.charAt(0) === '*' &&
      scope.match(`^(.*)${debug.slice(1)}$`)
    ) {
      force = true;
    } else if (
      debug.charAt(debug.length) === '*' &&
      scope.match(`^${debug.slice(1)}(.*)$`)
    ) {
      force = true;
    }
  }

  return (message: string, ...restParam: Array<unknown>): void => {
    if (!force) return;
    // first args must be separated as keyPattern for fix issue of `this._log('a=%s', a)`
    console[level](
        `%c%s%c  ${message}`,
        `color: ${color}; font-size: 1.2em;`,
        scope,
        'color: inherit;font-size: 1em',
        ...restParam,
    );
  };
}
