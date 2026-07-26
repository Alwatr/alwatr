/**
 * @alwatr/bobbin — build-time data pipeline.
 *
 * A declarative data pipeline that is independent of the rendering/static site generator
 * core.
 *
 * The shape of the pipeline is clean: *declaration* is pure and side-effect-free
 * (`defineSource`/`defineData` are identity helpers), while *execution* (`buildData`) is
 * the single place that performs I/O. Each source is fetched once, validated, and cached
 * on disk as one JSON object — later consumed by a thin, typed reader module via a plain
 * `import`. This keeps network operations entirely out of the normal dev/site build.
 * Regenerate on demand, only when a source changes.
 */
import {mkdir, writeFile} from 'node:fs/promises';
import {isAbsolute, join, relative, resolve} from 'node:path';

/**
 * A single external origin to fetch and cache at build time.
 *
 * The shape `T` is constrained to a non-primitive `object` (never an array — every
 * artifact is one JSON *object*). Constraining to `object` lets authors model data with
 * ordinary `interface`s.
 */
export interface Source<T extends object = object> {
  /** Output key; the generated artifact is `<name>.json`. Must be a bare file name. */
  name: string;
  /** The single I/O point: fetch + transform an external origin into one JSON object. */
  load: () => T | Promise<T>;
  /** Optional guard, run at build time; a failure aborts the build loudly (fail-fast). */
  schema?: (data: unknown) => data is T;
}

/** Identity helper that gives a data source its type and editor support. */
export const defineSource = <T extends object>(source: Source<T>): Source<T> => source;

/** The data registry: every source declared explicitly, plus where to write them. */
export interface Config {
  /** Directory the generated `*.json` files are written to. Resolved from cwd. */
  outDir?: string;
  /** Every data source to fetch and cache, in any order. Item shape is erased to `object`. */
  sources: Source[];
  /** Optional: minify JSON output (default: false). */
  minify?: boolean;
}

export interface BuildResult {
  /** Name of the data source (without .json extension). */
  name: string;
  /** The resolved JSON data object (only present when outDir is disabled). */
  data?: object;
  /** The final output file path (only present when outDir is enabled). */
  filePath?: string;
}

/** Identity helper that gives a configuration its type and editor support. */
export const defineData = (config: Config): Config => config;

/**
 * Fetch every source in `config.sources` and write `<outDir>/<name>.json` if provided.
 *
 * The output directory is intentionally not cleaned: these artifacts are an on-demand
 * cache regenerated only when a source changes, so unrelated files are preserved.
 */
export async function buildData(config: Config): Promise<BuildResult[]> {
  console.log('\n🧶 bobbin: generating…\n');
  const outDir = config.outDir != null ? resolve(config.outDir) : null;
  if (outDir != null) {
    await mkdir(outDir, {recursive: true});
  }

  const results: BuildResult[] = [];

  for (const source of config.sources) {
    let data: object;
    try {
      data = await source.load();
    } catch (error) {
      throw new Error(`bobbin: data source "${source.name}" failed to load`, {cause: error});
    }
    if (source.schema != null && !source.schema(data)) {
      throw new Error(`bobbin: data source "${source.name}" failed schema validation`);
    }

    const resultItem: BuildResult = {
      name: source.name,
    };

    if (outDir == null) {
      resultItem.data = data;
    } else {
      const filePath = nameToPath(outDir, source.name);
      await writeFile(filePath, config.minify ? JSON.stringify(data) : JSON.stringify(data, null, 2));
      resultItem.filePath = filePath;
    }

    console.log(`       → ${source.name.padEnd(24)} ${resultItem.filePath ?? 'in-memory'}`);

    results.push(resultItem);
  }

  console.log('\n✅ generate complete');
  return results;
}

/**
 * Map a source name to an output file path. Guards against path traversal and nesting:
 * a `name` must stay a bare file inside `outDir`.
 */
function nameToPath(outDir: string, name: string): string {
  const filePath = join(outDir, `${name}.json`);
  const rel = relative(outDir, filePath);
  if (rel === '' || rel.startsWith('..') || isAbsolute(rel) || rel.includes('/') || rel.includes('\\')) {
    throw new Error(`bobbin: data source name "${name}" resolves outside the output directory`);
  }
  return filePath;
}
