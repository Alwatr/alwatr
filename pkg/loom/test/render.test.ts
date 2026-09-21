import {describe, expect, test} from 'bun:test';

import {Fragment, jsx, raw, render, type Component} from '@alwatr/loom';

describe('render', () => {
  test('escapes dynamic text', () => {
    expect(render(jsx('p', {children: '<b> & "x"'}))).toBe('<p>&lt;b&gt; &amp; &quot;x&quot;</p>');
  });

  test('renders numbers, including zero', () => {
    expect(render(jsx('span', {children: 0}))).toBe('<span>0</span>');
  });

  test('omits nullish and boolean children', () => {
    expect(render(jsx('p', {children: [null, undefined, false, 'ok']}))).toBe('<p>ok</p>');
  });

  test('serializes boolean and custom attributes verbatim', () => {
    expect(render(jsx('div', {'scrim-overlay': true, 'on-click': 'ui_clicked', 'hidden': false}))).toBe(
      '<div scrim-overlay on-click="ui_clicked"></div>',
    );
  });

  test('serializes non-standard attributes via _ object map', () => {
    expect(
      render(
        jsx('button', {
          _: {
            '@click.once': 'open = true',
            ':class': '{ hidden: !open }',
            'x-cloak': true,
            'x-ignore': false,
            'x-init': null,
            'x-ref': undefined,
          },
          children: 'Expand',
        }),
      ),
    ).toBe('<button @click.once="open = true" :class="{ hidden: !open }" x-cloak>Expand</button>');
  });

  test('handle _ with arrays and string', () => {
    expect(render(jsx('button', {_: ['@click.once=open', 'x-cloak'], children: 'Click'}))).toBe(
      '<button _="@click.once=open,x-cloak">Click</button>',
    );
    expect(render(jsx('button', {_: 'string', children: 'Click'}))).toBe('<button _="string">Click</button>');
  });

  test('escapes values and handles class/style in _ attribute map', () => {
    expect(
      render(
        jsx('span', {
          _: {
            'data-tooltip': 'A & "B"',
            'class': ['btn', {active: true, disabled: false}],
            'style': {color: 'blue'},
          },
        }),
      ),
    ).toBe('<span data-tooltip="A &amp; &quot;B&quot;" class="btn active" style="color:blue;"></span>');
  });

  test('resolves class from string, array, and object', () => {
    expect(render(jsx('i', {class: 'a'}))).toBe('<i class="a"></i>');
    expect(render(jsx('i', {class: ['a', false, 'b']}))).toBe('<i class="a b"></i>');
    expect(render(jsx('i', {class: {a: true, b: false, c: 1}}))).toBe('<i class="a c"></i>');
  });

  test('serializes style objects with kebab-case properties', () => {
    expect(render(jsx('div', {style: {color: 'red', marginTop: '1px'}}))).toBe(
      '<div style="color:red;margin-top:1px;"></div>',
    );
  });

  test('self-closes void elements', () => {
    expect(render(jsx('img', {src: '/x.png', alt: 'x'}))).toBe('<img src="/x.png" alt="x"/>');
  });

  test('concatenates fragment children with no wrapper', () => {
    expect(render(jsx(Fragment, {children: ['a', jsx('b', {children: 'c'})]}))).toBe('a<b>c</b>');
  });

  test('invokes components', () => {
    const Heading: Component<{title: string}> = ({title}) => jsx('h1', {children: title});
    expect(render(jsx(Heading, {title: 'hi'}))).toBe('<h1>hi</h1>');
  });

  test('passes raw() through without escaping', () => {
    expect(render(raw('<hr>'))).toBe('<hr>');
    expect(render(jsx('div', {children: raw('<b>x</b>')}))).toBe('<div><b>x</b></div>');
  });
});
