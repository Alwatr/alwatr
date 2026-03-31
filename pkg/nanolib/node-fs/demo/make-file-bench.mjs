import {existsSync, makeEmptyFile, resolve} from '@alwatr/node-fs';

import {mkdir, rm} from 'node:fs/promises';

(async () => {
  const temp = resolve('./.tmp');

  await mkdir(temp);

  console.log('start bench');

  console.time('bench');
  for (let i = 0; i < 10_000; i++) {
    await makeEmptyFile(`${temp}/file-${i}.asn`);
  }
  console.timeEnd('bench');

  await rm(temp, {recursive: true, force: true});
})();
