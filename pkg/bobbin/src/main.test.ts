import {afterAll, expect, test} from 'bun:test';
import {rm} from 'node:fs/promises';
import {join} from 'node:path';

import {buildData, defineSource} from '@alwatr/bobbin';

const dummyOutDir = join(import.meta.dir, 'dummy-data-out');
afterAll(() => rm(dummyOutDir, {recursive: true, force: true}));

test('fetches each source and returns its data in results', async () => {
  const source = defineSource({
    name: 'users',
    load: async () => ({generatedAt: 'now', list: [{id: 1}, {id: 2}]}),
  });

  const results = await buildData({sources: [source]});

  expect(results).toHaveLength(1);
  expect(results[0]).toEqual({
    name: 'users',
    data: {generatedAt: 'now', list: [{id: 1}, {id: 2}]},
  });
});

test('runs the schema guard and aborts the build on failure', async () => {
  const source = defineSource<{ok: boolean}>({
    name: 'broken',
    load: () => ({ok: false}),
    schema: (data): data is {ok: boolean} => (data as {ok: unknown}).ok === true,
  });

  expect(buildData({sources: [source]})).rejects.toThrow(/failed schema validation/);
});

test('rejects a source name that escapes the output directory', async () => {
  const evil = defineSource({name: '../escape', load: () => ({})});

  expect(buildData({outDir: dummyOutDir, sources: [evil]})).rejects.toThrow(/outside the output directory/);
});
