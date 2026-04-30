import {describe, beforeEach, afterEach, it, expect, jest} from 'bun:test';
import {GlobalRegistrator} from '@happy-dom/global-registrator';
import {
  onAction,
  dispatchAction,
  registerModifier,
  registerPayloadResolver,
  setupActionDelegation,
  teardownActionDelegation,
  DEFAULT_DELEGATED_EVENTS,
} from '@alwatr/action';

// Ensure DOM globals are available for delegation tests.
if (typeof document === 'undefined') {
  GlobalRegistrator.register();
}

/**
 * Helper to wait for microtask/macrotask queue to flush.
 * @param {number} [ms=5]
 * @returns {Promise<void>}
 */
function nextMacrotask(ms = 5) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Attribute Syntax Parsing Edge Cases ──────────────────────────────────────

describe('Delegate — Attribute Syntax Parsing', () => {
  beforeEach(() => {
    setupActionDelegation();
  });

  afterEach(() => {
    teardownActionDelegation();
    document.body.innerHTML = '';
  });

  it('should parse action with hyphenated action id', async () => {
    const callback = jest.fn();
    const sub = onAction('ui:open-drawer', callback);
    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui:open-drawer:main');
    document.body.appendChild(btn);
    btn.click();
    await nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0].payload).toBe('main');
    sub.unsubscribe();
  });

  it('should parse action with numeric payload', async () => {
    const callback = jest.fn();
    const sub = onAction('ui:select-item', callback);
    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui:select-item:42');
    document.body.appendChild(btn);
    btn.click();
    await nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    // Payload is always a string from attribute parsing.
    expect(callback.mock.calls[0][0].payload).toBe('42');
    sub.unsubscribe();
  });

  it('should parse action with multiple modifiers', async () => {
    registerModifier('mod-a', () => true);
    registerModifier('mod-b', () => true);
    const callback = jest.fn();
    const sub = onAction('ui:multi-mod', callback);
    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui:multi-mod:data; mod-a,mod-b');
    document.body.appendChild(btn);
    btn.click();
    await nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    sub.unsubscribe();
  });

  it('should not parse action without ui: prefix', async () => {
    const callback = jest.fn();
    const sub = onAction('no_prefix', callback);
    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'no_prefix:data');
    document.body.appendChild(btn);
    btn.click();
    await nextMacrotask();
    // Regex requires ui: prefix — should not match.
    expect(callback).not.toHaveBeenCalled();
    sub.unsubscribe();
  });

  it('should handle whitespace around semicolon in modifiers', async () => {
    const callback = jest.fn();
    const sub = onAction('ui:ws-test', callback);
    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui:ws-test:data; prevent');
    document.body.appendChild(btn);
    const preventDefaultSpy = jest.fn();
    const clickEvent = new Event('click', {bubbles: true, cancelable: true});
    Object.defineProperty(clickEvent, 'preventDefault', {value: preventDefaultSpy});
    btn.dispatchEvent(clickEvent);
    await nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
    sub.unsubscribe();
  });

  it('should handle action id with only lowercase and underscores', async () => {
    const callback = jest.fn();
    const sub = onAction('ui:my_action_name', callback);
    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui:my_action_name');
    document.body.appendChild(btn);
    btn.click();
    await nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    sub.unsubscribe();
  });
});

// ─── Descriptor Caching ───────────────────────────────────────────────────────

