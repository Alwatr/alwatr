import {bench} from './bench.js';

const text = 'test+#~another)(test';

bench('replace', () => {
  text.replace(/(_|\*|[|]|(|)|~|`|>|#|\+|-|=|\||{|}|\.|!)/g, '\\$1');
});

bench('replaceAll', () => {
  for (const character of ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!']) {
    text.replaceAll(character, `\\${character}`);
  }
});
