export * from './storage.js';
export * from './service.js';
export * from './alwatr.js';
export * from './math.js';
export * from './chat.js';

// FIXME:
export type MaybePromise<T> = T | Promise<T>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<ClassType = Record<string, unknown>> = new (...args: any[]) => ClassType;
