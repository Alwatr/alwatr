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
