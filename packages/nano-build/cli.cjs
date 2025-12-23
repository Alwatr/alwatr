#!/usr/bin/env node

const pc = require('picocolors');

/**
 * @typedef {import('@alwatr/type-helper')}
 * @typedef {Omit<import('esbuild').BuildOptions, "mangleProps"> & {cjs?: boolean, mangleProps?: string | RegExp}} BuildOptions
 */

const {context, build} = require('esbuild');
const {resolve} = require('path');
const {existsSync} = require('fs');

const logger = {
  banner: (/** @type {string} */ message, /** @type {unknown[]} */ ...args) => console.log(pc.cyan(pc.bold(`${message}`)), ...args),
  info: (/** @type {string} */ message, /** @type {unknown[]} */ ...args) => console.log(pc.bgCyan(`[i] ${message} `), ...args),
  success: (/** @type {string} */ message, /** @type {unknown[]} */ ...args) => console.log(pc.bgGreen(`[✓] ${message} `), ...args),
  error: (/** @type {string} */ message, /** @type {unknown[]} */ ...args) => console.error(pc.bgRed(`[x] ${message} `), ...args),
  warn: (/** @type {string} */ message, /** @type {unknown[]} */ ...args) => console.warn(pc.bgYellow(`[!] ${message} `), ...args),
  log: console.log,
};

const packageJsonPath = resolve(process.cwd(), 'package.json');
if (existsSync(packageJsonPath) === false) {
  logger.error('`package.json` not found in `%s`', packageJsonPath);
  process.exit(1);
}
const packageJson = require(packageJsonPath);

logger.banner('\n🚀 Alwatr NanoBuild\n');
logger.banner('📦 %s v%s\n', packageJson.name, packageJson.version);

const devMode = process.env.NODE_ENV !== 'production';

logger.info(`${devMode ? 'Development' : 'Production'} mode`);

const watchMode = process.argv.includes('--watch');
if (watchMode) {
  logger.info('Watch mode enabled');
}

/**
 * @type {BuildOptions}
 */
const defaultOptions = {
  entryPoints: ['src/*.ts'],
  outdir: 'dist',
  logLevel: 'info',
  target: 'es2022',
  bundle: true,
  minify: true,
  minifyWhitespace: true,
  treeShaking: true,
  sourcemap: false,
  sourcesContent: false,
  charset: 'utf8',
  legalComments: 'linked',
  banner: {
    js: `/** 📦 ${packageJson.name} v${packageJson.version} */\n__dev_mode__: console.debug("📦 ${packageJson.name} v${packageJson.version}");`,
  },
  define: {
    __package_name__: `'${packageJson.name}'`,
    __package_version__: `'${packageJson.version}'`,
    __dev_mode__: devMode.toString(),
  },
};

/**
 * @type {BuildOptions}
 */
const developmentOptions = {
  sourcemap: true,
  sourcesContent: true,
};

/**
 * @type {BuildOptions}
 */
const productionOptions = {
  dropLabels: ['__dev_mode__'],
};

/**
 * @type {DictionaryOpt<BuildOptions>}
 */
const presetRecord = {
  default: {},
  module: {
    entryPoints: ['src/main.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    minify: false,
    cjs: true,
    packages: 'external',
    sourcemap: true,
    sourcesContent: true,
  },
  module2: {
    entryPoints: ['src/*.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    minify: false,
    cjs: true,
    packages: 'external',
    sourcemap: true,
    sourcesContent: true,
  },
  module3: {
    entryPoints: ['src/**/*.ts'],
    bundle: false,
    platform: 'node',
    format: 'esm',
    minify: false,
    cjs: true,
    packages: 'external',
    sourcemap: true,
    sourcesContent: true,
  },
  pwa: {
    entryPoints: ['src/*.ts'],
    platform: 'browser',
    format: 'iife',
    mangleProps: '_$',
    target: ['chrome109', 'firefox115', 'safari15.6', 'ios15.8'],
    ...(devMode ? developmentOptions : productionOptions),
  },
  pmpa: {
    entryPoints: ['site/_ts/*.ts'],
    outdir: 'dist/es',
    platform: 'browser',
    format: 'iife',
    mangleProps: '_$',
    target: ['chrome109', 'firefox115', 'safari15.6', 'ios15.8'],
    ...(devMode ? developmentOptions : productionOptions),
  },
  weaver: {
    entryPoints: ['src/ts/*.ts'],
    outdir: 'dist/es',
    platform: 'browser',
    format: 'iife',
    mangleProps: '_$',
    target: ['chrome109', 'firefox115', 'safari15.6', 'ios15.8'],
    ...(devMode ? developmentOptions : productionOptions),
  },
  microservice: {
    entryPoints: ['src/main.ts'],
    platform: 'node',
    format: 'esm',
    mangleProps: '_$',
    target: 'node22',
    ...(devMode ? developmentOptions : productionOptions),
  },
};

function getOptions() {
  const presetName = process.argv.find((arg) => arg.startsWith('--preset='))?.split('=')[1] ?? 'default';
  logger.info('Preset: `%s`', presetName);
  if (!Object.hasOwn(presetRecord, presetName)) {
    logger.error('Preset `%s` not found', presetName);
    process.exit(1);
  }

  const presetOptions = presetRecord[presetName];

  const options = {
    ...defaultOptions,
    ...presetOptions,
    ...packageJson['nano-build'],
    ...(devMode ? packageJson['nano-build-development'] : packageJson['nano-build-production']),
  };

  // Remove null fields from esbuildOptions
  Object.keys(options).forEach((key) => {
    if (options[key] === null) {
      delete options[key];
    }
  });

  logger.info('Options:', options);

  if (typeof options.mangleProps === 'string') {
    options.mangleProps = new RegExp(options.mangleProps);
  }

  return options;
}

/**
 * Nano build process.
 * @param {import('esbuild').BuildOptions} options
 */
async function nanoBuild(options) {
  // @ts-ignore
  const alsoCjs = options.format === 'esm' && options.cjs;
  // @ts-ignore
  delete options.cjs;

  if (options.format === 'esm' || options.format === 'cjs') {
    options.outExtension = {
      '.js': options.format === 'esm' ? '.mjs' : '.cjs',
      ...options.outExtension,
    };
  }

  if (watchMode) {
    logger.info('Watching for changes...');
    const esbuildContext = await context(options);
    await esbuildContext.watch();
    logger.success('Watching for file changes.');
    return;
  }

  // else
  logger.info('Building...');
  await build(options);
  if (alsoCjs) {
    logger.info('Building CJS bundle...');
    await build({
      ...options,
      format: 'cjs',
      outExtension: {
        ...options.outExtension,
        '.js': '.cjs',
      },
    });
  }
  logger.success('Build complete.');
}

nanoBuild(getOptions());
