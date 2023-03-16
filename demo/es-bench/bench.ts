import type {MaybePromise} from '@alwatr/type';

export function bench(name: string, func: () => MaybePromise<void>): void {
  const startMemory = process.memoryUsage.rss();
  const startTime = performance.now();
  for (let i = 1_000_000; i; i--) {
    func();
  }
  const duration = Math.round((performance.now() - startTime) * 100) / 100;
  const memoryUsage = Math.round((process.memoryUsage.rss() - startMemory) / 10) / 100;

  console.log(`run ${name} 1,000,000 time in ${duration}ms with ${memoryUsage}kb`);
}
