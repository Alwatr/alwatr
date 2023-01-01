/* eslint-disable no-var */
export type AlwatrPackageInfo = {
  name: string;
  version: string;
}

export type GlobalAlwatr = {
  registeredList: Array<AlwatrPackageInfo>;
}

declare global {
  var Alwatr: GlobalAlwatr;
}

if (globalThis.Alwatr == null) {
  globalThis.Alwatr = {
    registeredList: [],
  };
}

if (Alwatr.registeredList == null) {
  Alwatr.registeredList = [];
}
