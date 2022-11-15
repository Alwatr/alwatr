/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {fetch} from '@alwatr/fetch';

const response = await fetch({
  url: 'http://httpbin.org/uuid',
  timeout: 3_000,
  removeDuplicate: 'auto',
});

console.log(await response.text());
