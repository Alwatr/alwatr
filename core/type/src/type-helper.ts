/* eslint-disable @typescript-eslint/no-explicit-any */

export type Constructor<T> = new (...args: any[]) => T;

export type MaybePromise<T> = T | Promise<T>;

export type OmitFirstParam<F> = F extends (x: any, ...args: infer A) => infer R ? (...args: A) => R : never;

/**
 * Object that can be JSON.stringify.
 */
export type Stringifyable =
    | string
    | number
    | boolean
    | null
    | undefined
    | { [x: string]: Stringifyable }
    | Array<Stringifyable>;
