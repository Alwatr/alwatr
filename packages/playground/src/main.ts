// Remember to remove sideEffect from nanolib package.json before test
import {createLogger} from '@alwatr/nanolib';
import '@alwatr/nanolib/node';

/* #__PURE__ */
createLogger('playground');

const obj: DictionaryOpt<string> = {name: 'ali'};

console.log(`Hi ${obj.name}`);
