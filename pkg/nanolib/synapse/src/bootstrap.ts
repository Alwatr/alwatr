import {directiveInstanceRegistry_, directiveRegistry_, initializedDirectives_, logger} from './lib.js';
import type {DirectiveBase} from './directive-class.js';

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
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        bootstrapDirectives(rootElement);
      },
      {once: true},
    );
    return;
  }

  for (const [selector, constructor] of directiveRegistry_) {
    try {
      const elementList = rootElement.querySelectorAll<HTMLElement>(selector);
      if (elementList.length === 0) {
        logger.logOther?.('no_elements_found', {selector});
        continue;
      }

      for (const element of elementList) {
        let alreadyInitializedSelector = initializedDirectives_.get(element);

        if (alreadyInitializedSelector?.has(selector)) {
          logger.incident?.('bootstrapDirectives', 'directive_already_initialized', {selector, element});
          continue;
        }

        if (!alreadyInitializedSelector) {
          alreadyInitializedSelector = new Set([selector]);
          initializedDirectives_.set(element, alreadyInitializedSelector);
        }

        try {
          const directiveInstance = new constructor(element, selector);
          alreadyInitializedSelector.add(selector);
          directiveInstance.onDestroy(cleanOnDestroy);
          directiveInstanceRegistry_.add(directiveInstance);
        } catch (err) {
          logger.error('bootstrapDirectives', 'directive_instantiation_error', {selector, element}, err);
        }
      }
    } catch (err) {
      logger.error('bootstrapDirectives', 'directive_instantiation_error', err, {selector});
    }
  }
}

/**
 * Cleans up the directive instance when it is destroyed.
 * @param this The directive instance to clean up.
 */
function cleanOnDestroy(this: DirectiveBase) {
  this.logger_.logMethod?.('cleanOnDestroy');
  const alreadyInitializedSelector = initializedDirectives_.get(this.element_);
  if (alreadyInitializedSelector) {
    alreadyInitializedSelector.delete(this.selector_);
    if (alreadyInitializedSelector.size === 0) {
      initializedDirectives_.delete(this.element_);
    }
  }
}
