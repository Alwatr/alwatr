import {writeJsonFile, readJsonFile} from '@alwatr/data-storage/json.js';

async function test(): Promise<void> {
  const jsonAdders = './demo/data-storage/test.json';
  await writeJsonFile(jsonAdders, {test: 'Every thing is ok'});
  const json = await readJsonFile(jsonAdders);
  console.log('file content:', json);
}

void test();
