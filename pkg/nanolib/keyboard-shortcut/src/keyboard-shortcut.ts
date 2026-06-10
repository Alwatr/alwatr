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
 * built from active modifiers + key name, all **lowercase**, joined by `_`:
 *
 * | Keys pressed          | Action type              |
 * | --------------------- | ------------------------ |
 * | Escape                | `key_escape`             |
 * | Space                 | `key_space`              |
 * | Ctrl + S              | `key_ctrl_s`             |
 * | Shift + Ctrl + U      | `key_ctrl_shift_u`       |
 * | Alt + Enter           | `key_alt_enter`          |
 *
 * Modifier order is always **ctrl → shift → alt** for consistency.
 *
 * ## Usage
 *
 * ```ts
 * import {keyboardShortcutService, onAction} from '@alwatr/flux';
 *
 * // Initialize keyboard shortcut listener
 * keyboardShortcutService.setup();
 *
 * // Close drawer on Escape
 * onAction('key_escape', () => closeDrawer());
 *
 * // Save on Ctrl+S
 * onAction('key_ctrl_s', () => save());
 *
 * // Cleanup when no longer needed
 * keyboardShortcutService.teardown();
 * ```
 */

import {actionService} from '@alwatr/action';
import {createLogger} from '@alwatr/logger';

/**
 * Service to manage global keyboard shortcut mapping and dispatching.
 *
 * Implements global `keydown` event listener on `document` in the capture phase,
 * normalizes modifier combinations, and dispatches equivalent flux actions.
 */
export class KeyboardShortcutService {
  protected readonly logger_ = createLogger('keyboard-shortcut-service');

  // Modifier keys that should not produce standalone actions.
  private readonly modifierKeys__ = new Set(['Control', 'Shift', 'Alt', 'Meta']);

  // Editable element tags where bare key presses (no modifier) are user input, not shortcuts.
  private readonly editableTags__ = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

  private hasRegistered__ = false;

  constructor() {
    DEV_MODE && this.logger_.logMethod?.('constructor');
    this.handleKeyDown__ = this.handleKeyDown__.bind(this);
  }

  /**
   * Registers global event listener for `keydown` on `document`.
   * Safe to call multiple times (idempotent).
   *
   * @example
   * ```ts
   * keyboardShortcutService.setup();
   * ```
   */
  setup(): void {
    DEV_MODE && this.logger_.logMethod?.('setup');
    if (this.hasRegistered__) return;
    if (typeof document === 'undefined') {
      DEV_MODE && this.logger_.incident?.('setup', 'document_not_found');
      return;
    }
    this.hasRegistered__ = true;
    document.addEventListener('keydown', this.handleKeyDown__, {capture: true});
  }

  /**
   * Removes global event listener for `keydown` on `document`.
   *
   * @example
   * ```ts
   * keyboardShortcutService.teardown();
   * ```
   */
  teardown(): void {
    DEV_MODE && this.logger_.logMethod?.('teardown');
    if (!this.hasRegistered__) return;
    if (typeof document === 'undefined') return;
    this.hasRegistered__ = false;
    document.removeEventListener('keydown', this.handleKeyDown__, {capture: true});
  }

  /**
   * Global keydown event listener handler.
   */
  private handleKeyDown__(event: KeyboardEvent): void {
    // Ignore standalone modifier presses — they are not actionable shortcuts.
    if (this.modifierKeys__.has(event.key)) return;

    // When focus is inside an editable element, only dispatch shortcut actions
    // that include a real modifier (ctrl/meta/alt). Bare key presses like
    // letters, digits, Escape, Enter, etc. are normal user input and must
    // not be intercepted.
    if (this.isEditable__(event) && !this.hasModifier__(event)) return;

    const combo = this.buildCombo__(event);

    DEV_MODE && this.logger_.logMethodArgs?.('keyboard_handler', {combo});

    actionService.dispatch({type: `key_${combo}`});
  }

  /**
   * Whether the event target is an editable element (input, textarea, select,
   * or any element with `contenteditable`).
   */
  private isEditable__(event: KeyboardEvent): boolean {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return false;
    return this.editableTags__.has(target.tagName) || target.isContentEditable;
  }

  /**
   * Whether the event carries at least one non-shift modifier (ctrl/meta/alt).
   *
   * Shift alone is not considered a modifier shortcut because Shift+Letter
   * is normal typing (uppercase). Only ctrl/meta/alt signal an intentional
   * keyboard shortcut.
   */
  private hasModifier__(event: KeyboardEvent): boolean {
    return event.ctrlKey || event.metaKey || event.altKey;
  }

  /**
   * Builds a normalized, deterministic combo string from a KeyboardEvent.
   *
   * Modifier order is fixed (ctrl → shift → alt) so the same
   * physical combination always produces the same string regardless of
   * the order the user pressed the modifier keys.
   */
  private buildCombo__(event: KeyboardEvent): string {
    const parts: string[] = [];

    if (event.ctrlKey || event.metaKey) parts.push('ctrl');
    if (event.shiftKey) parts.push('shift');
    if (event.altKey) parts.push('alt');

    const key = event.key === ' ' ? 'space' : event.key.toLowerCase();
    parts.push(key);

    return parts.join('_');
  }
}

/**
 * Singleton instance of KeyboardShortcutService.
 *
 * @example
 * ```ts
 * import {keyboardShortcutService} from '@alwatr/keyboard-shortcut';
 *
 * keyboardShortcutService.setup();
 * ```
 */
export const keyboardShortcutService = new KeyboardShortcutService();

// Type augmentation — register the `key_*` pattern so any module can
// declare specific shortcuts via ActionRecord merging.
declare module '@alwatr/action' {
  interface ActionRecord {
    [key: `key_${string}`]: void;
  }
}
