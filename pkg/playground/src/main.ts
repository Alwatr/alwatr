// Remember to remove sideEffect from nanolib package.json before test
import {createLogger} from '@alwatr/core';
import '@alwatr/node';

// //
/* #__PURE__ */
createLogger(__package_name__);

const obj: DictionaryOpt<string> = {name: 'ali'};

console.log(`Hi ${obj.name}`);
