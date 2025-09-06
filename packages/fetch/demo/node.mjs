import {fetch} from '@alwatr/fetch';

try {
  const response1 = fetch('https://httpbin.org/uuid', {
    timeout: 3_000,
    removeDuplicate: 'until_load',
  });
  const response2 = await fetch('https://httpbin.org/uuid', {
    timeout: 3_000,
    removeDuplicate: 'until_load',
  });
  
  console.log('ok: %s', response2.ok);
  console.log('text1: %s', await (await response1).text());
  console.log('text2: %s', await response2.text());
} catch (err) {
  console.error(err);
}
