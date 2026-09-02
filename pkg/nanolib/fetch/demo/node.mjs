import {fetch, fetchJson} from '@alwatr/fetch';

console.log('=== 1. Typed JSON Fetch Demo ===');
const [data, error] = await fetchJson('https://httpbin.org/json', {
  timeout: '5s',
  retry: 2,
});

if (error) {
  console.error('Fetch error:', error.reason, error.message);
} else {
  console.log('Fetched slideshow title:', data?.slideshow?.title);
}

console.log('\n=== 2. Parallel Request Deduplication Demo ===');
const req1 = fetch('https://httpbin.org/uuid', {
  timeout: 3_000,
  removeDuplicate: 'until_load',
});
const req2 = fetch('https://httpbin.org/uuid', {
  timeout: 3_000,
  removeDuplicate: 'until_load',
});

const [[res1, err1], [res2, err2]] = await Promise.all([req1, req2]);

if (err1 || err2) {
  console.error('Deduplication demo error:', err1 ?? err2);
} else {
  console.log('Response 1 Status:', res1.status, 'UUID:', (await res1.json())?.uuid);
  console.log('Response 2 Status:', res2.status, 'UUID:', (await res2.json())?.uuid);
}
