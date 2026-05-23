import {describe, it, expect, jest} from 'bun:test';
import {GlobalRegistrator} from '@happy-dom/global-registrator';

// Ensure DOM globals are available for modifier/resolver tests that reference HTMLElement.
if (typeof document === 'undefined') {
  GlobalRegistrator.register();
}

// Import internal registries directly to unit-test built-in modifiers and resolvers
// without going through the full delegation pipeline.
import {actionService} from './action-service.js';

const modifierRegistry = actionService.modifierRegistry_;
const payloadRegistry = actionService.payloadRegistry_;

/**
 * Helper: creates a minimal mock Event with optional overrides.
 * @param {Partial<Event>} [overrides]
 * @returns {Event}
 */
function mockEvent(overrides = {}) {
  const event = new Event('click', {bubbles: true, cancelable: true});
  for (const [key, value] of Object.entries(overrides)) {
    Object.defineProperty(event, key, {value, writable: true});
  }
  return event;
}

// ─── Built-in Modifiers ───────────────────────────────────────────────────────

describe('Registry — Built-in Modifiers', () => {
  describe('prevent modifier', () => {
    it('should be registered in the modifier registry', () => {
      expect(modifierRegistry.has('prevent')).toBe(true);
    });

    it('should call event.preventDefault() and return true', () => {
      const handler = modifierRegistry.get('prevent');
      const preventDefaultSpy = jest.fn();
      const event = mockEvent({preventDefault: preventDefaultSpy});
      const element = document.createElement('button');
      const action = {type: 'test', payload: undefined};

      const result = handler(event, element, action);

      expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });
  });

  describe('validate modifier', () => {
    it('should be registered in the modifier registry', () => {
      expect(modifierRegistry.has('validate')).toBe(true);
    });

    it('should return true when the form is valid', () => {
      const handler = modifierRegistry.get('validate');
      const form = document.createElement('form');
      const input = document.createElement('input');
      input.required = true;
      input.value = 'filled';
      form.appendChild(input);
      document.body.appendChild(form);

      const event = mockEvent();
      const action = {type: 'test', payload: undefined};
      const result = handler(event, form, action);

      expect(result).toBe(true);
      document.body.removeChild(form);
    });

    it('should return false when the form is invalid', () => {
      const handler = modifierRegistry.get('validate');
      const form = document.createElement('form');
      const input = document.createElement('input');
      input.required = true;
      input.value = ''; // empty — invalid
      form.appendChild(input);
      document.body.appendChild(form);

      const event = mockEvent();
      const action = {type: 'test', payload: undefined};
      const result = handler(event, form, action);

      expect(result).toBe(false);
      document.body.removeChild(form);
    });

    it('should return false when no form ancestor exists', () => {
      const handler = modifierRegistry.get('validate');
      const btn = document.createElement('button');
      document.body.appendChild(btn);

      const event = mockEvent();
      const action = {type: 'test', payload: undefined};
      const result = handler(event, btn, action);

      expect(result).toBe(false);
      document.body.removeChild(btn);
    });

    it('should find the nearest form ancestor when element is not a form', () => {
      const handler = modifierRegistry.get('validate');
      const form = document.createElement('form');
      const input = document.createElement('input');
      input.required = true;
      input.value = 'valid';
      form.appendChild(input);
      const btn = document.createElement('button');
      form.appendChild(btn);
      document.body.appendChild(form);

      const event = mockEvent();
      const action = {type: 'test', payload: undefined};
      const result = handler(event, btn, action);

      expect(result).toBe(true);
      document.body.removeChild(form);
    });
  });
});

// ─── Built-in Payload Resolvers ───────────────────────────────────────────────

