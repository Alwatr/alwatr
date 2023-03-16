export const bench = (name: string, func: () => void): void => {
  globalThis.gc?.();
  const startMemory = process.memoryUsage.rss();
  const startTime = performance.now();
  for (let i = 1_000_000; i; i--) {
    func();
  }
  const duration = performance.now() - startTime;
  const runPerSec = Math.round( 1_000_000 / duration * 1000);
  const memoryUsage = Math.round((process.memoryUsage.rss() - startMemory) / 10) / 100;

  console.log(`run ${name} ${runPerSec.toLocaleString()}/s with ${memoryUsage.toLocaleString()}kb`);
  globalThis.gc?.();
};
