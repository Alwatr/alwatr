import {readJson, writeJson} from '@alwatr/node-fs';

for (let i = 0; i < 100; i++) {
  console.log('writeJson %s without waiting...', i);
  writeJson('file.json', {i, a: 'b'});
  if (i === 70) {
    console.log('readJson %s', i);
    console.dir(await readJson('file.json'));
  }
}

console.dir(await readJson('file.json'));

console.log('loop done, wait for queue process');