describe('Delegate — Descriptor Caching', () => {
  beforeEach(() => {
    setupActionDelegation();
  });

  afterEach(() => {
    teardownActionDelegation();
    document.body.innerHTML = '';
  });

  it('should cache parsed descriptors — same attribute value dispatches correctly on repeated clicks', async () => {
    const callback = jest.fn();
    const sub = onAction('ui:cached-action', callback);

    // Create two buttons with the same attribute value to exercise the cache.
    const btn1 = document.createElement('button');
    btn1.setAttribute('on-click', 'ui:cached-action:shared');
    const btn2 = document.createElement('button');
    btn2.setAttribute('on-click', 'ui:cached-action:shared');
    document.body.appendChild(btn1);
    document.body.appendChild(btn2);

    btn1.click();
    await nextMacrotask();
    btn2.click();
    await nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback.mock.calls[0][0].payload).toBe('shared');
    expect(callback.mock.calls[1][0].payload).toBe('shared');
    sub.unsubscribe();
  });

  it('should cache invalid syntax as null — repeated clicks on invalid attribute do not dispatch', async () => {
    const callback = jest.fn();
    const sub = onAction('ui:invalid-cache', callback);

    const btn = document.createElement('button');
    btn.setAttribute('on-click', '!!!invalid!!!');
    document.body.appendChild(btn);

    btn.click();
    await nextMacrotask();
    btn.click();
    await nextMacrotask();

    expect(callback).not.toHaveBeenCalled();
    sub.unsubscribe();
  });
});

// ─── Modifier Execution Order ─────────────────────────────────────────────────

describe('Delegate — Modifier Execution Order', () => {
  beforeEach(() => {
    setupActionDelegation();
  });

  afterEach(() => {
    teardownActionDelegation();
    document.body.innerHTML = '';
  });

  it('should run modifiers in order and stop on first false', async () => {
    const order = [];
    registerModifier('order-a', () => {
      order.push('a');
      return true;
    });
    registerModifier('order-b', () => {
      order.push('b');
      return false; // cancel
    });
    registerModifier('order-c', () => {
      order.push('c');
      return true;
    });

    const callback = jest.fn();
    const sub = onAction('ui:order-test', callback);
    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui:order-test:data; order-a,order-b,order-c');
    document.body.appendChild(btn);
    btn.click();
    await nextMacrotask();

    // 'order-b' returns false, so 'order-c' should not run and action should not dispatch.
    expect(order).toEqual(['a', 'b']);
    expect(callback).not.toHaveBeenCalled();
    sub.unsubscribe();
  });

  it('should run all modifiers when all return true', async () => {
    const order = [];
    registerModifier('pass-a', () => {
      order.push('a');
      return true;
    });
    registerModifier('pass-b', () => {
      order.push('b');
      return true;
    });

    const callback = jest.fn();
    const sub = onAction('ui:all-pass', callback);
    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui:all-pass:data; pass-a,pass-b');
    document.body.appendChild(btn);
    btn.click();
    await nextMacrotask();

    expect(order).toEqual(['a', 'b']);
    expect(callback).toHaveBeenCalledTimes(1);
    sub.unsubscribe();
  });
});

// ─── Once Modifier Edge Cases ─────────────────────────────────────────────────

describe('Delegate — Once Modifier Edge Cases', () => {
  beforeEach(() => {
    setupActionDelegation();
  });

  afterEach(() => {
    teardownActionDelegation();
    document.body.innerHTML = '';
  });

  it('once modifier should remove attribute even when another modifier cancels dispatch', async () => {
    registerModifier('always-cancel', () => false);
    const callback = jest.fn();
    const sub = onAction('ui:once-cancel', callback);
    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui:once-cancel:data; once,always-cancel');
    document.body.appendChild(btn);
    btn.click();
    await nextMacrotask();

    // Dispatch was cancelled by always-cancel, but once should still remove the attribute.
    expect(callback).not.toHaveBeenCalled();
    expect(btn.hasAttribute('on-click')).toBe(false);
    sub.unsubscribe();
  });

  it('once modifier combined with prevent should work correctly', async () => {
    const callback = jest.fn();
    const sub = onAction('ui:once-prevent', callback);
    const form = document.createElement('form');
    form.setAttribute('on-submit', 'ui:once-prevent; once,prevent');
    document.body.appendChild(form);

    const preventDefaultSpy = jest.fn();
    const submitEvent = new Event('submit', {bubbles: true, cancelable: true});
    Object.defineProperty(submitEvent, 'preventDefault', {value: preventDefaultSpy});
    form.dispatchEvent(submitEvent);
    await nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
    expect(form.hasAttribute('on-submit')).toBe(false);

    // Second submit should not dispatch.
    form.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
    await nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    sub.unsubscribe();
  });
});

