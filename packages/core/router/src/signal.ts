import {SignalInterface} from '@alwatr/signal';

import type {RequestRouteParam, Route} from './type.js';

declare global {
  interface AlwatrSignals {
    'route-change': Route;
  }

  interface AlwatrRequestSignals {
    'route-change': RequestRouteParam;
  }
}

export const routeChangeSignal = new SignalInterface('route-change');
