import {SignalInterface} from '@alwatr/signal';

import type {AlwatrToastOptionsInterface} from './toast.js';

declare global {
  interface AlwatrSignals {
    'toast': AlwatrToastOptionsInterface;
  }
}

export const toastSignal = new SignalInterface('toast');
