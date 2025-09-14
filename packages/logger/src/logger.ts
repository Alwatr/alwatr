import {platformInfo} from '@alwatr/platform-info';

import type {AlwatrLogger} from './type.js';

// --- Constants & Configurations ---

const globalThis_: typeof globalThis = /* #__PURE__ */ (() => {
  if (typeof globalThis === 'object' && globalThis) return globalThis;
  if (typeof window === 'object' && window) return window;
  if (typeof global === 'object' && global) return global;
  if (typeof self === 'object' && self) return self;
  throw new Error('alwatr/logger: Could not find global object.');
})();
const console_ = globalThis_.console;

/**
 * Default debug mode state, determined by environment variables or localStorage.
 */
const defaultDebugMode = /* #__PURE__ */ (() => {
  return (
    platformInfo.development ||
    (platformInfo.isCli
      ? process.env.NODE_ENV !== 'production' || Boolean(process.env.DEBUG)
      : typeof localStorage !== 'undefined' && localStorage.getItem('ALWATR_DEBUG') === '1')
  );
})();

/**
 * A list of aesthetically pleasing colors for console logging, adapted for CLI and browser environments.
 */
const colorList = /* #__PURE__ */ (() =>
  platformInfo.isCli
    ? ['0;36', '0;35', '0;34', '0;33', '0;32'] // CLI-safe colors
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

/**
 * Platform-specific styling templates for logger output.
 */
const style_ = /* #__PURE__ */ (() => ({
  scope: platformInfo.isCli ? '\x1b[{{color}}m' : 'color: {{color}};',
  reset: platformInfo.isCli ? '\x1b[0m' : 'color: inherit;',
}))();

/**
 * Platform-specific format for displaying the logger's scope.
 */
const keySection_ = /* #__PURE__ */ (() => (platformInfo.isCli ? '%s%s%s' : '%c%s%c'))();

// --- Utility Functions ---

let colorIndex_ = 0;
/**
 * Cycles through the `colorList` to provide a new color for each logger instance.
 */
function getNextColor_(): string {
  const color = colorList[colorIndex_];
  colorIndex_ = (colorIndex_ + 1) % colorList.length;
  return color;
}

/**
 * Sanitizes and formats the logger domain string by wrapping it in brackets if not already.
 */
function sanitizeDomain_(domain: string): string {
  domain = domain.trim();
  if (!/^[\[{<]/.test(domain)) {
    domain = `{${domain}}`;
  }
  return domain;
}

// --- Core Factory ---

/**
 * Create a logger function for fancy console debug with custom scope.
 *
 * - `color` is optional and automatically selected from an internal list.
 * - `debug` is optional and automatically detected from `ALWATR_DEBUG` in localStorage or `process.env.DEBUG`.
 *
 * @example
 * ```ts
 * import {createLogger} from '@alwatr/logger';
 * const logger = createLogger('my-module');
 *
 * logger.logMethodArgs?.('myMethod', {a: 1}); // This line is ignored if debugMode is false.
 * ```
 */
export const createLogger = (domain: string, debugMode = defaultDebugMode): AlwatrLogger => {
  const color = getNextColor_();
  const styleScope = style_.scope.replace('{{color}}', color);
  const sanitizedDomain = sanitizeDomain_(domain);

  /**
   * Logger methods that are always available, regardless of debugMode.
   */
  const requiredItems: AlwatrLogger = {
    debugMode,

    banner: platformInfo.isCli
      ? console_.log.bind(console_, `\x1b[1;37;45m {{{ %s }}} ${style_.reset}`)
      : console_.log.bind(
        console_,
        '%c%s',
        'font-size: 2rem; background-color: #5858e8; color: #fff; padding: 1rem 4rem; border-radius: 0.5rem;',
      ),

    accident: platformInfo.isCli
      ? console_.warn.bind(console_, `${styleScope}⚠️\n%s\x1b[33m.%s() Accident \`%s\`!${style_.reset}`, sanitizedDomain)
      : console_.warn.bind(console_, '%c%s%c.%s() Accident `%s`!', styleScope, sanitizedDomain, style_.reset),

    error: platformInfo.isCli
      ? console_.error.bind(console_, `${styleScope}❌\n%s\x1b[31m.%s() Error \`%s\`${style_.reset}\n`, sanitizedDomain)
      : console_.error.bind(console_, '%c%s%c.%s() Error `%s`\n', styleScope, sanitizedDomain, style_.reset),
  };

  if (!debugMode) {
    return requiredItems;
  }

  /**
   * Logger methods available only when debugMode is true.
   * Using `console.debug` which is often filtered by default in browsers unless "Verbose" logs are enabled.
   */
  return {
    ...requiredItems,

    logProperty: console_.debug.bind(console_, keySection_ + '.%s = %o;', styleScope, sanitizedDomain, style_.reset),

    logMethod: console_.debug.bind(console_, keySection_ + '.%s();', styleScope, sanitizedDomain, style_.reset),

    logFileModule: console_.debug.bind(console_, keySection_ + '/%s.js;', styleScope, sanitizedDomain, style_.reset),

    logMethodArgs: console_.debug.bind(console_, keySection_ + '.%s(%o);', styleScope, sanitizedDomain, style_.reset),

    logMethodFull: console_.debug.bind(console_, keySection_ + '.%s(%o) => %o', styleScope, sanitizedDomain, style_.reset),

    logStep: console_.debug.bind(console_, keySection_ + '.%s() -> %s', styleScope, sanitizedDomain, style_.reset),

    logOther: console_.debug.bind(console_, keySection_, styleScope, sanitizedDomain, style_.reset),

    logTable: console_.table.bind(console_),

    incident: platformInfo.isCli
      ? console_.log.bind(console_, `${styleScope}🚸\n%s${style_.reset}.%s() Incident \`%s\`!${style_.reset}`, sanitizedDomain)
      : console_.log.bind(console_, '%c%s%c.%s() Incident `%s`!', styleScope, sanitizedDomain, 'color: orange;'),

    time: (label: string) => console_.time(sanitizedDomain + '.' + label),
    timeEnd: (label: string) => console_.timeEnd(sanitizedDomain + '.' + label),
  } as const;
};
