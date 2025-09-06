/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */

export {}; // Make this a module

/**
 * Global type declarations for convenient access throughout the project.
 */
declare global {
  // --- Basic Primitive and Falsy Types ---

  /**
   * Represents a primitive type in TypeScript.
   * @example
   * let myVar: Primitive = "hello";
   * myVar = 123;
   * myVar = null;
   */
  type Primitive = string | number | bigint | boolean | symbol | null | undefined;

  /**
   * Represents a type that includes all falsy values in JavaScript.
   * @example
   * const a: Falsy = 0;
   * const b: Falsy = "";
   */
  type Falsy = false | '' | 0 | 0n | null | undefined;

  /**
   * Represents a type that can be `null` or `undefined`.
   */
  type Nullish = null | undefined;

  // --- Utility Wrapper Types ---

  /**
   * Represents a type `T` that can also be `null`.
   * @template T The base type.
   */
  type Nullable<T> = T | null;

  /**
   * Represents a type `T` that can also be `undefined`. Often used for optional properties.
   * @template T The base type.
   */
  type Maybe<T> = T | undefined;

  /**
   * Represents a value that can be of type `T` or a Promise that resolves to `T`.
   * A more idiomatic name for `MaybePromise`.
   * @template T The type of the value.
   * @example
   * async function process(data: Awaitable<string>) {
   *   const resolvedData = await data;
   *   console.log(resolvedData);
   * }
   */
  type Awaitable<T> = T | Promise<T>;

  /**
   * Represents a value that can be either a single item of type `T` or an array of `T`.
   * @template T The type of the item(s).
   * @example
   * function logItems(items: SingleOrArray<string>) {
   *   const allItems = Array.isArray(items) ? items : [items];
   *   allItems.forEach(item => console.log(item));
   * }
   */
  type SingleOrArray<T> = T | T[];

  // --- Type Modifiers ---

  /**
   * Excludes `undefined` from a type `T`.
   * @template T The type to modify.
   */
  type NonUndefined<T> = T extends undefined ? never : T;

  /**
   * Makes all properties of an object mutable (removes `readonly`).
   * @template T The type to make mutable.
   * @example
   * type Config = { readonly port: number; };
   * type MutableConfig = Mutable<Config>; // { port: number; }
   */
  type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  /**
   * Makes properties of `T` required and removes `null` and `undefined` from their types.
   * Stricter than the built-in `Required<T>`.
   * @template T The type to make strictly required.
   * @example
   * type User = { name?: string | null; age?: number; };
   * type StrictUser = StrictlyRequired<User>; // { name: string; age: number; }
   */
  type StrictlyRequired<T> = {
    [P in keyof T]-?: NonNullable<T[P]>;
  };

  // --- Deep Recursive Types ---

  /**
   * Returns the keys of an object type `T` that are required (not optional).
   * @template T - The object type.
   * @returns The keys of `T` that are required.
   */
  type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
  }[keyof T];

  /**
   * Returns the keys of an object type `T` that are optional.
   * @template T - The object type.
   * @returns The keys of `T` that are optional.
   */
  type OptionalKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
  }[keyof T];

  /**
   * Represents a type that makes all properties of an object and its nested objects readonly.
   * @template T - The type to make readonly.
   * @returns The readonly version of the input type.
   */
  type DeepReadonly<T> = T extends ((...args: any[]) => any) | Primitive
    ? T
    : T extends DeepReadonlyArray_<infer U>
      ? DeepReadonlyArray_<U>
      : T extends DeepReadonlyObject_<infer V>
        ? DeepReadonlyObject_<V>
        : T;
  type DeepReadonlyArray_<T> = readonly DeepReadonly<T>[];
  type DeepReadonlyObject_<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
  };

  /**
   * Recursively makes all properties of an object and its nested objects/array required.
   * @template T - The type to make deep required.
   * @param {T} value - The value to make deep required.
   * @returns {DeepRequired<T>} - The deep required type.
   */
  type DeepRequired<T> = T extends (...args: any[]) => any
    ? T
    : T extends any[]
      ? DeepRequiredArray_<T[number]>
      : T extends object
        ? DeepRequiredObject_<T>
        : T;
  type DeepRequiredArray_<T> = DeepRequired<NonUndefined<T>>[];
  type DeepRequiredObject_<T> = {
    [P in keyof T]-?: DeepRequired<NonUndefined<T[P]>>;
  };

  /**
   * Represents a type that makes all properties of the given type optional recursively.
   * @template T - The type to make partial.
   */
  type DeepPartial<T> = {[P in keyof T]?: DeepPartial_<T[P]>};
  type DeepPartial_<T> = T extends ((...args: any[]) => any) | Primitive
    ? T
    : T extends (infer U)[]
      ? DeepPartialArray_<U>
      : T extends object
        ? DeepPartial<T>
        : T | undefined;
  type DeepPartialArray_<T> = DeepPartial_<T>[];

  // --- Function and Class Types ---

  /**
   * Represents a class constructor.
   * @template T The instance type of the class.
   * @template TArgs The type of the constructor arguments.
   */
  type Class<T, TArgs extends any[] = any[]> = new (...args: TArgs) => T;

  /**
   * Removes the first parameter from a function type.
   * @template F The function type.
   * @example
   * type MyFunc = (id: string, value: number) => void;
   * type CurriedFunc = OmitFirstParam<MyFunc>; // (value: number) => void
   */
  type OmitFirstParam<F> = F extends (x: any, ...args: infer A) => infer R ? (...args: A) => R : never;

  /**
   * Retrieves the type of a property from an object type.
   *
   * @template T - The object type.
   * @template K - The property key.
   * @returns {Prop<T, K>} - The type of the property.
   */
  type Prop<T, K> = K extends keyof T ? T[K] : never;

  /**
   * Gets a union of all value types in an object.
   * @template T The object type.
   * @example
   * type Config = { host: string; port: number; };
   * type ConfigValues = ObjectValues<Config>; // string | number
   */
  type ObjectValues<T> = T[keyof T];

  /**
   * Extracts the item type from an array (including readonly arrays).
   * Returns `never` if `T` is not an array.
   * @template T The array type.
   * @example
   * type Users = { name: string }[];
   * type User = ArrayItem<Users>; // { name: string }
   */
  type ArrayItem<T> = T extends readonly (infer U)[] ? U : never;

  /**
   * Overwrites properties of `M` with properties of `N`.
   * @template M The base type.
   * @template N The overriding type.
   * @example
   * type A = { a: string; b: number; };
   * type B = { b: string; c: boolean; };
   * type C = Overwrite<A, B>; // { a: string; b: string; c: boolean; }
   */
  type Overwrite<M, N> = Omit<M, keyof N> & N;

  /**
   * Flattens a complex type into a simple object representation (بکش از ما بیرون).
   * Useful for improving editor tooltips for complex intersection and mapped types.
   * And also to transform an interface into a type to aide with assignability.
   * @template T The type to simplify.
   */
  type Simplify<T> = {[K in keyof T]: T[K]} & {};

  /**
   * Represents an object that has the ability to add event listeners.
   */
  export interface HasAddEventListener {
    addEventListener: (type: string, listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions) => void;
  }

  /**
   * Represents a dictionary where values can be optional (undefined).
   *
   * @template T The type of values stored in the dictionary. Defaults to `any`.
   */
  type DictionaryOpt<T = any> = {[key in string]?: T};

  /**
   * Represents a dictionary where all values are required (non-optional).
   *
   * @template T The type of values stored in the dictionary. Defaults to `any`.
   */
  type DictionaryReq<T = any> = {[key in string]: T};

  /**
   * Matches any valid JSON primitive value.
   */
  type JsonPrimitive = string | number | boolean | null;

  /**
   * Strigifyable JSON value that can be of type `string`, `number`, `boolean`, `null`, `undefined`,
   * `JSONArray`, or `JSONObject`.
   */
  type JsonValue = JsonPrimitive | JsonArray | JsonObject | JsonifiableObject | undefined;

  /**
   * Represents `Array<JSONValues>`.
   */
  type JsonArray = JsonValue[] | readonly JsonValue[];

  /**
   * Represents an `Dictionary` of `JSONValue` (Record<string, JSONValues>)
   */
  type JsonObject = {[Key in string]?: JsonValue};

  /**
   * Represents an object that can be converted to JSON value (JsonObject or an object with toJSON method).
   */
  type JsonifiableObject = JsonObject | {toJSON: () => JsonValue};

  /**
   * Represents a Json response content that can be of type `JSONArray` or `JSONObject`.
   */
  type Json = JsonArray | JsonObject | JsonifiableObject;

  /**
   * Represents a type that cannot be converted to JSON.
   * This includes functions, undefined, and symbols.
   */
  type NotJsonifiable = ((...arguments_: any[]) => any) | undefined | symbol;

  /**
   * Filters out the keys from an object type that have values that are not JSONifiable.
   * @template T - The object type to filter.
   * @returns The keys from the object type that have values that are JSONifiable.
   */
  type FilterJsonifiableKeys<T extends object> = {
    [Key in keyof T]: T[Key] extends NotJsonifiable ? never : Key;
  }[keyof T];

  /**
   * Converts an object type to a JSONifiable object type.
   * @template T - The object type to be converted.
   * @returns The JSONifiable object.
   */
  type JsonifyObject<T extends object> = {
    [Key in keyof Pick<T, FilterJsonifiableKeys<T>>]: T[Key];
  };
}
