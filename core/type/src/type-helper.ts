/* eslint-disable @typescript-eslint/no-explicit-any */

export type Constructor<ClassType = Record<string, unknown>> = new (...args: any[]) => ClassType;

export type MaybePromise<T> = T | Promise<T>;

export type OmitFirstParam<F> = F extends (x: any, ...args: infer A) => infer R ? (...args: A) => R : never;