// ─── Payload Resolution Edge Cases ────────────────────────────────────────────

describe('Delegate — Payload Resolution Edge Cases', () => {
  beforeEach(() => {
    setupActionDelegation();
  });

  afterEach(() => {
    teardownActionDelegation();
    document.body.innerHTML = '';
  });

  it('should use literal payload when no resolver matches the token', async () => {
    const callback = jest.fn();
    const sub = onAction('ui:literal-payload', callback);
    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui:literal-payload:my-literal-value');
    document.body.appendChild(btn);
    btn.click();
    await nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0].payload).toBe('my-literal-value');
    sub.unsubscribe();
  });

  it('should set payload to undefined when no payload token is present', async () => {
    const callback = jest.fn();
    const sub = onAction('ui:no-payload', callback);
    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui:no-payload');
    document.body.appendChild(btn);
    btn.click();
    await nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0].payload).toBeUndefined();
    sub.unsubscribe();
  });

  it('custom resolver should override literal payload', async () => {
    registerPayloadResolver('$custom-test', (_event, element) => {
      return `resolved-${element.id}`;
    });
    const callback = jest.fn();
    const sub = onAction('ui:custom-resolve-test', callback);
    const btn = document.createElement('button');
    btn.id = 'btn-42';
    btn.setAttribute('on-click', 'ui:custom-resolve-test:$custom-test');
    document.body.appendChild(btn);
    btn.click();
    await nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0].payload).toBe('resolved-btn-42');
    sub.unsubscribe();
  });
});

// ─── Context Resolution Edge Cases ────────────────────────────────────────────

describe('Delegate — Context Resolution Edge Cases', () => {
  beforeEach(() => {
    setupActionDelegation();
  });

  afterEach(() => {
    teardownActionDelegation();
    document.body.innerHTML = '';
  });

  it('should resolve empty string context when action-context attribute is empty', async () => {
    const callback = jest.fn();
    const sub = onAction('ui:empty-ctx', callback);
    const section = document.createElement('section');
    section.setAttribute('action-context', '');
    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui:empty-ctx:data');
    section.appendChild(btn);
    document.body.appendChild(section);
    btn.click();
    await nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(1);
    // Empty string context should be resolved (closest finds the element).
    // The implementation uses `?? undefined`, so empty string stays as empty string.
    const ctx = callback.mock.calls[0][0].context;
    // Empty string is falsy but getAttribute returns '' which is not null/undefined.
    expect(ctx === '' || ctx === undefined).toBe(true);
    sub.unsubscribe();
  });

  it('should resolve context from deeply nested ancestor', async () => {
    const callback = jest.fn();
    const sub = onAction('ui:deep-ctx', callback);

    const root = document.createElement('div');
    root.setAttribute('action-context', 'deep-root');
    const level1 = document.createElement('div');
    const level2 = document.createElement('div');
    const level3 = document.createElement('div');
    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui:deep-ctx:data');

    level3.appendChild(btn);
    level2.appendChild(level3);
    level1.appendChild(level2);
    root.appendChild(level1);
    document.body.appendChild(root);

    btn.click();
    await nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0].context).toBe('deep-root');
    sub.unsubscribe();
  });

  it('should resolve nearest context when multiple ancestors have action-context', async () => {
    const callback = jest.fn();
    const sub = onAction('ui:multi-ctx', callback);

    const outer = document.createElement('div');
    outer.setAttribute('action-context', 'outer-ctx');
    const middle = document.createElement('div');
    middle.setAttribute('action-context', 'middle-ctx');
    const inner = document.createElement('div');
    inner.setAttribute('action-context', 'inner-ctx');
    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui:multi-ctx:data');

    inner.appendChild(btn);
    middle.appendChild(inner);
    outer.appendChild(middle);
    document.body.appendChild(outer);

    btn.click();
    await nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(1);
    // closest() walks up from the action element — the action element itself
    // does not have action-context, so the nearest is 'inner-ctx'.
    expect(callback.mock.calls[0][0].context).toBe('inner-ctx');
    sub.unsubscribe();
  });
});

