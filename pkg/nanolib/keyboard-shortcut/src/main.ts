/**
 * @alwatr/keyboard-shortcut — Global keyboard-to-action bridge.
 *
 * Listens for `keydown` on `document` and dispatches a flux action whose
 * name is derived from the pressed key combination. This lets any module
 * react to keyboard shortcuts declaratively via `onAction()` without
 * coupling to raw DOM events.
 *
 * ## Usage
 *
 * ```ts
 * import {setupKeyboardShortcut, onAction} from '@alwatr/keyboard-shortcut';
 *
 * // Initialize keyboard shortcut listener
 * setupKeyboardShortcut();
 *
 * // Close drawer on Escape
 * onAction('key_escape', () => closeDrawer());
 * ```
 */

export * from './keyboard-shortcut.js';
