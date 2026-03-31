import {deduplicate} from '@alwatr/dedupe';

console.log('define test1 package');
deduplicate({name: '@scope/test1'});

console.log('define test2 package with `strict`');
deduplicate({name: '@scope/test2', strict: true});

// Must shown an warning
setTimeout(() => {
  console.log('re-define test1 package');
  deduplicate({name: '@scope/test1'});
}, 1000);

// Must throw an error
setTimeout(() => {
  console.log('re-define test2 package with `strict`');
  deduplicate({name: '@scope/test2', strict: true});
}, 1000);
