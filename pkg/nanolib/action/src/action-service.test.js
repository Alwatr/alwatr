import {describe, beforeEach, afterEach, it, expect, jest} from 'bun:test';
import {GlobalRegistrator} from '@happy-dom/global-registrator';

// Setup DOM simulation
if (typeof document === 'undefined') {
  GlobalRegistrator.register();
}

import {ActionService} from '@alwatr/action';

/**
 * Helper to wait for event loop ticks (microtasks/macrotasks) to complete.
 * @param {number} [ms=5]
 * @returns {Promise<void>}
 */
function nextMacrotask(ms = 5) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── 1. Instance Independence ──────────────────────────────────────────────────

describe('ActionService — Instance Independence', () => {
  it('should ensure custom instances do not share dispatched events', async () => {
    const serviceA = new ActionService();
    const serviceB = new ActionService();

    const cbA = jest.fn();
    const cbB = jest.fn();

    serviceA.on('ui_test_action', cbA);
    serviceB.on('ui_test_action', cbB);

    serviceA.dispatch({type: 'ui_test_action', payload: 'A'});
    await nextMacrotask();

    expect(cbA).toHaveBeenCalledTimes(1);
    expect(cbA).toHaveBeenCalledWith({type: 'ui_test_action', payload: 'A'});
    expect(cbB).not.toHaveBeenCalled();
  });

  it('should be safe in SSR/non-DOM environments and not throw', () => {
    const origDocument = globalThis.document;
    delete globalThis.document;

    try {
      const ssrService = new ActionService();
      expect(() => ssrService.setupDelegation()).not.toThrow();
      expect(() => ssrService.teardownDelegation()).not.toThrow();
    } finally {
      globalThis.document = origDocument;
    }
  });
});

// ─── 2. Programmatic API ───────────────────────────────────────────────────────

describe('ActionService — Programmatic API', () => {
  let service;

  beforeEach(() => {
    service = new ActionService();
  });

  it('should support subscribing and dispatching a single action', async () => {
    const callback = jest.fn();
    const sub = service.on('ui_action_test', callback);

    service.dispatch({type: 'ui_action_test', payload: {id: 100}});
    await nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({type: 'ui_action_test', payload: {id: 100}});
    sub.unsubscribe();
  });

  it('should support subscribing to multiple action types using an array', async () => {
    const callback = jest.fn();
    const sub = service.on(['ui_act_a', 'ui_act_b'], callback);

    service.dispatch({type: 'ui_act_a', payload: 'a'});
    await nextMacrotask();
    expect(callback).toHaveBeenLastCalledWith({type: 'ui_act_a', payload: 'a'});

    service.dispatch({type: 'ui_act_b', payload: 'b'});
    await nextMacrotask();
    expect(callback).toHaveBeenLastCalledWith({type: 'ui_act_b', payload: 'b'});

    expect(callback).toHaveBeenCalledTimes(2);
    sub.unsubscribe();
  });

  it('should not notify unsubscribed handlers', async () => {
    const callback = jest.fn();
    const sub = service.on('ui_unsub_test', callback);

    sub.unsubscribe();
    service.dispatch({type: 'ui_unsub_test', payload: 'test'});
    await nextMacrotask();

    expect(callback).not.toHaveBeenCalled();
  });

  it('should notify multiple subscribers to the same action type', async () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();

    const sub1 = service.on('ui_multi_sub', cb1);
    const sub2 = service.on('ui_multi_sub', cb2);

    service.dispatch({type: 'ui_multi_sub', payload: 'data'});
    await nextMacrotask();

    expect(cb1).toHaveBeenCalledTimes(1);
    expect(cb2).toHaveBeenCalledTimes(1);

    sub1.unsubscribe();
    sub2.unsubscribe();
  });

  it('should support void payload dispatches', async () => {
    const callback = jest.fn();
    const sub = service.on('ui_void_action', callback);

    service.dispatch({type: 'ui_void_action'});
    await nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0].payload).toBeUndefined();
    sub.unsubscribe();
  });
});

// ─── 3. Built-in Modifiers and Resolvers ───────────────────────────────────────

