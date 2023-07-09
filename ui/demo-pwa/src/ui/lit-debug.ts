import {LitUnstable} from '@alwatr/fract';

import {appLogger} from '../share/logger.js';

(globalThis as unknown as {emitLitDebugLogEvents?: boolean}).emitLitDebugLogEvents = true;
globalThis.addEventListener('lit-debug', (event) => {
  const detail = (event as CustomEvent<LitUnstable.DebugLog.Entry>).detail;
  appLogger.logProperty?.('lit-debug', detail);
});