// ─── Dynamic Content & DOM Mutations ──────────────────────────────────────────

describe('Delegate — Dynamic Content', () => {
  beforeEach(() => {
    setupActionDelegation();
  });

  afterEach(() => {
    teardownActionDelegation();
    document.body.innerHTML = '';
  });

  it('should handle elements added dynamically after initial setup', async () => {
    const callback = jest.fn();
    const sub = onAction('ui:dynamic-add', callback);

    const container = document.createElement('div');
    document.body.appendChild(container);

    // Simulate dynamic content by creating and appending elements after setup.
    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui:dynamic-add:injected');
    container.appendChild(btn);

    btn.click();
    await nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0].payload).toBe('injected');
    sub.unsubscribe();
  });

  it('should handle elements moved between containers', async () => {
    const callback = jest.fn();
    const sub = onAction('ui:moved-action', callback);

    const container1 = document.createElement('div');
    container1.setAttribute('action-context', 'container-1');
    const container2 = document.createElement('div');
    container2.setAttribute('action-context', 'container-2');
    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui:moved-action:data');

    container1.appendChild(btn);
    document.body.appendChild(container1);
    document.body.appendChild(container2);

    // Click in container 1.
    btn.click();
    await nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0].context).toBe('container-1');

    // Move to container 2.
    container2.appendChild(btn);
    btn.click();
    await nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback.mock.calls[1][0].context).toBe('container-2');

    sub.unsubscribe();
  });
});

// ─── Multiple Delegated Event Types ───────────────────────────────────────────

describe('Delegate — Multiple Event Types', () => {
  afterEach(() => {
    teardownActionDelegation();
    document.body.innerHTML = '';
  });

  it('should support adding extra event types alongside defaults', async () => {
    setupActionDelegation([...DEFAULT_DELEGATED_EVENTS, 'focus']);

    const callback = jest.fn();
    const sub = onAction('ui:focus-action', callback);

    const input = document.createElement('input');
    input.setAttribute('on-focus', 'ui:focus-action:focused');
    document.body.appendChild(input);

    input.dispatchEvent(new Event('focus', {bubbles: true}));
    await nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0].payload).toBe('focused');
    sub.unsubscribe();
  });

  it('should not handle event types not registered', async () => {
    setupActionDelegation(['click']); // only click

    const callback = jest.fn();
    const sub = onAction('ui:unregistered-evt', callback);

    const input = document.createElement('input');
    input.setAttribute('on-input', 'ui:unregistered-evt:data');
    document.body.appendChild(input);

    input.dispatchEvent(new Event('input', {bubbles: true}));
    await nextMacrotask();

    expect(callback).not.toHaveBeenCalled();
    sub.unsubscribe();
  });
});

// ─── Teardown Cleans Up Completely ────────────────────────────────────────────

describe('Delegate — Teardown Cleanup', () => {
  it('should clear descriptor cache on teardown (re-parse after re-setup)', async () => {
    setupActionDelegation();

    const callback = jest.fn();
    const sub = onAction('ui:cache-clear', callback);
    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui:cache-clear:first');
    document.body.appendChild(btn);
    btn.click();
    await nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);

    teardownActionDelegation();
    document.body.innerHTML = '';

    // Re-setup — cache should be cleared.
    setupActionDelegation();
    const btn2 = document.createElement('button');
    btn2.setAttribute('on-click', 'ui:cache-clear:second');
    document.body.appendChild(btn2);
    btn2.click();
    await nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback.mock.calls[1][0].payload).toBe('second');

    sub.unsubscribe();
    teardownActionDelegation();
    document.body.innerHTML = '';
  });
});
