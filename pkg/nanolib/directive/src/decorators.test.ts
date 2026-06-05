import {describe, expect, it} from 'bun:test';
import {GlobalRegistrator} from '@happy-dom/global-registrator';
import {Directive} from '@alwatr/directive';
import {attribute, on, query, queryAll, state} from '@alwatr/directive';

// Guard against double-registration (directive-class.test.ts may have already registered)
if (typeof document === 'undefined') {
  GlobalRegistrator.register();
}

class TestDirective extends Directive {
  protected init_(): void {}

  @query('.title')
  accessor title!: HTMLHeadingElement | null;

  @query('.missing')
  accessor missing!: HTMLDivElement | null;

  @queryAll('.item')
  accessor items!: NodeListOf<Element>;

  @attribute('data-id')
  accessor dataId!: string | null;

  @attribute('data-missing')
  accessor missingData!: string | null;
}

describe('@query', () => {
  it('returns the matched element', () => {
    const root = document.createElement('div');
    root.innerHTML = '<h1 class="title">Hello</h1>';

    const directive = new TestDirective(root, 'test');
    expect(directive.title?.textContent).toBe('Hello');
  });

  it('returns null when element is not found', () => {
    const root = document.createElement('div');
    root.innerHTML = '<p>no target here</p>';

    const directive = new TestDirective(root, 'test');
    expect(directive.missing).toBeNull();
  });

  it('caches result by default', () => {
    const root = document.createElement('div');
    root.innerHTML = '<h1 class="title">Hello</h1>';

    const directive = new TestDirective(root, 'test');
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

    const directive = new TestDirective(root, 'test');
    expect(directive.items.length).toBe(3);
    expect(directive.items[0]?.textContent).toBe('A');
  });

  it('returns empty list when no element is found', () => {
    const root = document.createElement('div');
    root.innerHTML = '<div>empty</div>';

    const directive = new TestDirective(root, 'test');
    expect(directive.items.length).toBe(0);
  });
});

describe('@attribute', () => {
  it('returns attribute value', () => {
    const root = document.createElement('div');
    root.setAttribute('data-id', '123');

    const directive = new TestDirective(root, 'test');
    expect(directive.dataId).toBe('123');
  });

  it('returns null when attribute is not found', () => {
    const root = document.createElement('div');

    const directive = new TestDirective(root, 'test');
    expect(directive.missingData).toBeNull();
  });

  it('caches result by default', () => {
    const root = document.createElement('div');
    root.setAttribute('data-id', '123');

    const directive = new TestDirective(root, 'test');
    const first = directive.dataId;
    root.setAttribute('data-id', '456');
    const second = directive.dataId;

    expect(first).toBe('123');
    expect(second).toBe('123');
  });
});

describe('@state', () => {
  class StateDirective extends Directive {
    public requestUpdateCount = 0;

    protected init_(): void {}

    @state<string | null>()
    accessor text: string | null = null;

    @state<{count: number}>()
    accessor payload: {count: number} = {count: 0};

    public override requestUpdate(): void {
      this.requestUpdateCount++;
    }
  }

  it('initializes and returns the accessor value', () => {
    const root = document.createElement('div');
    const directive = new StateDirective(root, 'test');

    expect(directive.text).toBeNull();
    expect(directive.payload).toEqual({count: 0});
  });

  it('updates value and requests update when primitive value changes', () => {
    const root = document.createElement('div');
    const directive = new StateDirective(root, 'test');

    directive.text = 'hello';

    expect(directive.text).toBe('hello');
    expect(directive.requestUpdateCount).toBe(1);
  });

  it('does not request update when primitive value is unchanged', () => {
    const root = document.createElement('div');
    const directive = new StateDirective(root, 'test');

    directive.text = 'same';
    directive.text = 'same';

    expect(directive.requestUpdateCount).toBe(1);
  });

  it('always requests update for object values even when reference is unchanged', () => {
    const root = document.createElement('div');
    const directive = new StateDirective(root, 'test');

    const sameRef = directive.payload;
    directive.payload = sameRef;
    directive.payload = sameRef;

    expect(directive.requestUpdateCount).toBe(2);
  });

  it('throws at decoration time when applied to a non-accessor', () => {
    expect(() => {
      const decorator = state();
      decorator(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {kind: 'method', name: 'foo'} as any,
      );
    }).toThrow('@state can only be used with the "accessor" keyword');
  });
});

