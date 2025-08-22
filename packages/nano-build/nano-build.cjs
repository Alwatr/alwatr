#!/usr/bin/env node

const {context, build} = require('esbuild');
const {resolve} = require('path');
const {existsSync} = require('fs');

const packageJsonPath = resolve(process.cwd(), 'package.json');
if (existsSync(packageJsonPath) === false) {
  console.error('❌ package.json not found', {path: packageJsonPath});
  process.exit(1);
}
const packageJson = require(packageJsonPath);

console.log('\n🚀 nano-build 📦 %s\n', packageJson.name);

const devMode = process.env.NODE_ENV !== 'production';

console.log(`🔧 ${devMode ? 'Development' : 'Production'} mode`);

const watchMode = process.argv.includes('--watch');

/**
 * @type {import('esbuild').BuildOptions}
 */
const defaultOptions = {
  entryPoints: ['src/*.ts'],
  outdir: 'dist',
  logLevel: 'info',
  target: 'es2020',
  bundle: true,
  minify: true,
  treeShaking: true,
  sourcemap: false,
  sourcesContent: false,
  charset: 'utf8',
  legalComments: 'linked',
  banner: {
    js: '/* ' + packageJson.name + ' v' + packageJson.version + ' */',
  },
  define: {
    __package_name__: `'${packageJson.name}'`,
    __package_version__: `'${packageJson.version}'`,
    __dev_mode__: devMode.toString(),
  },
};

/**
 * @type {import('esbuild').BuildOptions}
 */
const developmentOptions = {
  sourcemap: true,
  sourcesContent: true,
};

/**
 * @type {import('esbuild').BuildOptions}
 */
const productionOptions = {
  dropLabels: ['__dev_mode__'],
};

/**
 * @type {DictionaryOpt<import('esbuild').BuildOptions & {cjs?: boolean}>}
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
    target: ['es2018', 'chrome62', 'edge79', 'firefox78', 'safari11'],
    ...(devMode ? developmentOptions : productionOptions),
  },
  pmpa: {
    entryPoints: ['site/_ts/*.ts'],
    outdir: 'dist/es',
    platform: 'browser',
    format: 'iife',
    mangleProps: '_$',
    target: ['es2018', 'chrome62', 'edge79', 'firefox78', 'safari11'],
    ...(devMode ? developmentOptions : productionOptions),
  },
  weaver: {
    entryPoints: ['src/ts/*.ts'],
    outdir: 'dist/es',
    platform: 'browser',
    format: 'iife',
    mangleProps: '_$',
    target: ['es2018', 'chrome62', 'edge79', 'firefox78', 'safari11'],
    ...(devMode ? developmentOptions : productionOptions),
  },
  microservice: {
    entryPoints: ['src/main.ts'],
    platform: 'node',
    format: 'esm',
    mangleProps: '_$',
    target: 'node20',
    ...(devMode ? developmentOptions : productionOptions),
  },
};

function getOptions() {
  let presetName = process.argv.find((arg) => arg.startsWith('--preset='))?.split('=')[1] ?? 'default';
  console.log('🔧 preset: %s', presetName);
  if (!Object.hasOwn(presetRecord, presetName)) {
    console.error('❌ preset not found', {preset: presetName});
    process.exit(1);
  }

  const presetOptions = presetRecord[presetName];

  let options = {
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

  console.log('🛠️  options: %o\n', options);

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
  const alsoCjs = options.format === 'esm' && options.cjs;
  delete options.cjs;

  if (options.format === 'esm' || options.format === 'cjs') {
    options.outExtension = {
      '.js': options.format === 'esm' ? '.mjs' : '.cjs',
      ...options.outExtension,
    };
  }

  if (watchMode) {
    console.log('👀 Watching...');
    const esbuildContext = await context(options);
    esbuildContext.watch();
    return;
  }

  // else
  console.log('🛠️  Building...');
  await build(options);
  if (alsoCjs) {
    await build({
      ...options,
      format: 'cjs',
      outExtension: {
        ...options.outExtension,
        '.js': '.cjs',
      },
    });
  }
}

nanoBuild(getOptions());
