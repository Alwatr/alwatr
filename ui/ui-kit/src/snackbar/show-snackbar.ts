import {commandTrigger} from '@alwatr/signal';
import {MaybePromise} from '@alwatr/type';

import type {SnackbarOptions, SnackbarResponse} from './type.js';

export const snackbarSignalTrigger = commandTrigger.bind<SnackbarOptions, SnackbarResponse>('show-snackbar-command');

/**
 * Show snackbar with optional action.
 *
 * Example:
 *
 * Simple toast:
 * ```ts
 * showSnackbar({message: 'Form submitted successfully.'});
 * ```
 *
 * With action label:
 * ```ts
 * const response = await showSnackbar({
 *   message: 'Email archived.',
 *   actionLabel: 'Undo',
 * });
 * if (response.actionClicked) {
 *   // undo...
 * }
 * ```
 */
export function showSnackbar(options: SnackbarOptions): MaybePromise<SnackbarResponse> {
  if (options.actionLabel) {
    return snackbarSignalTrigger.requestWithResponse(options);
  }
  // else
  snackbarSignalTrigger.request(options);
  return {};
}
