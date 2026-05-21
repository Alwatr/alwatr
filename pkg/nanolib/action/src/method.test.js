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

// Register DOM globals for testing (action delegation requires document.body).
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

// ─── Programmatic API ─────────────────────────────────────────────────────────

describe('Action — Programmatic API', () => {
  describe('onAction / dispatchAction', () => {
    it('should dispatch an action and notify the subscriber', async () => {
      const callback = jest.fn();
      const sub = onAction('test_action', callback);
      dispatchAction({type: 'test_action', payload: 'hello'});
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith({type: 'test_action', payload: 'hello'});
      sub.unsubscribe();
    });

    it('should dispatch action with object payload', async () => {
      const callback = jest.fn();
      const sub = onAction('cart_add', callback);
      dispatchAction({type: 'cart_add', payload: {productId: 42, qty: 2}});
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      const action = callback.mock.calls[0][0];
      expect(action.type).toBe('cart_add');
      expect(action.payload).toEqual({productId: 42, qty: 2});
      sub.unsubscribe();
    });

    it('should dispatch action with context and meta', async () => {
      const callback = jest.fn();
      const sub = onAction('navigate', callback);
      dispatchAction({type: 'navigate', payload: '/dashboard', context: 'sidebar', meta: {source: 'keyboard'}});
      await nextMacrotask();
      const action = callback.mock.calls[0][0];
      expect(action.context).toBe('sidebar');
      expect(action.meta).toEqual({source: 'keyboard'});
      sub.unsubscribe();
    });

    it('should not notify unsubscribed handlers', async () => {
      const callback = jest.fn();
      const sub = onAction('test_unsub', callback);
      sub.unsubscribe();
      dispatchAction({type: 'test_unsub', payload: 'data'});
      await nextMacrotask();
      expect(callback).not.toHaveBeenCalled();
    });

    it('should notify multiple subscribers for the same action type', async () => {
      const cb1 = jest.fn();
      const cb2 = jest.fn();
      const sub1 = onAction('multi_sub', cb1);
      const sub2 = onAction('multi_sub', cb2);
      dispatchAction({type: 'multi_sub', payload: 'shared'});
      await nextMacrotask();
      expect(cb1).toHaveBeenCalledTimes(1);
      expect(cb2).toHaveBeenCalledTimes(1);
      sub1.unsubscribe();
      sub2.unsubscribe();
    });

    it('should only notify the handler for the matching action type (O(1) routing)', async () => {
      const cbA = jest.fn();
      const cbB = jest.fn();
      const subA = onAction('action_a', cbA);
      const subB = onAction('action_b', cbB);
      dispatchAction({type: 'action_a', payload: 'a-data'});
      await nextMacrotask();
      expect(cbA).toHaveBeenCalledTimes(1);
      expect(cbB).not.toHaveBeenCalled();
      subA.unsubscribe();
      subB.unsubscribe();
    });

    it('should subscribe to multiple action types when given an array of types', async () => {
      const callback = jest.fn();
      const sub = onAction(['action_x', 'action_y'], callback);

      dispatchAction({type: 'action_x', payload: 'data_x'});
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith({type: 'action_x', payload: 'data_x'});

      dispatchAction({type: 'action_y', payload: 'data_y'});
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenLastCalledWith({type: 'action_y', payload: 'data_y'});

      sub.unsubscribe();
      dispatchAction({type: 'action_x', payload: 'more_data'});
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(2); // no more calls
    });

    it('should handle multiple dispatches in sequence', async () => {
      const callback = jest.fn();
      const sub = onAction('multi_dispatch', callback);
      dispatchAction({type: 'multi_dispatch', payload: 1});
      dispatchAction({type: 'multi_dispatch', payload: 2});
      dispatchAction({type: 'multi_dispatch', payload: 3});
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(3);
      expect(callback).toHaveBeenNthCalledWith(1, expect.objectContaining({payload: 1}));
      expect(callback).toHaveBeenNthCalledWith(2, expect.objectContaining({payload: 2}));
      expect(callback).toHaveBeenNthCalledWith(3, expect.objectContaining({payload: 3}));
      sub.unsubscribe();
    });

    it('should continue notifying other handlers if one throws', async () => {
      const errorHandler = jest.fn(() => {
        throw new Error('handler error');
      });
      const normalHandler = jest.fn();
      const sub1 = onAction('error_test', errorHandler);
      const sub2 = onAction('error_test', normalHandler);
      dispatchAction({type: 'error_test', payload: 'data'});
      await nextMacrotask();
      expect(errorHandler).toHaveBeenCalledTimes(1);
      expect(normalHandler).toHaveBeenCalledTimes(1);
      sub1.unsubscribe();
      sub2.unsubscribe();
    });

    it('should handle void payload actions', async () => {
      const callback = jest.fn();
      const sub = onAction('void_action', callback);
      dispatchAction({type: 'void_action'});
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      sub.unsubscribe();
    });

    it('should handle async handlers', async () => {
      const callback = jest.fn(async () => {
        await nextMacrotask(1);
      });
      const sub = onAction('async_action', callback);
      dispatchAction({type: 'async_action', payload: 'data'});
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      sub.unsubscribe();
    });
  });

  describe('registerModifier', () => {
    it('should register a custom modifier', () => {
      expect(() => registerModifier('test-mod-2', () => true)).not.toThrow();
    });

    it('should overwrite an existing modifier without throwing', () => {
      registerModifier('overwrite-mod-2', () => true);
      expect(() => registerModifier('overwrite-mod-2', () => false)).not.toThrow();
    });
  });

  describe('registerPayloadResolver', () => {
    it('should register a custom payload resolver', () => {
      expect(() => registerPayloadResolver('$test-resolver-2', () => 'resolved')).not.toThrow();
    });

    it('should overwrite an existing resolver without throwing', () => {
      registerPayloadResolver('$overwrite-resolver-2', () => 'first');
      expect(() => registerPayloadResolver('$overwrite-resolver-2', () => 'second')).not.toThrow();
    });
  });
});

