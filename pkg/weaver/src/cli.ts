/**
 * @alwatr/weaver — CLI surface.
 *
 * A tiny, zero-dependency argv parser plus the help/version text. Kept pure (no side
 * effects, no process access) so it is trivially testable and the factory stays in
 * control of when anything is printed or executed.
 */
import type {ParsedArgs} from './type.js';

/** The weaver version, surfaced by `--version`. Keep in sync with package.json. */
export const version = '0.2.0';

/** Usage text printed by `--help`. */
export const helpText = `
🧵 weaver — bun-native build & dev server for @alwatr/loom sites

Usage:
  bun src/weaver.ts [command] [options]

Commands:
  build            Build the site to disk (default). Honors NODE_ENV for dev/prod.
  serve, --serve   Build in memory and serve it, with live-reload.

Watch is split by what each tool can see. Start serve under Bun's native watcher:

  bun --watch src/weaver.ts serve

  • pages / render graph (.tsx, loom)  → bun --watch restarts the process, so they
    re-render over a fresh module graph (no temp files, no stale cache).
  • client JS + CSS (the Bun.build inputs) → not in the server's import graph, so
    weaver watches them in-process, rebuilds the bundle, and live-reloads.

Options:
  -s, --serve      Start the dev server (in-memory, live-reload).
      --prod       Force production output (minify, no sourcemap, DEV_MODE=false).
      --dev        Force development output, overriding NODE_ENV.
  -p, --port <n>   Dev server port (default: PORT env or 3000).
      --host <h>   Dev server hostname (default: 0.0.0.0).
      --out <dir>  Override the output directory for this run.
      --no-reload  Disable browser live-reload injection in serve mode.
  -v, --verbose    Verbose logging.
  -h, --help       Show this help.
      --version    Print the weaver version.

Examples:
  bun src/weaver.ts                       # one-shot build to outDir
  NODE_ENV=production bun src/weaver.ts    # production build
  bun --watch src/weaver.ts serve          # dev server :3000 with live-reload
  bun --watch src/weaver.ts serve -p 8080  # dev server on :8080
`;

/**
 * Parse an argv vector (already sliced past `bun script.ts`) into a normalized command.
 *
 * Accepts `--key value`, `--key=value`, short aliases, and bare command words. Unknown
 * flags are ignored rather than fatal, so the CLI stays forgiving in scripts.
 */
export function parseArgs(argv: readonly string[]): ParsedArgs {
  const result: ParsedArgs = {
    command: 'build',
    prod: false,
    dev: false,
    noReload: false,
    verbose: false,
  };

  for (let index = 0; index < argv.length; index++) {
    const token = argv[index];
    // Split `--key=value` once so both forms share a code path.
    const eq = token.indexOf('=');
    const key = eq === -1 ? token : token.slice(0, eq);
    const inlineValue = eq === -1 ? undefined : token.slice(eq + 1);
    // Pull the next token as a value for options that need one.
    const takeValue = (): string | undefined => inlineValue ?? argv[++index];

    switch (key) {
      case 'build':
      case '-b':
      case '--build':
        result.command = 'build';
        break;

      case 'serve':
      case '-s':
      case '--serve':
        result.command = 'serve';
        break;

      case 'help':
      case '-h':
      case '--help':
        result.command = 'help';
        break;

      case '--version':
        result.command = 'version';
        break;

      case '--prod':
        result.prod = true;
        break;

      case '--dev':
        result.dev = true;
        break;

      case '--no-reload':
        result.noReload = true;
        break;

      case '-v':
      case '--verbose':
        result.verbose = true;
        break;

      case '-p':
      case '--port': {
        const value = takeValue();
        if (value != null) result.port = Number(value);
        break;
      }

      case '--host':
        result.host = takeValue();
        break;

      case '--out':
        result.out = takeValue();
        break;

      default:
        // Ignore unknown tokens; keeps the CLI forgiving inside package scripts.
        break;
    }
  }

  return result;
}
