/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */

export {}; // Make this a module

/**
 * Global Basic Types.
 */
declare global {
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
}

/**
 * Global Utility Wrapper & Types Modifiers.
 */
declare global {
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

  /**
   * Represents a dictionary object with string keys and values of a specific type.
   * Any key might be absent, making this suitable for sparse objects or dynamic maps.
   *
   * @template T The type of values in the dictionary. Defaults to `any`.
   * @example
   * const userRoles: DictionaryOpt<number> = {
   * 'admin': 1,
   * 'editor': 2,
   * };
   *
   * const guestRole = userRoles['guest']; // number | undefined
   */
  type DictionaryOpt<T = any> = {[key in string]?: T};

  /**
   * Represents a dictionary object where any string key is expected to have a value of a specific type.
   * Unlike `DictionaryOpt`, values are not optional. This is useful for type constraints.
   *
   * @template T The type of values in the dictionary. Defaults to `any`.
   * @example
   * const statusColors: DictionaryReq<string> = {
   * 'success': '#4CAF50',
   * 'error': '#F44336',
   * 'warning': '#FFC107'
   * };
   *
   * function getColor(status: string): string {
   * return statusColors[status] || '#FFFFFF'; // Accessing any key returns a string
   * }
   */
  type DictionaryReq<T = any> = {[key in string]: T};
}

/**
 * Global Object and Key Manipulation
 */
declare global {
  /**
   * Extracts the keys of `T` that are required.
   * @template T The object type.
   * @example
   * type Props = { a: number; b?: string };
   * type RKeys = RequiredKeys<Props>; // "a"
   */
  type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
  }[keyof T];

  /**
   * Extracts the keys of `T` that are optional.
   * @template T The object type.
   * @example
   * type Props = { a: number; b?: string };
   * type OKeys = OptionalKeys<Props>; // "b"
   */
  type OptionalKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
  }[keyof T];

  /**
   * Gets the type of a property from an object type.
   * @template T The object type.
   * @template K The property key.
   * @example
   * type User = { id: number, name: string };
   * type NameType = Prop<User, 'name'>; // string
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
   *
   * Useful for improving editor tooltips for complex intersection and mapped types.
   *
   * And also to transform an interface into a type to aide with assignability.
   * @template T The type to simplify.
   */
  type Simplify<T> = {[K in keyof T]: T[K]} & {};

  /**
   * Represents a class constructor.
   * @template T The instance type of the class.
   * @template TArgs The type of the constructor arguments.
   */
  type Class<T, TArgs extends any[] = any[]> = new (...args: TArgs) => T;
}

/**
 * A collection of built-in types that should not be made deeply readonly.
 */
type KeepMutable = Date | RegExp | Map<any, any> | Set<any> | WeakMap<any, any> | WeakSet<any>;

/**
 * Global Deep Recursive Types
 */
declare global {
  /**
   * Recursively makes all properties of an object or array `readonly`.
   * @template T The type to make deeply readonly.
   */
  type DeepReadonly<T> = T extends Primitive | ((...args: any[]) => any)
    ? T
    : T extends KeepMutable
      ? T
      : T extends (infer U)[]
        ? readonly DeepReadonly<U>[]
        : T extends readonly (infer U)[]
          ? readonly DeepReadonly<U>[]
          : {readonly [P in keyof T]: DeepReadonly<T[P]>};

  /**
   * Recursively makes all properties of an object or array required.
   * It also removes `null` and `undefined` from property types.
   * @template T The type to make deeply required.
   */
  type DeepRequired<T> = T extends Primitive | ((...args: any[]) => any) | KeepMutable
    ? T
    : T extends (infer U)[]
      ? DeepRequired<NonNullable<U>>[]
      : T extends readonly (infer U)[]
        ? DeepRequired<NonNullable<U>>[]
        : {[P in keyof T]-?: DeepRequired<NonNullable<T[P]>>};

  /**
   * Recursively makes all properties of an object or array optional.
   * @template T The type to make deeply partial.
   */
  type DeepPartial<T> = T extends Primitive | ((...args: any[]) => any) | KeepMutable
    ? T
    : T extends (infer U)[]
      ? DeepPartial<U>[]
      : T extends readonly (infer U)[]
        ? DeepPartial<U>[]
        : {[P in keyof T]?: DeepPartial<T[P]>};
}

/**
 * Global JSON Types
 */
declare global {
  /** A JSON-compatible primitive value. */
  type JsonPrimitive = string | number | boolean | null;

  /**
   * Any JSON-compatible value.
   * This is a recursive type that defines the structure of a JSON object.
   */
  type JsonValue = JsonPrimitive | JsonObject | JsonArray;

  /**
   * A JSON-compatible array.
   */
  interface JsonArray extends Array<JsonValue> {}

  /**
   * A JSON-compatible object.
   */
  interface JsonObject extends DictionaryOpt<JsonValue> {}

  /**
   * Converts a TypeScript type into its JSON-compatible representation.
   * - Removes functions, `undefined`, and symbols.
   * - Converts `Date` objects to strings (`toISOString`).
   * - Recursively processes objects and arrays.
   * - Handles objects with a `toJSON` method.
   * @template T The type to convert to a JSON-compatible type.
   */
  type Jsonify<T> = T extends {toJSON(): infer J}
    ? J
    : T extends JsonPrimitive
      ? T
      : T extends Date
        ? string
        : T extends (infer U)[]
          ? Jsonify<U>[]
          : T extends readonly (infer U)[]
            ? readonly Jsonify<U>[]
            : T extends object
              ? {[K in keyof T as T[K] extends ((...args: any[]) => any) | undefined | symbol ? never : K]: Jsonify<T[K]>}
              : never;
}

/**
 * Other Global Utility Types
 */
declare global {
  /**
   * Removes the first parameter from a function type.
   * @template F The function type.
   * @example
   * type MyFunc = (id: string, value: number) => void;
   * type CurriedFunc = OmitFirstParam<MyFunc>; // (value: number) => void
   */
  type OmitFirstParam<F> = F extends (x: any, ...args: infer A) => infer R ? (...args: A) => R : never;

  /**
   * Represents an object that has the ability to add event listeners.
   */
  interface HasAddEventListener {
    addEventListener: (type: string, listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions) => void;
  }
}
