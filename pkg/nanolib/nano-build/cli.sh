#!/usr/bin/env bash

set -Eeuo pipefail

function echoColor() {
  # 0: gray, 1: red, 2: green, 3: yellow, 4: blue, 5: purple, 6: cyan, 7: white
	printf "\033[1;3${1}m${2}\033[0m"
}

if ! command -v bun >/dev/null 2>&1; then
  echoColor 1 "\n'bun' is not installed or not in PATH.\n"
  echoColor 7 "Please install Bun from https://bun.sh\n"
  exit 1
fi

packageName="$(grep -o '"name": *"[^"]*"' package.json | cut -d'"' -f4)"
packageVersion="$(grep -o '"version": *"[^"]*"' package.json | cut -d'"' -f4)"
banner="📦 ${packageName} v${packageVersion}"

echoColor 2 '\n🚀 Alwatr Nano Build\n'
echoColor 6 "${banner}\n\n"

preset=""
outdir="dist"
debug=false
args=()
devMode=true
if [[ "${NODE_ENV:-}" == "production" ]]; then
  devMode=false
fi

for arg in "$@"; do
  case "$arg" in
    --preset=*)
      preset="${arg#--preset=}"
    ;;

    --outdir=*)
      outdir="${arg#--outdir=}"
    ;;

    --debug)
      debug=true
      devMode=true
    ;;

    --help|-h)
      echoColor 7 "Usage: nano-build [flags] <entrypoint>\n\n"
      echoColor 7 "Flags:\n"
      echoColor 6 "  --preset=module|web|node-service|bun-service  Select a build preset\n"
      echoColor 6 "  --outdir=DIR                                  Specify output directory (default: dist)\n"
      echoColor 6 "  --debug                                       Enable debug mode (no minification, always sourcemaps)\n"
      echoColor 6 "  --help, -h                                    Show this help message\n"
      echoColor 7 "\nPreset values:\n"
      echoColor 6 "  module       Library/module output (esm, external packages)\n"
      echoColor 6 "  web          Browser bundle\n"
      echoColor 6 "  node-service Node.js bundled service\n"
      echoColor 6 "  bun-service  Bun bundled service\n"
      echoColor 7 "\nExtra flags are forwarded to 'bun build'.\n\n"
      bun build --help | sed -e 's|bun build|nano-build|g' -e 's|https://bun.com/docs/bundler|https://github.com/Alwatr/nanolib/tree/next/packages/nano-build#readme|g'
      exit 0
    ;;

    *)
      args+=("$arg")
    ;;
  esac
done

# default args for all presets
args+=(
  "--banner=/* ${banner} */" \
  "--outdir=${outdir}" \
  --env=disable \
  --define DEV_MODE="${devMode}" \
  --define __package_name__="'${packageName}'" \
  --define __package_version__="'${packageVersion}'" \
)

if $debug; then
  echoColor 3 "Debug mode enabled: skipping minification and enabling linked sourcemaps.\n"
else
  args+=('--production')
fi

hasPackages=false
for arg in "${args[@]}"; do
  if [[ "$arg" == --packages=* ]]; then
    hasPackages=true
    break
  fi
done

case "$preset" in
  module)
    args+=(
      '--root=src'
      '--target=node'
      '--sourcemap=linked'
      '--format=esm'
    )

    if ! $hasPackages; then
      hasPackages=true
      args+=('--packages=external')
    fi
  ;;

  module-web)
    args+=(
      '--root=src'
      '--target=browser'
      '--sourcemap=linked'
      '--format=esm'
    )

    if ! $hasPackages; then
      hasPackages=true
      args+=('--packages=external')
    fi
  ;;

  web)
    args+=(
      '--target=browser'
    )
    if $devMode; then
      args+=('--sourcemap=linked')
    fi
  ;;

  node-service)
    args+=(
      '--target=node'
    )
    if $devMode; then
      args+=('--sourcemap=linked')
    fi
  ;;

  bun-service)
    args+=(
      '--target=bun'
    )
    if $devMode; then
      args+=('--sourcemap=linked')
    fi
  ;;
esac

if ! $hasPackages; then
  args+=('--packages=bundle')
fi

# FIXME: what about down-leveling?
# esbuild target: ['chrome109', 'firefox115', 'safari15.6', 'ios15.8'],

printf "\033[1;30mBuilding with the following arguments:\n"
printf "  %s\n" "${args[@]}"
printf "\033[0m\n"

bun --prefer-offline build "${args[@]}"
