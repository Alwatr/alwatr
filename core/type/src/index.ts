export * from './chat.js';
export * from './service-response.js';
export * from './storage.js';
export * from './alwatr.js';
export * from './math.js';

// FIXME:
export type MaybePromise<T> = T | Promise<T>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<ClassType = Record<string, unknown>> = new (...args: any[]) => ClassType;
