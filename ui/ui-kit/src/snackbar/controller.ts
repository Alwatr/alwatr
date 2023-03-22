import {message} from '@alwatr/i18n';
import {createLogger} from '@alwatr/logger';
import {clamp} from '@alwatr/math';
import {commandHandler} from '@alwatr/signal';

import './element.js';

import type {SnackbarOptions, SnackbarResponse} from './type.js';

const logger = createLogger('alwatr-snackbar-controller');
const paintDelay = 60;
let closeLastSnackbar: ((response: SnackbarResponse) => void) | null = null;

commandHandler.define<SnackbarOptions, SnackbarResponse>('show-snackbar-command', (options) => {
  if (options.duration === -1 && !options.actionLabel) delete options.duration;
  logger.logMethodArgs('showSnackbar', options);
  return new Promise((resolve) => {
    const element = document.body.appendChild(document.createElement('alwatr-snackbar'));

    let closed = false;
    const _closeSnackbar = (response: SnackbarResponse): void => {
      if (closed) return;
      if (!response.actionButton && options.duration === -1) return; // keep it!
      logger.logMethodArgs('closeSnackbar', response);
      closed = true;
      closeLastSnackbar = null;
      element.open = false;
      resolve(response);
      setTimeout(() => {
        element.remove();
      }, 500);
    };

    element.message = options.messageKey != null ? message(options.messageKey) : options.message;
    if (options.actionLabel || options.actionLabelKey) {
      element.actionLabel = options.actionLabelKey != null ? message(options.actionLabelKey) : options.actionLabel;
      element.addEventListener('action-button-click', () => _closeSnackbar?.({actionButton: true}), {once: true});
    }

    setTimeout(() => {
      element.open = true;
      closeLastSnackbar?.({});
      closeLastSnackbar = _closeSnackbar;
      if (options.duration !== -1) {
        setTimeout(() => _closeSnackbar?.({}), clamp(options.duration ?? 5_000, 4_000, 10_000));
      }
    }, paintDelay);
  });
});
