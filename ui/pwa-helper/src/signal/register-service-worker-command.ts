import {commandHandler, eventTrigger} from '@alwatr/signal';

import {logger} from '../logger.js';

export type Options = {
  /**
   * Service worker path
   *
   * @default 'service-worker.js'
   */
  path?: string,

  /**
   * Service worker scope
   *
   * @default '/'
   */
  scope?: string,
}

commandHandler.define<Options, boolean>('register_service_worker_command', async (options = {}) => {
  options.path ??= 'service-worker.js';
  options.scope ??= '/';
  logger.logMethodArgs?.('registerServiceWorker', options);

  if (!('serviceWorker' in navigator)) {
    logger.incident?.('registerServiceWorker', 'sw_unsupported', 'Service worker not supported in this browser');
    return false;
  }

  try {
    const swRegistration = await navigator.serviceWorker.register(options.path);
    swRegistration.addEventListener('updatefound', () => swUpdateFound(swRegistration.installing));
    logger.logOther?.('Service worker registered');
    eventTrigger.dispatch('service_worker_registered', null);
  }
  catch (err) {
    logger.error('registerServiceWorker', 'sw_reg_fail', 'Service worker registration failed');
    eventTrigger.dispatch('service_worker_register_failed', null);
    return false;
  }

  return true;
});

function swUpdateFound(sw: ServiceWorker | null): void {
  if (sw == null) return;
  logger.logMethod?.('swUpdateFound');
  sw.addEventListener('statechange', () => swStateChange(sw));
}

function swStateChange(sw: ServiceWorker): void {
  logger.logMethodArgs?.('swStateChange', sw.state);
  if (sw.state === 'installed') {
    // if old controller available then its update else its new install
    if (navigator.serviceWorker.controller) {
      // send sw-updated signal;
      eventTrigger.dispatch('service_worker_updated', null);
    }
    else {
      eventTrigger.dispatch('service_worker_installed', null);
    }
  }
  else if (sw.state === 'redundant') {
    logger.accident('swStateChange', 'sw_redundant', 'Service worker redundant');
  }
}