describe('ActionService — Built-in Modifiers & Resolvers', () => {
  let service;

  beforeEach(() => {
    service = new ActionService();
  });

  describe('prevent modifier', () => {
    it('should invoke event.preventDefault()', () => {
      const handler = service['modifierRegistry_'].get('prevent');
      const preventDefaultSpy = jest.fn();
      const mockEvent = {preventDefault: preventDefaultSpy};
      const element = document.createElement('button');
      const action = {type: 'ui_test', payload: undefined};

      const result = handler(mockEvent, element, action);
      expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });
  });

  describe('validate modifier', () => {
    it('should validate form and return true if valid', () => {
      const handler = service['modifierRegistry_'].get('validate');
      const form = document.createElement('form');
      const input = document.createElement('input');
      input.required = true;
      input.value = 'hello';
      form.appendChild(input);
      document.body.appendChild(form);

      const action = {type: 'ui_test', payload: undefined};
      const result = handler({}, form, action);

      expect(result).toBe(true);
      document.body.removeChild(form);
    });

    it('should return false if form is invalid', () => {
      const handler = service['modifierRegistry_'].get('validate');
      const form = document.createElement('form');
      const input = document.createElement('input');
      input.required = true;
      input.value = ''; // empty, invalid
      form.appendChild(input);
      document.body.appendChild(form);

      const action = {type: 'ui_test', payload: undefined};
      const result = handler({}, form, action);

      expect(result).toBe(false);
      document.body.removeChild(form);
    });

    it('should return false if element is not in a form', () => {
      const handler = service['modifierRegistry_'].get('validate');
      const button = document.createElement('button');
      document.body.appendChild(button);

      const action = {type: 'ui_test', payload: undefined};
      const result = handler({}, button, action);

      expect(result).toBe(false);
      document.body.removeChild(button);
    });
  });

  describe('$value resolver', () => {
    it('should resolve the value property from input', () => {
      const resolver = service['payloadRegistry_'].get('$value');
      const input = document.createElement('input');
      input.value = 'test-value';

      expect(resolver({}, input)).toBe('test-value');
    });

    it('should return null for elements without a value property', () => {
      const resolver = service['payloadRegistry_'].get('$value');
      const div = document.createElement('div');

      expect(resolver({}, div)).toBeNull();
    });
  });

  describe('$formdata resolver', () => {
    it('should resolve nearest form inputs as plain object', () => {
      const resolver = service['payloadRegistry_'].get('$formdata');
      const form = document.createElement('form');

      const nameInput = document.createElement('input');
      nameInput.name = 'name';
      nameInput.value = 'John';
      form.appendChild(nameInput);

      const ageInput = document.createElement('input');
      ageInput.name = 'age';
      ageInput.value = '30';
      form.appendChild(ageInput);

      document.body.appendChild(form);

      const result = resolver({}, form);
      expect(result).toEqual({name: 'John', age: '30'});

      document.body.removeChild(form);
    });
  });

  describe('$checked resolver', () => {
    it('should resolve checked property for checkboxes', () => {
      const resolver = service['payloadRegistry_'].get('$checked');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = true;

      expect(resolver({}, checkbox)).toBe(true);

      checkbox.checked = false;
      expect(resolver({}, checkbox)).toBe(false);
    });
  });
});

// ─── 4. Event Delegation & Parsing ─────────────────────────────────────────────

describe('ActionService — Event Delegation & Attribute Parsing', () => {
  let service;

  beforeEach(() => {
    service = new ActionService();
    service.setupDelegation();
  });

  afterEach(() => {
    service.teardownDelegation();
    document.body.innerHTML = '';
  });

  it('should support basic click delegation and parsing', async () => {
    const callback = jest.fn();
    const sub = service.on('ui_test_click', callback);

    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui_test_click:click-payload');
    document.body.appendChild(btn);

    btn.click();
    await nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        type: 'ui_test_click',
        payload: 'click-payload',
      }),
    );
    sub.unsubscribe();
  });

  it('should parse complex attributes with multiple modifiers', async () => {
    const order = [];
    service.registerModifier('mod-first', () => {
      order.push('first');
      return true;
    });
    service.registerModifier('mod-second', () => {
      order.push('second');
      return true;
    });

    const callback = jest.fn();
    const sub = service.on('ui_complex_act', callback);

    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui_complex_act:data; mod-first,mod-second');
    document.body.appendChild(btn);

    btn.click();
    await nextMacrotask();

    expect(order).toEqual(['first', 'second']);
    expect(callback).toHaveBeenCalledTimes(1);
    sub.unsubscribe();
  });

  it('should ignore clicks on elements without matched on-<eventType>', async () => {
    const callback = jest.fn();
    const sub = service.on('ui_test_click', callback);

    const btn = document.createElement('button');
    btn.setAttribute('on-mouseover', 'ui_test_click'); // mismatched event type
    document.body.appendChild(btn);

    btn.click();
    await nextMacrotask();

    expect(callback).not.toHaveBeenCalled();
    sub.unsubscribe();
  });

  it('should cache parsed descriptors and avoid re-parsing same strings', () => {
    const spy = jest.spyOn(service, 'parseDescriptor_');

    const btn1 = document.createElement('button');
    btn1.setAttribute('on-click', 'ui_cached_test:payload; prevent');
    const btn2 = document.createElement('button');
    btn2.setAttribute('on-click', 'ui_cached_test:payload; prevent');
    document.body.appendChild(btn1);
    document.body.appendChild(btn2);

    btn1.click();
    btn2.click();

    expect(spy).toHaveBeenCalledTimes(2);
    // Cache check
    expect(service['descriptorCache_'].has('ui_cached_test:payload; prevent')).toBe(true);

    spy.mockRestore();
  });

  it('should cache invalid syntax as null and not crash', async () => {
    const callback = jest.fn();
    const sub = service.on('ui_invalid_syntax', callback);

    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'invalidSyntax!!!');
    document.body.appendChild(btn);

    btn.click();
    await nextMacrotask();

    expect(callback).not.toHaveBeenCalled();
    expect(service['descriptorCache_'].get('invalidSyntax!!!')).toBeNull();
    sub.unsubscribe();
  });
});

