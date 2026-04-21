import {directiveInstanceRegistry_, directiveRegistry_, initializedDirectiveElements_, logger} from './lib.js';
import type {Directive} from './directive-class.js';

/**
 * Initializes all registered directives within a given root element.
 * If no root element is provided, it scans the entire body.
 *
 * This function is idempotent; it will not re-initialize a directive on an element
 * that has already been processed.
 *
 * @param rootElement The element to scan for directives. Defaults to `document.body`.
 *
 * @example
 * ```ts
 * // Initialize directives on the whole page after the DOM is loaded.
 * document.addEventListener('DOMContentLoaded', () => bootstrapDirectives());
 *
 * // Or, initialize directives on a dynamically added part of the page.
 * const newContent = document.createElement('div');
 * newContent.innerHTML = '<div class="my-button">Click Me</div>';
 * document.body.appendChild(newContent);
 *
 * bootstrapDirectives(newContent);
 * ```
 */
export function bootstrapDirectives(rootElement: Element | Document = document.body): void {
  logger.logMethod?.('bootstrapDirectives');

  if (document.readyState === 'loading') {
    logger.incident?.('bootstrapDirectives', 'dom_not_ready', 'Delaying directive initialization until DOM is ready');
    document.addEventListener('DOMContentLoaded', () => bootstrapDirectives(rootElement), {once: true});
    return;
  }

  for (const [attributeName, constructor] of directiveRegistry_) {
    try {
      const elementList = rootElement.querySelectorAll<HTMLElement>(`[${attributeName}]`);

      if (elementList.length === 0) {
        logger.logOther?.('no_elements_found', {attributeName});
        continue;
      }

      for (const element of elementList) {
        let initializedDirectives = initializedDirectiveElements_.get(element);

        if (initializedDirectives?.has(attributeName)) {
          logger.logOther?.('bootstrapDirectives', 'directive_already_initialized', {attributeName, element});
          continue;
        }

        if (!initializedDirectives) {
          initializedDirectives = new Set([attributeName]);
          initializedDirectiveElements_.set(element, initializedDirectives);
        }

        try {
          const directiveInstance = new constructor(element, attributeName);
          initializedDirectives.add(attributeName);
          directiveInstance.addDestroyHook(cleanOnDestroy);
          directiveInstanceRegistry_.add(directiveInstance);
        } catch (err) {
          logger.error('bootstrapDirectives', 'directive_instantiation_error', {attributeName, element}, err);
        }
      }
    } catch (err) {
      logger.error('bootstrapDirectives', 'bootstrap_error', err, {attributeName});
    }
  }
}

/**
 * Cleans up the directive instance when it is destroyed.
 * @param this The directive instance to clean up.
 */
function cleanOnDestroy(this: Directive) {
  this.logger_.logMethod?.('cleanOnDestroy');
  directiveInstanceRegistry_.delete(this);

  const initializedDirectives = initializedDirectiveElements_.get(this.element_);
  if (initializedDirectives) {
    initializedDirectives.delete(this.attributeName);
    if (initializedDirectives.size === 0) {
      initializedDirectiveElements_.delete(this.element_);
    }
  }
}
