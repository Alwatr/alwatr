import {createLogger} from '@alwatr/logger';
const logger = createLogger('service-worker');

export async function registerServiceWorker(
    path = 'service-worker.js',
    scope = '/',
): Promise<ServiceWorkerRegistration | void> {
  logger.logMethodArgs('registerServiceWorker', {path, scope});

  if (!('serviceWorker' in navigator)) {
    logger.incident('registerServiceWorker', 'sw_unsupported', 'Service worker not supported in this browser');
    return;
  }

  try {
    const swRegistration = await navigator.serviceWorker.register(path);
    swRegistration.addEventListener('updatefound', () => swUpdateFound(swRegistration.installing));
    logger.logOther('Service worker registered');
    return swRegistration;
  }
  catch (err) {
    logger.error('registerServiceWorker', 'sw_reg_fail', 'Service worker registration failed');
  }
}

function swUpdateFound(sw: ServiceWorker | null): void {
  if (sw == null) return;
  logger.logMethod('swUpdateFound');
  sw.addEventListener('statechange', () => swStateChange(sw));
}

function swStateChange(sw: ServiceWorker): void {
  logger.logMethodArgs('swStateChange', sw.state);
  if (sw.state === 'installed') {
    // if old controller available then its update else its new install
    if (navigator.serviceWorker.controller) {
      // send sw-updated signal;
      setTimeout(() => window.location.reload(), 1_000); // temp
    }
  }
  else if (sw.state === 'redundant') {
    logger.accident('swStateChange', 'sw_redundant', 'Service worker redundant');
  }
}
