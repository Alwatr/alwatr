import {clamp} from '@alwatr/math';
import {commandHandler} from '@alwatr/signal';
import './element.js';

import type {SnackbarOptions, SnackbarResponse} from './type.js';

const paintDelay = 60;
let closeLastSnackbar: ((response: SnackbarResponse) => void) | null = null;

const _showSnackbar = (options: SnackbarOptions): Promise<SnackbarResponse> => {
  return new Promise((resolve) => {
    const element = document.body.appendChild(document.createElement('alwatr-snackbar'));

    const _closeSnackbar = (response: SnackbarResponse): void => {
      closeLastSnackbar = null;
      element.open = false;
      resolve(response);
      setTimeout(() => {
        element.remove();
      }, 500);
    };

    element.message = options.message;
    if (options.actionLabel) {
      element.actionLabel = options.actionLabel;
      element.addEventListener(
          'action-button-click',
          () => _closeSnackbar?.({actionButton: true}),
          {once: true},
      );
    }

    setTimeout(() => {
      element.open = true;
      closeLastSnackbar?.({});
      closeLastSnackbar = _closeSnackbar;
      if (!(options.duration === -1 && element.actionLabel)) {
        setTimeout(
            () => _closeSnackbar?.({}),
            clamp(options.duration ?? 5_000, 4_000, 10_000),
        );
      }
    }, paintDelay);
  });
};

commandHandler.define<SnackbarOptions, SnackbarResponse>('show-snackbar-command', _showSnackbar);
