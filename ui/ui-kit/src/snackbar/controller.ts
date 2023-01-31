import {commandHandler} from '@alwatr/signal';

import type {AlwatrSnackbar} from './element.js';
import type {SnackbarOptions, SnackbarResponse} from './type.js';

const currentSnackbar: AlwatrSnackbar | null = null;

const _showSnackbar = (options: SnackbarOptions): SnackbarResponse => {
  options.duration ??= 5;
  // TODO: create new alwatr-snackbar and append to body
  alert(options.message);
  return {};
};

commandHandler.define<SnackbarOptions, SnackbarResponse>('show-snackbar-command', _showSnackbar);
