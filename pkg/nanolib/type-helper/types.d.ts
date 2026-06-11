/* eslint-disable @typescript-eslint/no-explicit-any */

// Named exports — no declare global. Import explicitly or use via @alwatr/core / @alwatr/flux.

// ─── Primitives ──────────────────────────────────────────────────────────────

/**
 * Union of all JavaScript primitive types.
 */
export type Primitive = string | number | bigint | boolean | symbol | null | undefined;

/**
 * Union of all JavaScript falsy values.
 *
 * @example
 * function isFalsy(v: unknown): v is Falsy {
 *   return !v;
 * }
 */
export type Falsy = false | '' | 0 | 0n | null | undefined;

/**
 * A value that is either `null` or `undefined`.
 * Useful for guard clauses: `if (value == null)`.
 */
export type Nullish = null | undefined;

// ─── Functions & Classes ─────────────────────────────────────────────────────

/**
 * Generic function type.
 *
 * @template Args - Tuple of argument types. Defaults to `unknown[]`.
 * @template R    - Return type. Defaults to `unknown`.
 *
 * @example
 * type Handler = Func<[string, number], boolean>;
 */
export type Func<Args extends unknown[] = unknown[], R = unknown> = (...args: Args) => R;

/** Any callable — equivalent to `Func` with no constraints. */
export type AnyFunc = Func<any[], any>;

/** A function that returns `void`. */
export type VoidFunc = Func<any[], void>;

/** A zero-argument function that returns `void`. */
export type NoopFunc = () => Awaitable<void>;

/**
 * Removes the first parameter from a function type.
 *
 * @example
 * type MyFunc = (ctx: Context, id: string) => void;
 * type WithoutCtx = OmitFirstParam<MyFunc>; // (id: string) => void
 */
export type OmitFirstParam<F> = F extends (_first: any, ...args: infer A) => infer R ? (...args: A) => R : never;

/**
 * A class constructor type.
 *
 * @template T     - The instance type produced by `new`.
 * @template TArgs - Constructor argument tuple. Defaults to `any[]`.
 *
 * @example
 * function create<T>(Ctor: Class<T>): T {
 *   return new Ctor();
 * }
 */
export type Class<T, TArgs extends unknown[] = any[]> = new (...args: TArgs) => T;

// ─── Wrappers & Modifiers ────────────────────────────────────────────────────

/**
 * `T | null` — value is present or explicitly absent.
 */
export type Nullable<T> = T | null;

/**
 * `T | undefined` — value may not have been set yet.
 * For "present or explicitly absent" use `Nullable<T>`.
 */
export type Maybe<T> = T | undefined;

/**
 * `T | Promise<T>` — value may be synchronous or asynchronous.
 *
 * @example
 * async function run(fn: () => Awaitable<void>) {
 *   await fn();
 * }
 */
export type Awaitable<T> = T | Promise<T>;

/**
 * `T | T[]` — accepts a single item or a mutable array.
 */
export type SingleOrArray<T> = T | T[];

/**
 * `T | readonly T[]` — accepts a single item or a readonly array.
 */
export type SingleOrReadonlyArray<T> = T | readonly T[];

/**
 * Excludes `undefined` from `T` while keeping `null`.
 * Use the built-in `NonNullable<T>` to exclude both `null` and `undefined`.
 */
export type NonUndefined<T> = T extends undefined ? never : T;

/**
 * Removes `readonly` from all properties of `T`.
 *
 * @example
 * type Config = { readonly port: number };
 * type MutableConfig = Mutable<Config>; // { port: number }
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * Makes every property of `T` required and strips `null | undefined` from each value type.
 * Stricter than the built-in `Required<T>`.
 *
 * @example
 * type User = { name?: string | null; age?: number };
 * type StrictUser = StrictlyRequired<User>; // { name: string; age: number }
 */
export type StrictlyRequired<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};
// ─── Dictionaries ────────────────────────────────────────────────────────────

/**
 * A sparse string-keyed map — any key may be absent.
 * Prefer over `Record<string, T | undefined>` for dynamic/unknown key sets.
 *

 * @template T - Value type. Defaults to `unknown`.
 *
 * @example
 * const cache: DictionaryOpt<number> = {};
 * const hit = cache['key']; // number | undefined
 */
export type DictionaryOpt<T> = {[key in string]?: T};

/**
 * A dense string-keyed map — every key is guaranteed to have a value.
 * Use when you control all keys and can assert their presence.
 *
 * @template T - Value type. Defaults to `unknown`.
 *
 * @example
 * const colors: DictionaryReq<string> = { success: '#4CAF50' };
 */
export type DictionaryReq<T> = {[key: string]: T};

// ─── Object Utilities ────────────────────────────────────────────────────────

/**
 * Union of all required keys of `T`.
 *
 * @example
 * type Props = { a: number; b?: string };
 * type R = RequiredKeys<Props>; // 'a'
 */
