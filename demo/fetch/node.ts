import {fetch} from '@alwatr/fetch';

try {
  const response = await fetch({
    url: 'http://httpbin.org/uuid',
    timeout: 3_000,
    removeDuplicate: 'auto',
  });
  console.log('ok: %s', response.ok);
  console.log('text: %s', await response.text());
}
catch (err) {
  console.error(err);
}
