#!/usr/bin/env node

import {$} from 'zx';
import {spinner} from 'zx/experimental';

await $`cat package.json | grep name`;

const out = await spinner('working...', () => $`sleep 2 && echo 'Hello ;)'`);
console.log('out: %s', out.stdout);

// prettier-ignore
await Promise.all([
  $`sleep 1; echo 1`,
  $`sleep 1; echo 2`,
  $`sleep 1; echo 3`,
]);

await $`ls -la`;
