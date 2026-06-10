import type {AlwatrLogger} from './type.js';

/**
 * Build-time flag injected by nano-build (`--define DEV_MODE=...`).
 *
 * - `true`  → development build: debug methods exist (still gated by `ALWATR_DEBUG` at runtime).
 * - `false` → production build: the entire debug section below becomes dead code and is
 *             removed by the bundler — only `name`, `banner`, `accident`, `error` remain.
 */
declare const DEV_MODE: boolean;

/**
 * Read platform flags once into plain booleans so every derived constant below is a
 * side-effect-free ternary — this is what lets the bundler tree-shake the dev-only
 * constants when they become unreferenced in production builds.
 */
const isCli_ = typeof process === 'object';

// ─────────────────────────── Production core ────────────────────────────────
// Everything in this section ships in EVERY build. Keep it tiny.

/**
 * Platform-specific styling templates for logger output.
 */
const styleScopeTemplate_ = isCli_ ? '\x1b[{{color}}m' : 'color: {{color}};';
const styleReset_ = isCli_ ? '\x1b[0m' : 'color: inherit;';

/**
 * A list of aesthetically pleasing colors for console logging, adapted for CLI and browser.
 * Used by `accident`/`error` too, so it stays in the production core.
 */
const colorList_ =
  isCli_ ?
    ['0;36', '0;35', '0;34', '0;33', '0;32'] // CLI-safe colors
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

let colorIndex_ = 0;
/**
 * Cycles through the `colorList_` to provide a new color for each logger instance.
 */
function getNextColor_(): string {
  const color = colorList_[colorIndex_];
  colorIndex_ = (colorIndex_ + 1) % colorList_.length;
  return color;
}

// ─────────────────────────── Dev-only section ───────────────────────────────
// Everything here is referenced ONLY behind `DEV_MODE`. When nano-build runs with
// `NODE_ENV=production` (`--define DEV_MODE=false`) this whole section is
// dead-code-eliminated from the output bundle.

/**
 * Platform-specific format for displaying the logger's scope.
 */
const keySection_ = isCli_ ? '%s%s%s' : '%c%s%c';

/**
 * Runtime debug-mode detection, determined by environment variables or localStorage.
 * Only evaluated in development builds.
 */
function detectSilentLog_(): boolean {
  if (isCli_) {
    return process.env.ALWATR_DEBUG === '0';
  } else {
    return typeof localStorage !== 'undefined' && localStorage.getItem('ALWATR_DEBUG') === '0';
  }
}

/**
 * Creates the verbose, debug-only logger methods.
 *
 * Every method is a **pre-bound `console` function** (`console.debug.bind(...)`) — never a
 * wrapper arrow function — so the browser DevTools shows the original call site
 * (file:line) of the caller, not this module.
 */
function createDebugMethods_(styleScope: string, name: string): Partial<AlwatrLogger> {
  return {
    logProperty: console.debug.bind(console, keySection_ + '.%s = %o;', styleScope, name, styleReset_),

    logMethod: console.debug.bind(console, keySection_ + '.%s();', styleScope, name, styleReset_),

    logFileModule: console.debug.bind(console, keySection_ + '/%s.js;', styleScope, name, styleReset_),

    logMethodArgs: console.debug.bind(console, keySection_ + '.%s(%o);', styleScope, name, styleReset_),

    logMethodFull: console.debug.bind(console, keySection_ + '.%s(%o) => %o', styleScope, name, styleReset_),

    logStep: console.debug.bind(console, keySection_ + '.%s() -> %s', styleScope, name, styleReset_),

    logOther: console.debug.bind(console, keySection_, styleScope, name, styleReset_),

    logTable: console.table.bind(console),

    incident:
      isCli_ ?
        console.log.bind(console, `${styleScope}🚸\n%s${styleReset_}.%s() Incident \`%s\`!${styleReset_}`, name)
      : console.log.bind(console, '%c%s%c.%s() Incident `%s`!', styleScope, name, 'color: orange;'),

    time: (label: string) => console.time(name + '.' + label),
    timeEnd: (label: string) => console.timeEnd(name + '.' + label),
  };
}

/**
 * Default debug mode detection at module initialization.
 */
const silentLogs_: boolean = DEV_MODE ? detectSilentLog_() : false;

// ─────────────────────────────── Factory ────────────────────────────────────

/**
 * Create a logger function for fancy console debug with custom scope.
 *
 * - `color` is optional and automatically selected from an internal list.
 * - Debug methods (`logMethod`, `logMethodArgs`, …) exist **only in development builds**
 *   and are additionally gated at runtime by `ALWATR_DEBUG` (localStorage) or
 *   `process.env.ALWATR_DEBUG`.
 * - In production builds the debug methods are `undefined` AND their implementation is
 *   removed from the bundle, so `logger.logMethod?.(…)` call sites are no-ops.
 * - `name`, `banner`, `accident`, `error` are always available in all builds.
 * - All methods are pre-bound `console` functions, so DevTools reports the **caller's**
 *   file and line number, not the logger's.
 *
 * @param name Logger scope name.
 *
 * @example
 * ```ts
 * import {createLogger} from '@alwatr/logger';
 * const logger = createLogger('my-module');
 *
 * DEV_MODE && logger.logMethodArgs?.('myMethod', {a: 1}); // Ignored when debug is off; stripped in prod builds.
 * ```
 */
export function createLogger(name: string): AlwatrLogger {
  const color = getNextColor_();
  const styleScope = styleScopeTemplate_.replace('{{color}}', color);

  /**
   * Logger methods that are always available, regardless of build or debug mode.
   */
  const logger: AlwatrLogger = {
    name,

    banner:
      isCli_ ?
        console.log.bind(console, `\x1b[1;37;45m {{{ %s }}} ${styleReset_}`)
      : console.log.bind(
          console,
          '%c%s',
          'font-size: 2rem; background-color: #5858e8; color: #fff; padding: 1rem 4rem; border-radius: 0.5rem;',
        ),

    accident:
      isCli_ ?
        console.warn.bind(console, `${styleScope}⚠️\n%s\x1b[33m.%s() Accident \`%s\`!${styleReset_}`, name)
      : console.warn.bind(console, '%c%s%c.%s() Accident `%s`!', styleScope, name, styleReset_),

    error:
      isCli_ ?
        console.error.bind(console, `${styleScope}❌\n%s\x1b[31m.%s() Error \`%s\`${styleReset_}\n`, name)
      : console.error.bind(console, '%c%s%c.%s() Error `%s`\n', styleScope, name, styleReset_),
  };

  if (DEV_MODE && !silentLogs_) {
    Object.assign(logger, createDebugMethods_(styleScope, name));
  }

  return logger;
}
