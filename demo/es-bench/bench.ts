if (globalThis.process && (globalThis.process?.env.NODE_ENV !== 'production' || typeof globalThis.gc !== 'function')) {
  console.warn('Please run node in production with `--expose-gc` for benchmark\nNODE_ENV=production node --expose-gc demo/...');
}

export const bench = (name: string, func: () => void, count = 1_000_000): void => {
  globalThis.gc?.();
  let i = count;
  const startMemory = globalThis.process?.memoryUsage.rss() ?? 0;
  const startTime = performance.now();

  while (i--) {
    func();
  }

  const duration = performance.now() - startTime;
  const runPerSec = Math.ceil((count / duration) * 1000);
  const memoryUsage = Math.round(((globalThis.process?.memoryUsage.rss() ?? 0) - startMemory) / 10) / 100;

  console.log(
    `run ${name} ${runPerSec.toLocaleString()}/s with ${
      globalThis.process?.memoryUsage.rss !== undefined ? memoryUsage.toLocaleString() : '?'
    }kb`
  );
  globalThis.gc?.();
};
