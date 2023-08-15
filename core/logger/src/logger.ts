import {globalAlwatr} from './global-alwatr.js';

import type {AlwatrLogger} from './type.js';

export {type AlwatrLogger, globalAlwatr};

globalAlwatr.registeredList.push({
  name: '@alwatr/logger',
  version: _ALWATR_VERSION_,
});

export const NODE_MODE = typeof process !== 'undefined';
export const DEV_MODE = NODE_MODE
  ? process.env.ALWATR_DEBUG === '1'
  : globalThis.localStorage?.getItem('ALWATR_DEBUG') === '1';

/**
 * Color list storage for logger.
 */
const colorList = NODE_MODE
  ? ['0;36', '0;35', '0;34', '0;33', '0;32'] // red and white omitted
  : [
    '#35b997',
    '#f05561',
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

let _colorIndex = 0;
const _getNextColor = (): string => {
  const color = colorList[_colorIndex];
  _colorIndex++;
  if (_colorIndex >= colorList.length) {
    _colorIndex = 0;
  }
  return color;
};

const _style = {
  scope: NODE_MODE ? '\x1b[{{color}}m' : 'color: {{color}};',
  reset: NODE_MODE ? '\x1b[0m' : 'color: inherit;',
};

const _keySection = NODE_MODE ? '%s%s%s' : '%c%s%c';

const _sanitizeDomain = (domain: string): string => {
  domain = domain.trim();
  const first = domain.charAt(0);
  if (first !== '[' && first !== '{' && first !== '<') {
    domain = '[' + domain + ']';
  }
  return domain;
};

/**
 * Create a logger function for fancy console debug with custom scope.
 *
 * - **color** is optional and automatically select from internal fancy color list.
 * - **debug** is optional and automatically detect from localStorage `ALWATR_DEBUG` item or `process.env.ALWATR_DEBUG`
 *
 * Example:
 *
 * ```ts
 * import {createLogger} from 'https://esm.run/@alwatr/logger';
 * const logger = createLogger('logger/demo');
 * ```
 */
export const createLogger = (domain: string, devMode = DEV_MODE): AlwatrLogger => {
  const color = _getNextColor();
  const styleScope = _style.scope.replaceAll('{{color}}', color);
  domain = _sanitizeDomain(domain);

  /**
   * Required logger object, accident, error always reported even when the devMode is false.
   */
  const requiredItems = {
    devMode,
    domain,

    accident: NODE_MODE
      ? console.warn.bind(console, `${styleScope}⚠️\n%s\x1b[33m.%s() Accident \`%s\` %s!${_style.reset}`, domain)
      : console.warn.bind(console, '%c%s%c.%s() Accident `%s` %s!', styleScope, domain, _style.reset),

    error: NODE_MODE
      ? console.error.bind(console, `${styleScope}❌\n%s\x1b[31m.%s() Error \`%s\`${_style.reset}\n`, domain)
      : console.error.bind(console, '%c%s%c.%s() Error `%s`\n', styleScope, domain, _style.reset),
  } as const;

  if (!devMode) {
    return requiredItems;
  }
  // else
  return {
    ...requiredItems,

    logProperty: console.debug.bind(console, _keySection + '.%s = %o;', styleScope, domain, _style.reset),

    logMethod: console.debug.bind(console, _keySection + '.%s();', styleScope, domain, _style.reset),

    logModule: console.debug.bind(console, _keySection + '/%s.js;', styleScope, domain, _style.reset),

    logMethodArgs: console.debug.bind(console, _keySection + '.%s(%o);', styleScope, domain, _style.reset),

    logMethodFull: console.debug.bind(console, _keySection + '.%s(%o) => %o', styleScope, domain, _style.reset),

    logOther: console.debug.bind(console, _keySection, styleScope, domain, _style.reset),

    incident: NODE_MODE
      ? console.log.bind(console, `${styleScope}🚸\n%s${_style.reset}.%s() Incident \`%s\` %s!${_style.reset}`, domain)
      : console.log.bind(console, '%c%s%c.%s() Incident `%s` %s!', styleScope, domain, 'color: orange;'),

    time: (label: string) => console.time(domain + '.' + label + ' duration time'),
    timeEnd: (label: string) => console.timeEnd(domain + '.' + label + ' duration time'),
  } as const;
};
