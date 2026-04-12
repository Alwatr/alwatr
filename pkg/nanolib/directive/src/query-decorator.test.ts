import {describe, expect, it} from 'bun:test';
import {GlobalRegistrator} from '@happy-dom/global-registrator';
import {DirectiveBase} from './directive-class.js';
import {query, queryAll} from './query-decorator.js';

GlobalRegistrator.register();

class TestDirective extends DirectiveBase {
  @query('.title')
  accessor title!: HTMLHeadingElement | null;

  @query('.missing')
  accessor missing!: HTMLDivElement | null;

  @queryAll('.item')
  accessor items!: NodeListOf<Element>;
}

describe('@query', () => {
  it('returns the matched element', () => {
    const root = document.createElement('div');
    root.innerHTML = '<h1 class="title">Hello</h1>';

    const directive = new TestDirective(root, '[test]');
    expect(directive.title?.textContent).toBe('Hello');
  });

  it('returns null when element is not found', () => {
    const root = document.createElement('div');
    root.innerHTML = '<p>no target here</p>';

    const directive = new TestDirective(root, '[test]');
    expect(directive.missing).toBeNull();
  });

  it('caches result by default', () => {
    const root = document.createElement('div');
    root.innerHTML = '<h1 class="title">Hello</h1>';

    const directive = new TestDirective(root, '[test]');
    const first = directive.title;
    const second = directive.title;

    expect(first).toBe(second);
  });
});

describe('@queryAll', () => {
  it('returns all matched elements', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <ul>
        <li class="item">A</li>
        <li class="item">B</li>
        <li class="item">C</li>
      </ul>
    `;

    const directive = new TestDirective(root, '[test]');
    expect(directive.items.length).toBe(3);
    expect(directive.items[0]?.textContent).toBe('A');
  });

  it('returns empty list when no element is found', () => {
    const root = document.createElement('div');
    root.innerHTML = '<div>empty</div>';

    const directive = new TestDirective(root, '[test]');
    expect(directive.items.length).toBe(0);
  });
});
