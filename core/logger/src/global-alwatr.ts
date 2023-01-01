import type {} from '@alwatr/type/global.js';

if (globalThis.Alwatr == null) {
  globalThis.Alwatr = {
    registeredList: [],
  };
}

if (Alwatr.registeredList == null) {
  Alwatr.registeredList = [];
}

export const globalAlwatr = Alwatr;