describe('@on', () => {
  it('is exported from util-decorators', () => {
    expect(typeof on).toBe('function');
  });

  it('throws at decoration time when applied to a non-method', () => {
    expect(() => {
      // Simulate applying @on to an accessor context
      const decorator = on('click');
      decorator(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (() => {}) as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {kind: 'accessor', name: 'foo', addInitializer: () => {}} as any,
      );
    }).toThrow('@on can only be used on class methods');
  });

  it('calls the decorated method when the event fires on element_', () => {
    let callCount = 0;

    class ClickDirective extends Directive {
      protected init_(): void {}

      @on('click')
      onClick(_e: Event): void {
        callCount++;
      }
    }

    const root = document.createElement('div');
    new ClickDirective(root, 'test');

    root.dispatchEvent(new Event('click'));
    expect(callCount).toBe(1);
  });

  it('calls both methods when two @on("click") decorators are applied', () => {
    let count1 = 0;
    let count2 = 0;

    class TwoClickDirective extends Directive {
      protected init_(): void {}

      @on('click')
      onClickA(_e: Event): void {
        count1++;
      }

      @on('click')
      onClickB(_e: Event): void {
        count2++;
      }
    }

    const root = document.createElement('div');
    new TwoClickDirective(root, 'test');

    root.dispatchEvent(new Event('click'));
    expect(count1).toBe(1);
    expect(count2).toBe(1);
  });

  it('binds `this` to the directive instance inside the decorated method', () => {
    let capturedThis: unknown;

    class ThisDirective extends Directive {
      protected init_(): void {}

      @on('click')
      onClick(_e: Event): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        capturedThis = this;
      }
    }

    const root = document.createElement('div');
    const instance = new ThisDirective(root, 'test');

    root.dispatchEvent(new Event('click'));
    expect(capturedThis).toBe(instance);
  });

  it('removes the listener after destroy() is called', async () => {
    let callCount = 0;

    class DestroyDirective extends Directive {
      protected init_(): void {}

      @on('click')
      onClick(_e: Event): void {
        callCount++;
      }
    }

    const root = document.createElement('div');
    const instance = new DestroyDirective(root, 'test');

    root.dispatchEvent(new Event('click'));
    expect(callCount).toBe(1);

    await instance.destroy();

    root.dispatchEvent(new Event('click'));
    expect(callCount).toBe(1); // no additional calls after destroy
  });

  it('registers listener on a matching child element when selector is provided', () => {
    let callCount = 0;

    class ChildDirective extends Directive {
      protected init_(): void {}

      @on('click', '.btn')
      onBtnClick(_e: Event): void {
        callCount++;
      }
    }

    const root = document.createElement('div');
    root.innerHTML = '<button class="btn">Click me</button>';
    new ChildDirective(root, 'test');

    const btn = root.querySelector('.btn') as HTMLElement;
    btn.dispatchEvent(new Event('click'));
    expect(callCount).toBe(1);

    // Clicking the root itself should NOT trigger the handler
    root.dispatchEvent(new Event('click'));
    expect(callCount).toBe(1);
  });

  it('logs a warning and does not throw when selector matches nothing', () => {
    let callCount = 0;

    // Should not throw during class definition or instantiation
    expect(() => {
      class MissingChildDirective extends Directive {
        protected init_(): void {}

        @on('click', '.nonexistent')
        onMissing(_e: Event): void {
          callCount++;
        }
      }

      const root = document.createElement('div'); // no .nonexistent child
      new MissingChildDirective(root, 'test');

      // Dispatching the event should not call the handler (listener was never registered)
      root.dispatchEvent(new Event('click'));
    }).not.toThrow();

    // Handler was never registered, so it should not have been called
    expect(callCount).toBe(0);
  });

  it.skip('works correctly when addInitializer fires AFTER constructor (Bun bundler bug simulation)', () => {
    // Bun bundler emits __runInitializers inside the constructor body *before*
    // __decorateElement has registered the initializers. This means context.addInitializer
    // callbacks are silently skipped in browser builds.
    //
    // This test simulates that broken ordering by manually applying the decorator
    // *after* the instance is already constructed — if the implementation relied solely
    // on context.addInitializer, the listener would never be registered.
    let callCount = 0;

    // Step 1: define a plain class WITHOUT @on (no decorator at class-definition time)
    class LateDecoratedDirective extends Directive {
      protected init_(): void {}

      // This method will have @on applied manually AFTER instantiation (simulating the bug)
      onLateClick(_e: Event): void {
        callCount++;
      }
    }

    // Step 2: apply the @on decorator manually to the method function, populating onEntriesWeakMap
    const decorator = on('click');
    const addInitializerCalls: Array<(this: Directive) => void> = [];
    decorator(LateDecoratedDirective.prototype.onLateClick, {
      kind: 'method',
      name: 'onLateClick',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      metadata: {} as any,
      access: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        has: () => false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        get: () => undefined as any,
      },
      addInitializer(fn) {
        // Collect but do NOT call — simulates Bun bundler running __runInitializers
        // before __decorateElement has had a chance to register anything.
        addInitializerCalls.push(fn);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    // Step 3: construct the instance — at this point addInitializer callbacks have NOT run
    // (simulating the Bun bundler bug where __runInitializers fires before __decorateElement)
    const root = document.createElement('div');
    const instance = new LateDecoratedDirective(root, 'test');

    // Step 4: dispatch the event — the listener should be registered via the WeakMap path
    // in Directive.runOnEntries_(), NOT via addInitializer
    root.dispatchEvent(new Event('click'));
    expect(callCount).toBe(1);

    // Verify that addInitializer was indeed never called (confirming we tested the right path)
    expect(addInitializerCalls.length).toBe(1); // registered but not called
    // If we now call them (simulating correct runtime), it would double-register — but we don't

    // Cleanup
    void instance.destroy();
  });
});