describe('Registry — Built-in Payload Resolvers', () => {
  describe('$value resolver', () => {
    it('should be registered in the payload registry', () => {
      expect(payloadRegistry.has('$value')).toBe(true);
    });

    it('should return element.value for an input element', () => {
      const resolver = payloadRegistry.get('$value');
      const input = document.createElement('input');
      input.value = 'test-value';
      const event = mockEvent();

      const result = resolver(event, input);
      expect(result).toBe('test-value');
    });

    it('should return element.value for a textarea element', () => {
      const resolver = payloadRegistry.get('$value');
      const textarea = document.createElement('textarea');
      textarea.value = 'multi\nline';
      const event = mockEvent();

      const result = resolver(event, textarea);
      expect(result).toBe('multi\nline');
    });

    it('should return element.value for a select element', () => {
      const resolver = payloadRegistry.get('$value');
      const select = document.createElement('select');
      const opt = document.createElement('option');
      opt.value = 'selected-val';
      opt.selected = true;
      select.appendChild(opt);
      const event = mockEvent();

      const result = resolver(event, select);
      expect(result).toBe('selected-val');
    });

    it('should return null for an element without a value property', () => {
      const resolver = payloadRegistry.get('$value');
      const div = document.createElement('div');
      const event = mockEvent();

      const result = resolver(event, div);
      expect(result).toBeNull();
    });

    it('should return empty string for an input with empty value', () => {
      const resolver = payloadRegistry.get('$value');
      const input = document.createElement('input');
      input.value = '';
      const event = mockEvent();

      const result = resolver(event, input);
      expect(result).toBe('');
    });
  });

  describe('$formdata resolver', () => {
    it('should be registered in the payload registry', () => {
      expect(payloadRegistry.has('$formdata')).toBe(true);
    });

    it('should return form data as a plain object when element is a form', () => {
      const resolver = payloadRegistry.get('$formdata');
      const form = document.createElement('form');
      const input1 = document.createElement('input');
      input1.name = 'name';
      input1.value = 'Ali';
      form.appendChild(input1);
      const input2 = document.createElement('input');
      input2.name = 'email';
      input2.value = 'ali@test.com';
      form.appendChild(input2);
      document.body.appendChild(form);

      const event = mockEvent();
      const result = resolver(event, form);

      expect(result).toBeDefined();
      expect(result.name).toBe('Ali');
      expect(result.email).toBe('ali@test.com');
      document.body.removeChild(form);
    });

    it('should find the nearest form ancestor when element is not a form', () => {
      const resolver = payloadRegistry.get('$formdata');
      const form = document.createElement('form');
      const input = document.createElement('input');
      input.name = 'field';
      input.value = 'data';
      form.appendChild(input);
      const btn = document.createElement('button');
      form.appendChild(btn);
      document.body.appendChild(form);

      const event = mockEvent();
      const result = resolver(event, btn);

      expect(result).toBeDefined();
      expect(result.field).toBe('data');
      document.body.removeChild(form);
    });

    it('should return null when no form ancestor exists', () => {
      const resolver = payloadRegistry.get('$formdata');
      const div = document.createElement('div');
      document.body.appendChild(div);

      const event = mockEvent();
      const result = resolver(event, div);

      expect(result).toBeNull();
      document.body.removeChild(div);
    });

    it('should handle form with no inputs (empty FormData)', () => {
      const resolver = payloadRegistry.get('$formdata');
      const form = document.createElement('form');
      document.body.appendChild(form);

      const event = mockEvent();
      const result = resolver(event, form);

      expect(result).toBeDefined();
      expect(Object.keys(result)).toHaveLength(0);
      document.body.removeChild(form);
    });
  });

  describe('$checked resolver', () => {
    it('should be registered in the payload registry', () => {
      expect(payloadRegistry.has('$checked')).toBe(true);
    });

    it('should return true for a checked checkbox', () => {
      const resolver = payloadRegistry.get('$checked');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = true;
      const event = mockEvent();

      const result = resolver(event, checkbox);
      expect(result).toBe(true);
    });

    it('should return false for an unchecked checkbox', () => {
      const resolver = payloadRegistry.get('$checked');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = false;
      const event = mockEvent();

      const result = resolver(event, checkbox);
      expect(result).toBe(false);
    });

    it('should return true for a checked radio button', () => {
      const resolver = payloadRegistry.get('$checked');
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.checked = true;
      const event = mockEvent();

      const result = resolver(event, radio);
      expect(result).toBe(true);
    });

    it('should return null for an element without a checked property', () => {
      const resolver = payloadRegistry.get('$checked');
      const div = document.createElement('div');
      const event = mockEvent();

      const result = resolver(event, div);
      expect(result).toBeNull();
    });
  });
});
