/* eslint-disable no-var */

export interface AlwatrPackageInfo {
  name: string;
  version: string;
}

export interface GlobalAlwatr {
  registeredList: AlwatrPackageInfo[];
}

declare global {
  var _ALWATR_VERSION_: string;
  var Alwatr: GlobalAlwatr;
}
