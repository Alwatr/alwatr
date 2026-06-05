import {directiveInstanceRegistry_, logger} from './lib.js';

/**
 * Automatically destroys directive instances that are no longer needed.
 * This function should be called periodically (e.g., on a timer or during certain lifecycle events)
 * to clean up directive instances that are no longer attached to the DOM.
 * It checks each directive instance in the registry and calls its `autoDestroy` method.
 */
export function autoDestructDirectives(): void {
  logger.logMethod?.('autoDestructDirectives');
  for (const directiveInstance of directiveInstanceRegistry_) {
    if (directiveInstance.autoDestroy()) {
      directiveInstanceRegistry_.delete(directiveInstance);
    }
  }
}