// ─── DOM Delegation ───────────────────────────────────────────────────────────

describe('Action — DOM Delegation', () => {
  beforeEach(() => {
    setupActionDelegation();
  });

  afterEach(() => {
    teardownActionDelegation();
    // Clean up any elements added to body.
    document.body.innerHTML = '';
  });

  describe('setupActionDelegation / teardownActionDelegation', () => {
    it('should export DEFAULT_DELEGATED_EVENTS', () => {
      expect(DEFAULT_DELEGATED_EVENTS).toBeDefined();
      expect(DEFAULT_DELEGATED_EVENTS).toContain('click');
      expect(DEFAULT_DELEGATED_EVENTS).toContain('submit');
      expect(DEFAULT_DELEGATED_EVENTS).toContain('input');
      expect(DEFAULT_DELEGATED_EVENTS).toContain('change');
    });

    it('should be idempotent — calling setupActionDelegation twice does not duplicate listeners', async () => {
      setupActionDelegation(); // second call
      const callback = jest.fn();
      const sub = onAction('ui_idempotent_test', callback);
      const btn = document.createElement('button');
      btn.setAttribute('on-click', 'ui_idempotent_test:payload');
      document.body.appendChild(btn);
      btn.click();
      await nextMacrotask();
      // Should only fire once, not twice.
      expect(callback).toHaveBeenCalledTimes(1);
      sub.unsubscribe();
    });

    it('should stop dispatching after teardownActionDelegation', async () => {
      teardownActionDelegation();
      const callback = jest.fn();
      const sub = onAction('ui_teardown_test', callback);
      const btn = document.createElement('button');
      btn.setAttribute('on-click', 'ui_teardown_test:payload');
      document.body.appendChild(btn);
      btn.click();
      await nextMacrotask();
      expect(callback).not.toHaveBeenCalled();
      sub.unsubscribe();
    });
  });

  describe('click delegation with on-click attribute', () => {
    it('should dispatch action when element with on-click is clicked', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_btn_click', callback);
      const btn = document.createElement('button');
      btn.setAttribute('on-click', 'ui_btn_click');
      document.body.appendChild(btn);
      btn.click();
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      const action = callback.mock.calls[0][0];
      expect(action.type).toBe('ui_btn_click');
      expect(action.payload).toBeUndefined();
      sub.unsubscribe();
    });

    it('should dispatch action with literal payload', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_open_drawer', callback);
      const btn = document.createElement('button');
      btn.setAttribute('on-click', 'ui_open_drawer:settings');
      document.body.appendChild(btn);
      btn.click();
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      const action = callback.mock.calls[0][0];
      expect(action.type).toBe('ui_open_drawer');
      expect(action.payload).toBe('settings');
      sub.unsubscribe();
    });

    it('should dispatch action from child element (event bubbles up)', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_parent_action', callback);
      const div = document.createElement('div');
      div.setAttribute('on-click', 'ui_parent_action:from-child');
      const span = document.createElement('span');
      span.textContent = 'Click me';
      div.appendChild(span);
      document.body.appendChild(div);
      span.click();
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback.mock.calls[0][0].payload).toBe('from-child');
      sub.unsubscribe();
    });

    it('should not dispatch when element without on-click is clicked', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_no_attr', callback);
      const btn = document.createElement('button');
      document.body.appendChild(btn);
      btn.click();
      await nextMacrotask();
      expect(callback).not.toHaveBeenCalled();
      sub.unsubscribe();
    });
  });

  describe('context resolution via [action-context]', () => {
    it('should resolve context from nearest [action-context] ancestor', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_ctx_action', callback);
      const section = document.createElement('section');
      section.setAttribute('action-context', 'product-list');
      const btn = document.createElement('button');
      btn.setAttribute('on-click', 'ui_ctx_action:42');
      section.appendChild(btn);
      document.body.appendChild(section);
      btn.click();
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      const action = callback.mock.calls[0][0];
      expect(action.context).toBe('product-list');
      expect(action.payload).toBe('42');
      sub.unsubscribe();
    });

    it('should have undefined context when no [action-context] ancestor exists', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_no_ctx', callback);
      const btn = document.createElement('button');
      btn.setAttribute('on-click', 'ui_no_ctx:data');
      document.body.appendChild(btn);
      btn.click();
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback.mock.calls[0][0].context).toBeUndefined();
      sub.unsubscribe();
    });

    it('should resolve context from the element itself if it has [action-context]', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_self_ctx', callback);
      const btn = document.createElement('button');
      btn.setAttribute('on-click', 'ui_self_ctx:data');
      btn.setAttribute('action-context', 'self-scope');
      document.body.appendChild(btn);
      btn.click();
      await nextMacrotask();
      expect(callback.mock.calls[0][0].context).toBe('self-scope');
      sub.unsubscribe();
    });
  });

  describe('built-in modifiers', () => {
    it('once modifier should remove attribute after first fire', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_once_action', callback);
      const btn = document.createElement('button');
      btn.setAttribute('on-click', 'ui_once_action:data; once');
      document.body.appendChild(btn);
      btn.click();
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      // Attribute should be removed after first fire.
      expect(btn.hasAttribute('on-click')).toBe(false);
      // Second click should not dispatch.
      btn.click();
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      sub.unsubscribe();
    });

    it('prevent modifier should call event.preventDefault()', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_prevent_action', callback);
      const form = document.createElement('form');
      form.setAttribute('on-submit', 'ui_prevent_action; prevent');
      document.body.appendChild(form);
      const preventDefaultSpy = jest.fn();
      const submitEvent = new Event('submit', {bubbles: true, cancelable: true});
      Object.defineProperty(submitEvent, 'preventDefault', {value: preventDefaultSpy});
      form.dispatchEvent(submitEvent);
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
      sub.unsubscribe();
    });
  });

  describe('built-in payload resolvers', () => {
    it('$value resolver should read element.value', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_input_action', callback);
      const input = document.createElement('input');
      input.setAttribute('on-input', 'ui_input_action:$value');
      input.value = 'hello world';
      document.body.appendChild(input);
      input.dispatchEvent(new Event('input', {bubbles: true}));
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback.mock.calls[0][0].payload).toBe('hello world');
      sub.unsubscribe();
    });

    it('$checked resolver should read element.checked', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_check_action', callback);
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = true;
      checkbox.setAttribute('on-change', 'ui_check_action:$checked');
      document.body.appendChild(checkbox);
      checkbox.dispatchEvent(new Event('change', {bubbles: true}));
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback.mock.calls[0][0].payload).toBe(true);
      sub.unsubscribe();
    });
  });

  describe('custom modifiers and resolvers', () => {
    it('custom modifier should run and can cancel dispatch by returning false', async () => {
      registerModifier('block-all', () => false);
      const callback = jest.fn();
      const sub = onAction('ui_blocked_action', callback);
      const btn = document.createElement('button');
      btn.setAttribute('on-click', 'ui_blocked_action:data; block-all');
      document.body.appendChild(btn);
      btn.click();
      await nextMacrotask();
      expect(callback).not.toHaveBeenCalled();
      sub.unsubscribe();
    });

    it('custom modifier should enrich action.meta', async () => {
      registerModifier('add-trace', (_event, _element, action) => {
        action.meta = action.meta || {};
        action.meta['traceId'] = 'test-trace-123';
        return true;
      });
      const callback = jest.fn();
      const sub = onAction('ui_traced_action', callback);
      const btn = document.createElement('button');
      btn.setAttribute('on-click', 'ui_traced_action:data; add-trace');
      document.body.appendChild(btn);
      btn.click();
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback.mock.calls[0][0].meta).toEqual({traceId: 'test-trace-123'});
      sub.unsubscribe();
    });

    it('custom payload resolver should resolve payload from element', async () => {
      registerPayloadResolver('$data-id', (_event, element) => {
        return element.dataset.id ?? null;
      });
      const callback = jest.fn();
      const sub = onAction('ui_custom_resolve', callback);
      const btn = document.createElement('button');
      btn.setAttribute('on-click', 'ui_custom_resolve:$data-id');
      btn.dataset.id = '99';
      document.body.appendChild(btn);
      btn.click();
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback.mock.calls[0][0].payload).toBe('99');
      sub.unsubscribe();
    });
  });

  describe('dynamic content support', () => {
    it('should handle elements added after setupActionDelegation', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_dynamic_action', callback);
      // Add element AFTER setup.
      const btn = document.createElement('button');
      btn.setAttribute('on-click', 'ui_dynamic_action:dynamic');
      document.body.appendChild(btn);
      btn.click();
      await nextMacrotask();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback.mock.calls[0][0].payload).toBe('dynamic');
      sub.unsubscribe();
    });
  });

  describe('invalid syntax handling', () => {
    it('should not dispatch for invalid attribute syntax', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_invalid', callback);
      const btn = document.createElement('button');
      btn.setAttribute('on-click', '!!!invalid syntax!!!');
      document.body.appendChild(btn);
      btn.click();
      await nextMacrotask();
      expect(callback).not.toHaveBeenCalled();
      sub.unsubscribe();
    });

    it('should not dispatch for empty attribute value', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_empty', callback);
      const btn = document.createElement('button');
      btn.setAttribute('on-click', '');
      document.body.appendChild(btn);
      btn.click();
      await nextMacrotask();
      expect(callback).not.toHaveBeenCalled();
      sub.unsubscribe();
    });
  });
});

