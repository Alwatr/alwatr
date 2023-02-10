import {commandTrigger} from '@alwatr/signal';

import type {SnackbarOptions, SnackbarResponse} from './type.js';

/**
 * Show snackbar with optional action.
 *
 * Example:
 *
 * Simple toast:
 * ```ts
 * snackbarSignalTrigger.request({message: 'Form submitted successfully.'});
 * ```
 *
 * With action label:
 * ```ts
 * const response = await snackbarSignalTrigger.requestWithResponse({
 *   message: 'Email archived.',
 *   actionLabel: 'Undo',
 * });
 * if (response.actionClicked) {
 *   // undo...
 * }
 * ```
 */
export const snackbarSignalTrigger = commandTrigger.bind<SnackbarOptions, SnackbarResponse>('show-snackbar-command');
