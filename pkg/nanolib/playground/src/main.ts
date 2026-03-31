// Remember to remove sideEffect from nanolib package.json before test
import {createLogger} from '@alwatr/nanolib';
import '@alwatr/nanolib/node';

// import type {} from '@alwatr/nano-build';
// import type {} from '@alwatr/type-helper';

/* #__PURE__ */
createLogger(__package_name__);

const obj: DictionaryOpt<string> = {name: 'ali'};

console.log(`Hi ${obj.name}`);