// ─── Extra DOM Delegation Coverage ────────────────────────────────────────────

describe('Action — DOM Delegation (extra)', () => {
  beforeEach(() => {
    setupActionDelegation();
  });

  afterEach(() => {
    teardownActionDelegation();
    document.body.innerHTML = '';
  });

  describe('$formdata resolver', () => {
    it('should resolve $formdata from nearest form', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_submit_form', callback);

      const form = document.createElement('form');
      form.setAttribute('on-submit', 'ui_submit_form:$formdata; prevent');

      const nameInput = document.createElement('input');
      nameInput.name = 'username';
      nameInput.value = 'ali';
      form.appendChild(nameInput);

      const passInput = document.createElement('input');
      passInput.name = 'password';
      passInput.value = 'secret';
      form.appendChild(passInput);

      document.body.appendChild(form);

      form.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
      await nextMacrotask();

      expect(callback).toHaveBeenCalledTimes(1);
      const payload = callback.mock.calls[0][0].payload;
      expect(payload).toBeDefined();
      expect(payload.username).toBe('ali');
      expect(payload.password).toBe('secret');

      sub.unsubscribe();
    });

    it('should return null when $formdata has no form ancestor', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_no_form', callback);

      const btn = document.createElement('button');
      btn.setAttribute('on-click', 'ui_no_form:$formdata');
      document.body.appendChild(btn);
      btn.click();
      await nextMacrotask();

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback.mock.calls[0][0].payload).toBeNull();

      sub.unsubscribe();
    });
  });

  describe('validate modifier', () => {
    it('should cancel dispatch when form is invalid', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_validate_fail', callback);

      const form = document.createElement('form');
      form.setAttribute('on-submit', 'ui_validate_fail; prevent,validate');
      form.setAttribute('novalidate', '');

      const input = document.createElement('input');
      input.required = true;
      input.value = ''; // empty — invalid
      form.appendChild(input);

      document.body.appendChild(form);

      form.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
      await nextMacrotask();

      expect(callback).not.toHaveBeenCalled();

      sub.unsubscribe();
    });

    it('should allow dispatch when form is valid', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_validate_pass', callback);

      const form = document.createElement('form');
      form.setAttribute('on-submit', 'ui_validate_pass; prevent,validate');

      const input = document.createElement('input');
      input.required = true;
      input.value = 'filled';
      form.appendChild(input);

      document.body.appendChild(form);

      form.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
      await nextMacrotask();

      expect(callback).toHaveBeenCalledTimes(1);

      sub.unsubscribe();
    });

    it('should cancel dispatch when no form ancestor exists', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_validate_no_form', callback);

      const btn = document.createElement('button');
      btn.setAttribute('on-click', 'ui_validate_no_form; validate');
      document.body.appendChild(btn);
      btn.click();
      await nextMacrotask();

      // validate returns false when no form found.
      expect(callback).not.toHaveBeenCalled();

      sub.unsubscribe();
    });
  });

  describe('$checked resolver with false', () => {
    it('should resolve $checked as false for unchecked checkbox', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_uncheck_action', callback);

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = false;
      checkbox.setAttribute('on-change', 'ui_uncheck_action:$checked');
      document.body.appendChild(checkbox);

      checkbox.dispatchEvent(new Event('change', {bubbles: true}));
      await nextMacrotask();

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback.mock.calls[0][0].payload).toBe(false);

      sub.unsubscribe();
    });
  });

  describe('$value resolver with different input types', () => {
    it('should resolve $value from textarea', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_textarea_action', callback);

      const textarea = document.createElement('textarea');
      textarea.setAttribute('on-input', 'ui_textarea_action:$value');
      textarea.value = 'multi\nline\ntext';
      document.body.appendChild(textarea);

      textarea.dispatchEvent(new Event('input', {bubbles: true}));
      await nextMacrotask();

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback.mock.calls[0][0].payload).toBe('multi\nline\ntext');

      sub.unsubscribe();
    });

    it('should resolve $value from select element', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_select_action', callback);

      const select = document.createElement('select');
      select.setAttribute('on-change', 'ui_select_action:$value');
      const opt1 = document.createElement('option');
      opt1.value = 'a';
      opt1.textContent = 'Option A';
      const opt2 = document.createElement('option');
      opt2.value = 'b';
      opt2.textContent = 'Option B';
      opt2.selected = true;
      select.appendChild(opt1);
      select.appendChild(opt2);
      document.body.appendChild(select);

      select.dispatchEvent(new Event('change', {bubbles: true}));
      await nextMacrotask();

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback.mock.calls[0][0].payload).toBe('b');

      sub.unsubscribe();
    });
  });

  describe('nested context resolution', () => {
    it('should resolve nearest context when contexts are nested', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_nested_ctx', callback);

      const outer = document.createElement('div');
      outer.setAttribute('action-context', 'outer');
      const inner = document.createElement('div');
      inner.setAttribute('action-context', 'inner');
      const btn = document.createElement('button');
      btn.setAttribute('on-click', 'ui_nested_ctx:data');

      inner.appendChild(btn);
      outer.appendChild(inner);
      document.body.appendChild(outer);

      btn.click();
      await nextMacrotask();

      expect(callback).toHaveBeenCalledTimes(1);
      // Should resolve to 'inner' (nearest ancestor).
      expect(callback.mock.calls[0][0].context).toBe('inner');

      sub.unsubscribe();
    });
  });

  describe('multiple event types', () => {
    it('should handle input event delegation', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_input_evt', callback);

      const input = document.createElement('input');
      input.setAttribute('on-input', 'ui_input_evt:$value');
      input.value = 'typed';
      document.body.appendChild(input);

      input.dispatchEvent(new Event('input', {bubbles: true}));
      await nextMacrotask();

      expect(callback).toHaveBeenCalledTimes(1);
      sub.unsubscribe();
    });

    it('should handle change event delegation', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_change_evt', callback);

      const select = document.createElement('select');
      select.setAttribute('on-change', 'ui_change_evt:$value');
      const opt = document.createElement('option');
      opt.value = 'selected';
      opt.selected = true;
      select.appendChild(opt);
      document.body.appendChild(select);

      select.dispatchEvent(new Event('change', {bubbles: true}));
      await nextMacrotask();

      expect(callback).toHaveBeenCalledTimes(1);
      sub.unsubscribe();
    });
  });

  describe('unknown modifier handling', () => {
    it('should abort dispatch when an unknown modifier is encountered', async () => {
      const callback = jest.fn();
      const sub = onAction('ui_unknown_mod', callback);

      const btn = document.createElement('button');
      btn.setAttribute('on-click', 'ui_unknown_mod:data; nonexistent-modifier');
      document.body.appendChild(btn);
      btn.click();
      await nextMacrotask();

      expect(callback).not.toHaveBeenCalled();
      sub.unsubscribe();
    });
  });

  describe('re-setup after teardown', () => {
    it('should work again after teardown + re-setup', async () => {
      teardownActionDelegation();
      setupActionDelegation();

      const callback = jest.fn();
      const sub = onAction('ui_re_setup', callback);

      const btn = document.createElement('button');
      btn.setAttribute('on-click', 'ui_re_setup:data');
      document.body.appendChild(btn);
      btn.click();
      await nextMacrotask();

      expect(callback).toHaveBeenCalledTimes(1);
      sub.unsubscribe();
    });
  });

  describe('custom event types', () => {
    it('should support custom event types via setupActionDelegation', async () => {
      teardownActionDelegation();
      setupActionDelegation(['click', 'keydown']);

      const callback = jest.fn();
      const sub = onAction('ui_key_action', callback);

      const input = document.createElement('input');
      input.setAttribute('on-keydown', 'ui_key_action:enter');
      document.body.appendChild(input);

      input.dispatchEvent(new Event('keydown', {bubbles: true}));
      await nextMacrotask();

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback.mock.calls[0][0].payload).toBe('enter');
      sub.unsubscribe();
    });
  });
});
