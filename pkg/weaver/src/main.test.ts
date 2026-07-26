import {rm} from 'node:fs/promises';
import {join} from 'node:path';

import {describe, expect, test} from 'bun:test';

import {Weaver, version, weave} from '@alwatr/weaver';

describe('@alwatr/weaver smoke test', () => {
  test('exports core symbols', () => {
    expect(Weaver).toBeDefined();
    expect(typeof Weaver).toBe('function');
    expect(version).toBeDefined();
    expect(typeof version).toBe('string');
    expect(weave).toBeDefined();
    expect(typeof weave).toBe('function');
  });

  test('instantiates Weaver with minimal config', () => {
    const weaver = new Weaver({
      render: () => [{permalink: '/', html: '<h1>Test</h1>'}],
    });
    expect(weaver).toBeInstanceOf(Weaver);
  });

  test('runs build and writes output to outDir', async () => {
    const testOutDir = join(import.meta.dir, '../dist/test-build-output');

    const weaver = new Weaver({
      render: () => [
        {permalink: '/', html: '<html><body><h1>Hello World</h1></body></html>'},
        {permalink: '/about/', html: '<html><body><h1>About Page</h1></body></html>'},
      ],
      outDir: testOutDir,
    });

    await weaver.build();

    const mainHtmlFile = Bun.file(join(testOutDir, 'index.html'));
    const aboutHtmlFile = Bun.file(join(testOutDir, 'about/index.html'));

    expect(await mainHtmlFile.exists()).toBe(true);
    expect(await mainHtmlFile.text()).toContain('Hello World');

    expect(await aboutHtmlFile.exists()).toBe(true);
    expect(await aboutHtmlFile.text()).toContain('About Page');

    // Clean up test output
    await rm(testOutDir, {recursive: true, force: true});
  });
});
