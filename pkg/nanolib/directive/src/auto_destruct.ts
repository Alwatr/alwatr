import {directiveInstanceRegistry_, logger} from './lib.js';

export function autoDestructDirectives(): void {
  logger.logMethod?.('autoDestructDirectives');
  for (const directiveInstance of directiveInstanceRegistry_) {
    if (directiveInstance.autoDestroy()) {
      directiveInstanceRegistry_.delete(directiveInstance);
    }
  }
}
