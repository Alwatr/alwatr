/**
 * Global keyboard-to-action bridge for Alwatr Flux.
 *
 * Listens for `keydown` on `document` and dispatches a flux action whose
 * name is derived from the pressed key combination. This lets any module
 * react to keyboard shortcuts declaratively via `onAction()` without
 * coupling to raw DOM events.
 *
 * ## Action naming convention
 *
 * The action type follows the pattern `key_<combo>` where `<combo>` is
 * built from active modifiers + key name, all **lowercase**, joined by `+`:
 *
 * | Keys pressed          | Action type              |
 * | --------------------- | ------------------------ |
 * | Escape                | `key_escape`             |
 * | Ctrl + S              | `key_ctrl+s`             |
 * | Shift + Ctrl + U      | `key_ctrl+shift+u`       |
 * | Alt + Enter           | `key_alt+enter`          |
 *
 * Modifier order is always **ctrl → shift → alt** for consistency.
 *
 * ## Usage
 *
 * ```ts
 * import {setupKeyboardShortcut, onAction} from '@alwatr/flux';
 *
 * // Initialize keyboard shortcut listener
 * setupKeyboardShortcut();
 *
 * // Close drawer on Escape
 * onAction('key_escape', () => closeDrawer());
 *
 * // Save on Ctrl+S
 * onAction('key_ctrl+s', () => save());
 * ```
 */

import {dispatchAction} from '@alwatr/action';
import {createLogger} from '@alwatr/logger';

const logger_ = createLogger('keyboard-shortcut');

// Modifier keys that should not produce standalone actions.
const modifierKeys__ = new Set(['Control', 'Shift', 'Alt', 'Meta']);

// Editable element tags where bare key presses (no modifier) are user input, not shortcuts.
const editableTags__ = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

/**
 * Whether the event target is an editable element (input, textarea, select,
 * or any element with `contenteditable`).
 */
function isEditable__(event: KeyboardEvent): boolean {
  const target = event.target as HTMLElement | null;
  if (!target) return false;
  return editableTags__.has(target.tagName) || target.isContentEditable;
}

/**
 * Whether the event carries at least one non-shift modifier (ctrl/meta/alt).
 *
 * Shift alone is not considered a modifier shortcut because Shift+Letter
 * is normal typing (uppercase). Only ctrl/meta/alt signal an intentional
 * keyboard shortcut.
 */
function hasModifier__(event: KeyboardEvent): boolean {
  return event.ctrlKey || event.metaKey || event.altKey;
}

/**
 * Builds a normalized, deterministic combo string from a KeyboardEvent.
 *
 * Modifier order is fixed (ctrl → shift → alt) so the same
 * physical combination always produces the same string regardless of
 * the order the user pressed the modifier keys.
 */
function buildCombo__(event: KeyboardEvent): string {
  const parts: string[] = [];

  if (event.ctrlKey || event.metaKey) parts.push('ctrl');
  if (event.shiftKey) parts.push('shift');
  if (event.altKey) parts.push('alt');

  parts.push(event.key.toLowerCase());

  return parts.join('+');
}

/**
 * Global keydown event listener handler.
 */
function handleKeyDown__(event: KeyboardEvent): void {
  // Ignore standalone modifier presses — they are not actionable shortcuts.
  if (modifierKeys__.has(event.key)) return;

  // When focus is inside an editable element, only dispatch shortcut actions
  // that include a real modifier (ctrl/meta/alt). Bare key presses like
  // letters, digits, Escape, Enter, etc. are normal user input and must
  // not be intercepted.
  if (isEditable__(event) && !hasModifier__(event)) return;

  const combo = buildCombo__(event);

  logger_.logMethodArgs?.('keyboard_handler', {combo});

  dispatchAction({type: `key_${combo}`});
}

let hasRegistered__ = false;

/**
 * Registers global event listener for `keydown` on `document`.
 * Safe to call multiple times (idempotent).
 *
 * @example
 * ```ts
 * import {setupKeyboardShortcut} from '@alwatr/keyboard-shortcut';
 *
 * setupKeyboardShortcut();
 * ```
 */
export function setupKeyboardShortcut(): void {
  logger_.logMethod?.('setupKeyboardShortcut');
  if (hasRegistered__) return;
  hasRegistered__ = true;
  document.addEventListener('keydown', handleKeyDown__, {capture: true});
}

/**
 * Removes global event listener for `keydown` on `document`.
 *
 * @example
 * ```ts
 * import {teardownKeyboardShortcut} from '@alwatr/keyboard-shortcut';
 *
 * teardownKeyboardShortcut();
 * ```
 */
export function teardownKeyboardShortcut(): void {
  logger_.logMethod?.('teardownKeyboardShortcut');
  if (!hasRegistered__) return;
  hasRegistered__ = false;
  document.removeEventListener('keydown', handleKeyDown__, {capture: true});
}

// Type augmentation — register the `key_*` pattern so any module can
// declare specific shortcuts via ActionRecord merging.
declare module '@alwatr/action' {
  interface ActionRecord {
    [key: `key_${string}`]: void;
  }
}
