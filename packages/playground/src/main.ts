// Remember to remove sideEffect from nanolib package.json before test
import {createLogger} from '@alwatr/nanolib';
import '@alwatr/nanolib/node';

/* #__PURE__ */
createLogger('playground');

console.log('hi');
