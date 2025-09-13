import {packageTracer} from '@alwatr/package-tracer';
import {platformInfo} from '@alwatr/platform-info';

import type {AlwatrLogger} from './type.js';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

const defaultDebugMode = /* #__PURE__ */ (() => {
  return (
    platformInfo.development ||
    (platformInfo.isCli ? Boolean(process.env.DEBUG) : typeof localStorage !== 'undefined' && localStorage.getItem('ALWATR_DEBUG') === '1')
  );
})();

/**
 * Color list storage for logger.
 */
const colorList = /* #__PURE__ */ (() =>
  platformInfo.isCli
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
    ])();

let _colorIndex = 0;
const _getNextColor = (): string => {
  const color = colorList[_colorIndex];
  _colorIndex++;
  if (_colorIndex >= colorList.length) {
    _colorIndex = 0;
  }
  return color;
};

const _style = /* #__PURE__ */ (() => ({
  scope: platformInfo.isCli ? '\x1b[{{color}}m' : 'color: {{color}};',
  reset: platformInfo.isCli ? '\x1b[0m' : 'color: inherit;',
}))();

const _keySection = /* #__PURE__ */ (() => (platformInfo.isCli ? '%s%s%s' : '%c%s%c'))();

const _sanitizeDomain = (domain: string): string => {
  domain = domain.trim();
  const first = domain.charAt(0);
  if (first !== '[' && first !== '{' && first !== '<') {
    domain = '{' + domain + '}';
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
export const createLogger = (domain: string, debugMode = defaultDebugMode): AlwatrLogger => {
  const color = _getNextColor();
  const styleScope = _style.scope.replace('{{color}}', color);
  domain = _sanitizeDomain(domain);

  /**
   * Required logger object, accident, error always reported even when the devMode is false.
   */
  const requiredItems: AlwatrLogger = {
    debugMode,

    banner: platformInfo.isCli
      ? console.log.bind(console, `\x1b[1;37;45m {{{ %s }}} ${_style.reset}`)
      : console.log.bind(
        console,
        '%c%s',
        'font-size: 2rem; background-color: #5858e8; color: #fff; padding: 1rem 4rem; border-radius: 0.5rem;',
      ),

    accident: platformInfo.isCli
      ? console.warn.bind(console, `${styleScope}⚠️\n%s\x1b[33m.%s() Accident \`%s\`!${_style.reset}`, domain)
      : console.warn.bind(console, '%c%s%c.%s() Accident `%s`!', styleScope, domain, _style.reset),

    error: platformInfo.isCli
      ? console.error.bind(console, `${styleScope}❌\n%s\x1b[31m.%s() Error \`%s\`${_style.reset}\n`, domain)
      : console.error.bind(console, '%c%s%c.%s() Error `%s`\n', styleScope, domain, _style.reset),
  };

  if (!debugMode) {
    return requiredItems;
  }
  // else
  return {
    ...requiredItems,

    logProperty: console.debug.bind(console, _keySection + '.%s = %o;', styleScope, domain, _style.reset),

    logMethod: console.debug.bind(console, _keySection + '.%s();', styleScope, domain, _style.reset),

    logFileModule: console.debug.bind(console, _keySection + '/%s.js;', styleScope, domain, _style.reset),

    logMethodArgs: console.debug.bind(console, _keySection + '.%s(%o);', styleScope, domain, _style.reset),

    logMethodFull: console.debug.bind(console, _keySection + '.%s(%o) => %o', styleScope, domain, _style.reset),

    logStep: console.debug.bind(console, _keySection + '.%s() -> %s', styleScope, domain, _style.reset),

    logOther: console.debug.bind(console, _keySection, styleScope, domain, _style.reset),

    incident: platformInfo.isCli
      ? console.log.bind(console, `${styleScope}🚸\n%s${_style.reset}.%s() Incident \`%s\`!${_style.reset}`, domain)
      : console.log.bind(console, '%c%s%c.%s() Incident `%s`!', styleScope, domain, 'color: orange;'),

    time: (label: string) => console.time(domain + '.' + label + ' duration time'),
    timeEnd: (label: string) => console.timeEnd(domain + '.' + label + ' duration time'),
  } as const;
};
