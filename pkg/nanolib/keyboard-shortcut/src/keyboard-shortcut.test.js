import {describe, beforeEach, afterEach, it, expect, mock} from 'bun:test';
import {GlobalRegistrator} from '@happy-dom/global-registrator';
import {keyboardShortcutService} from '@alwatr/keyboard-shortcut';
import {onAction} from '@alwatr/action';

// Register DOM globals for testing (keyboard-shortcut requires document.addEventListener).
if (typeof document === 'undefined') {
  GlobalRegistrator.register();
}

/**
 * Helper to wait for microtask/macrotask queue to flush.
 * @returns {Promise<void>}
 */
function nextMacrotask() {
  return new Promise((resolve) => setTimeout(resolve, 5));
}

describe('keyboardShortcutService', () => {
  beforeEach(() => {
    keyboardShortcutService.setup();
  });

  afterEach(() => {
    keyboardShortcutService.teardown();
  });

  it('should dispatch action for bare Escape key press', async () => {
    const callback = mock();
    const sub = onAction('key_escape', callback);

    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);

    await nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    sub.unsubscribe();
  });

  it('should dispatch normalized action for modifier combos (Ctrl+S)', async () => {
    const callback = mock();
    const sub = onAction('key_ctrl+s', callback);

    const event = new KeyboardEvent('keydown', {
      key: 's',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);

    await nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    sub.unsubscribe();
  });

  it('should normalize modifier order to ctrl -> shift -> alt (Shift+Alt+Ctrl+U)', async () => {
    const callback = mock();
    const sub = onAction('key_ctrl+shift+alt+u', callback);

    const event = new KeyboardEvent('keydown', {
      key: 'u',
      ctrlKey: true,
      shiftKey: true,
      altKey: true,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);

    await nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);
    sub.unsubscribe();
  });

  it('should not dispatch action for standalone modifier key presses', async () => {
    const callback = mock();
    const sub = onAction('key_control', callback);

    const event = new KeyboardEvent('keydown', {
      key: 'Control',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);

    await nextMacrotask();
    expect(callback).not.toHaveBeenCalled();
    sub.unsubscribe();
  });

  it('should ignore bare key presses in input elements', async () => {
    const callback = mock();
    const sub = onAction('key_escape', callback);

    const input = document.createElement('input');
    document.body.appendChild(input);

    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event);

    await nextMacrotask();
    expect(callback).not.toHaveBeenCalled();

    input.remove();
    sub.unsubscribe();
  });

  it('should dispatch shortcut action in input elements if it carries modifier', async () => {
    const callback = mock();
    const sub = onAction('key_ctrl+s', callback);

    const input = document.createElement('input');
    document.body.appendChild(input);

    const event = new KeyboardEvent('keydown', {
      key: 's',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event);

    await nextMacrotask();
    expect(callback).toHaveBeenCalledTimes(1);

    input.remove();
    sub.unsubscribe();
  });

  it('should ignore bare key presses in contenteditable elements', async () => {
    const callback = mock();
    const sub = onAction('key_enter', callback);

    const div = document.createElement('div');
    div.contentEditable = 'true';
    document.body.appendChild(div);

    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
      cancelable: true,
    });
    div.dispatchEvent(event);

    await nextMacrotask();
    expect(callback).not.toHaveBeenCalled();

    div.remove();
    sub.unsubscribe();
  });

  it('should not dispatch actions after teardown', async () => {
    const callback = mock();
    const sub = onAction('key_escape', callback);

    keyboardShortcutService.teardown();

    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);

    await nextMacrotask();
    expect(callback).not.toHaveBeenCalled();
    sub.unsubscribe();
  });
});
