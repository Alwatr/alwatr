import {directiveRegistry_, logger} from './lib.js';

const initializedAttribute = '_synapseConnected';

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

  for (const {selector, constructor} of directiveRegistry_) {
    try {
      const uninitializedSelector = `${selector}:not([${initializedAttribute}])`;
      const elements = rootElement.querySelectorAll<HTMLElement>(uninitializedSelector);
      if (elements.length === 0) continue;

      logger.logOther?.(`Found ${elements.length} new element(s) for directive "${selector}"`);
      elements.forEach(element => {
        // Mark the element as processed before creating an instance
        element.setAttribute(initializedAttribute, 'true');
        // Instantiate the directive with the element.
        new constructor(element);
      });
    }
    catch (err) {
      logger.error('bootstrapDirectives', 'directive_instantiation_error', err, {selector});
    }
  }
}