export type RequiredKeys<T> = {
  [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? never : K;
}[keyof T];

/**
 * Union of all optional keys of `T`.
 *
 * @example
 * type Props = { a: number; b?: string };
 * type O = OptionalKeys<Props>; // 'b'
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * The type of property `K` in `T`, or `never` if `K` is not a key of `T`.
 *
 * @example
 * type User = { id: number; name: string };
 * type NameType = Prop<User, 'name'>; // string
 */
export type Prop<T, K> = K extends keyof T ? T[K] : never;

/**
 * Union of all value types in object type `T`.
 *
 * @example
 * type Config = { host: string; port: number };
 * type V = ObjectValues<Config>; // string | number
 */
export type ObjectValues<T> = T[keyof T];

/**
 * Extracts the element type from an array or readonly array.
 * Returns `never` for non-array types.
 *
 * @example
 * type Users = { name: string }[];
 * type User = ArrayItem<Users>; // { name: string }
 */
export type ArrayItem<T> = T extends readonly (infer U)[] ? U : never;

/**
 * Replaces properties of `M` with matching properties from `N`.
 * Properties in `N` that don't exist in `M` are added.
 *
 * @example
 * type A = { a: string; b: number };
 * type B = { b: string; c: boolean };
 * type C = Overwrite<A, B>; // { a: string; b: string; c: boolean }
 */
export type Overwrite<M, N> = Omit<M, keyof N> & N;

/**
 * Eagerly evaluates a mapped or intersection type into a plain object shape.
 * Improves IDE tooltip readability for complex types.
 *
 * @example
 * type AB = Simplify<{ a: string } & { b: number }>; // { a: string; b: number }
 */
export type Simplify<T> = {[K in keyof T]: T[K]} & NonNullable<unknown>;

/**
 * Structural interface for anything that exposes `addEventListener`.
 * Covers `EventTarget`, `HTMLElement`, `Window`, `Worker`, etc.
 */
export interface HasAddEventListener {
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions): void;
}

// ─── Deep Recursive ──────────────────────────────────────────────────────────

/**
 * Built-in types whose internal structure should not be recursively transformed.
 * @internal
 */
type KeepMutable =
  | Date
  | RegExp
  | Promise<unknown>
  | Map<unknown, unknown>
  | Set<unknown>
  | WeakMap<object, unknown>
  | WeakSet<object>;

/**
 * Recursively makes every property of `T` (and nested objects/arrays) `readonly`.
 * Leaves primitives, functions, and `KeepMutable` types untouched.
 */
export type DeepReadonly<T> =
  T extends Primitive | ((...args: any[]) => any) ? T
  : T extends KeepMutable ? T
  : T extends (infer U)[] ? readonly DeepReadonly<U>[]
  : T extends readonly (infer U)[] ? readonly DeepReadonly<U>[]
  : {readonly [P in keyof T]: DeepReadonly<T[P]>};

/**
 * Recursively makes every property of `T` required and strips `null | undefined`
 * from each value type. Leaves primitives, functions, and `KeepMutable` types untouched.
 */
export type DeepRequired<T> =
  T extends Primitive | ((...args: any[]) => any) | KeepMutable ? T
  : T extends (infer U)[] ? DeepRequired<NonNullable<U>>[]
  : T extends readonly (infer U)[] ? DeepRequired<NonNullable<U>>[]
  : {[P in keyof T]-?: DeepRequired<NonNullable<T[P]>>};

/**
 * Recursively makes every property of `T` optional.
 * Leaves primitives, functions, and `KeepMutable` types untouched.
 */
export type DeepPartial<T> =
  T extends Primitive | ((...args: any[]) => any) | KeepMutable ? T
  : T extends (infer U)[] ? DeepPartial<U>[]
  : T extends readonly (infer U)[] ? DeepPartial<U>[]
  : {[P in keyof T]?: DeepPartial<T[P]>};

// ─── JSON ─────────────────────────────────────────────────────────────────────

/** A JSON-serialisable primitive value. */
export type JsonPrimitive = string | number | boolean | null | undefined;

/**
 * Any JSON-serialisable value.
 * Recursive union of `JsonPrimitive`, `JsonObject`, and `JsonArray`.
 */
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

/** A JSON-serialisable array. */
export type JsonArray = JsonValue[];

/**
 * A JSON-serialisable object.
 */
export interface JsonObject {
  [key: string]: JsonValue;
}

/**
 * Converts a TypeScript type `T` into its JSON-serialisable representation.
 *
 * Rules applied:
 * - Types with `toJSON()` resolve to its return type.
 * - `Date` → `string` (ISO 8601).
 * - `bigint`, functions, `undefined`, and `symbol` values are stripped.
 * - Objects and arrays are processed recursively.
 *
 * @example
 * type ApiResponse = { id: number; createdAt: Date; secret: symbol };
 * type Wire = Jsonify<ApiResponse>; // { id: number; createdAt: string }
 */
export type Jsonify<T> =
  T extends {toJSON(): infer J} ? J
  : T extends JsonPrimitive ? T
  : T extends bigint ? never
  : T extends Date ? string
  : T extends (infer U)[] ? Jsonify<U>[]
  : T extends readonly (infer U)[] ? readonly Jsonify<U>[]
  : T extends object ?
    {[K in keyof T as T[K] extends ((...args: any[]) => any) | undefined | symbol | bigint ? never : K]: Jsonify<T[K]>}
  : never;
