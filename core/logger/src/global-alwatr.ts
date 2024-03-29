import type {} from '@alwatr/type/global.js';

if (globalThis.Alwatr == null) {
  globalThis.Alwatr = {
    registeredList: [],
  };
}

try {
  _ALWATR_VERSION_;
}
catch {
  globalThis._ALWATR_VERSION_ = 'ERROR';
  console.warn('!! SCRIPTS LOADED OUTSIDE OF ALWATR BUILD ENVIRONMENT !!');
}

if (Alwatr.registeredList == null) {
  Alwatr.registeredList = [];
}

export const globalAlwatr = Alwatr;
