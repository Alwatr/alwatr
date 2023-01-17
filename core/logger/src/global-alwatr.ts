import type {} from '@alwatr/type/global.js';

if (globalThis.Alwatr == null) {
  globalThis.Alwatr = {
    registeredList: [],
  };
}

if (globalThis._ALWATR_VERSION_ == null) {
  globalThis._ALWATR_VERSION_ = 'ERROR';
  console.warn('!! SCRIPTS LOADED OUTSIDE OF ALWATR BUILD ENVIRONMENT !!');
}

if (Alwatr.registeredList == null) {
  Alwatr.registeredList = [];
}

export const globalAlwatr = Alwatr;
