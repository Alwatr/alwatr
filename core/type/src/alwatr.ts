/* eslint-disable no-var */
export interface GlobalAlwatr {
  version: string;
  registeredList: Array<{
    name: string;
    version: string;
  }>;
}

declare global {
  var Alwatr: GlobalAlwatr;
  var ALWATR_DEBUG: string | undefined;

  /**
   * @TODO: Make an issue to TS, WTF is this way! any better solution for more args in bind?!
   */
  interface CallableFunction {
    bind<T, A0, A1, A2, A3, A4, A extends unknown[], R>(
      this: (this: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3, arg4: A4, ...args: A) => R,
      thisArg: T,
      arg0: A0,
      arg1: A1,
      arg2: A2,
      arg3: A3,
      arg4: A4
    ): (...args: A) => R;
  }
}

/**
 * Define `globalThis.Alwatr.registeredList`
 */
export const alwatrRegisteredList = globalThis.Alwatr?.registeredList || [];
globalThis.Alwatr ??= {version: '0.26.0', registeredList: alwatrRegisteredList};
