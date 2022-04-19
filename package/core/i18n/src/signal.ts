import {SignalInterface} from '@alwatr/signal';

import {L10Resource, Local} from './type';

declare global {
  interface AlwatrSignals {
    'local-change': Local;
    'l10n-resource-change': L10Resource;
  }
  interface AlwatrRequestSignals {
    'l10n-resource-change': Local;
  }
}

export const l10nResourceChangeSignal = new SignalInterface('l10n-resource-change');
export const localChangeSignal = new SignalInterface('local-change');
