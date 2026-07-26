import {afterAll, expect, test} from 'bun:test';
import {rm} from 'node:fs/promises';
import {join} from 'node:path';

import {buildSite, definePage, jsx} from '@alwatr/loom';

const dummyOutDir = join(import.meta.dir, 'dummy-out');
afterAll(() => rm(dummyOutDir, {recursive: true, force: true}));

test('renders one file per permalink and returns it in results', async () => {
  const home = definePage({permalink: '/', render: () => jsx('h1', {children: 'hi'})});
  const about = definePage({permalink: '/about/', render: () => jsx('p', {children: 'about'})});
  const feed = definePage({permalink: '/feed.xml', render: () => jsx('rss', {children: 'x'})});

  const results = await buildSite({pages: [home, about, feed]});

  expect(results).toHaveLength(3);
  expect(results[0]).toEqual({permalink: '/', html: '<h1>hi</h1>'});
  expect(results[1]).toEqual({permalink: '/about/', html: '<p>about</p>'});
  expect(results[2]).toEqual({permalink: '/feed.xml', html: '<rss>x</rss>'});
});

test('rejects a permalink that escapes the output directory', async () => {
  const evil = definePage({permalink: '/../escape.html', render: () => jsx('p', {children: 'x'})});

  expect(buildSite({pages: [evil], outDir: dummyOutDir})).rejects.toThrow(/outside the output directory/);
});

test('applies the transform hook to rendered html', async () => {
  const page = definePage({permalink: '/x/', render: () => jsx('p', {children: 'a'})});

  const results = await buildSite({pages: [page], transform: (html) => html.toUpperCase()});

  expect(results).toHaveLength(1);
  expect(results[0]).toEqual({permalink: '/x/', html: '<P>A</P>'});
});
