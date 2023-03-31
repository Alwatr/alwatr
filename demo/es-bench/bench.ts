const count = 1_000_000;
export const bench = (name: string, func: () => void): void => {
  globalThis.gc?.();
  const startMemory = globalThis.process?.memoryUsage.rss() ?? 0;
  const startTime = performance.now();
  for (let i = count; i; i--) {
    func();
  }
  const duration = performance.now() - startTime;
  const runPerSec = Math.round( count / duration * 1000);
  const memoryUsage = Math.round((globalThis.process?.memoryUsage.rss() ?? 0 - startMemory) / 10) / 100;

  console.log(`run ${name} ${runPerSec.toLocaleString()}/s with ${memoryUsage.toLocaleString()}kb`);
  globalThis.gc?.();
};