// ─── 5. Modifiers Pipeline & Context ───────────────────────────────────────────

describe('ActionService — Modifiers Pipeline & Context', () => {
  let service;

  beforeEach(() => {
    service = new ActionService();
    service.setupDelegation();
  });

  afterEach(() => {
    service.teardownDelegation();
    document.body.innerHTML = '';
  });

  it('should cancel dispatch when any modifier returns false', async () => {
    service.registerModifier('allow', () => true);
    service.registerModifier('deny', () => false);

    const callback = jest.fn();
    const sub = service.on('ui_cancel_test', callback);

    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui_cancel_test:payload; allow,deny');
    document.body.appendChild(btn);

    btn.click();
    await nextMacrotask();

    expect(callback).not.toHaveBeenCalled();
    sub.unsubscribe();
  });

  it('should allow modifiers to enrich action.meta before dispatching', async () => {
    service.registerModifier('enrich-meta', (_event, _element, action) => {
      action.meta = {traceId: 'abc-123', time: 999};
      return true;
    });

    const callback = jest.fn();
    const sub = service.on('ui_enrich_test', callback);

    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui_enrich_test:data; enrich-meta');
    document.body.appendChild(btn);

    btn.click();
    await nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0].meta).toEqual({traceId: 'abc-123', time: 999});
    sub.unsubscribe();
  });

  it('should resolve action-context from closest ancestor', async () => {
    const callback = jest.fn();
    const sub = service.on('ui_ctx_test', callback);

    const outer = document.createElement('div');
    outer.setAttribute('action-context', 'outer-context');

    const inner = document.createElement('div');
    inner.setAttribute('action-context', 'inner-context');
    outer.appendChild(inner);

    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui_ctx_test:payload');
    inner.appendChild(btn);

    document.body.appendChild(outer);

    btn.click();
    await nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0][0].context).toBe('inner-context');
    sub.unsubscribe();
  });

  it('should catch modifier execution errors, log an accident, and abort dispatch', async () => {
    service.registerModifier('throws-err', () => {
      throw new Error('modifier error simulation');
    });

    const callback = jest.fn();
    const sub = service.on('ui_throw_mod_test', callback);

    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui_throw_mod_test:data; throws-err');
    document.body.appendChild(btn);

    btn.click();
    await nextMacrotask();

    expect(callback).not.toHaveBeenCalled();
    sub.unsubscribe();
  });

  it('should catch payload resolver execution errors, log an accident, and abort dispatch', async () => {
    service.registerPayloadResolver('$throws-res', () => {
      throw new Error('resolver error simulation');
    });

    const callback = jest.fn();
    const sub = service.on('ui_throw_res_test', callback);

    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui_throw_res_test:$throws-res');
    document.body.appendChild(btn);

    btn.click();
    await nextMacrotask();

    expect(callback).not.toHaveBeenCalled();
    sub.unsubscribe();
  });
});

// ─── 6. Once Modifier ──────────────────────────────────────────────────────────

describe('ActionService — Once Modifier', () => {
  let service;

  beforeEach(() => {
    service = new ActionService();
    service.setupDelegation();
  });

  afterEach(() => {
    service.teardownDelegation();
    document.body.innerHTML = '';
  });

  it('should remove the attribute on first dispatch and fire only once', async () => {
    const callback = jest.fn();
    const sub = service.on('ui_once_test', callback);

    const btn = document.createElement('button');
    btn.setAttribute('on-click', 'ui_once_test:payload; once');
    document.body.appendChild(btn);

    btn.click();
    await nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(btn.hasAttribute('on-click')).toBe(false);

    // Second click should do nothing since attribute was removed
    btn.click();
    await nextMacrotask();

    expect(callback).toHaveBeenCalledTimes(1);
    sub.unsubscribe();
  });
});
