import {createLogger} from '@alwatr/logger';

/**
 * Alwatr Synapse Logger.
 */
export const logger = createLogger('alwatr/synapse');

/**
 * Type definition for a directive constructor.
 * A directive class must have a constructor that accepts an HTMLElement.
 */
export type DirectiveConstructor = new (element: HTMLElement) => unknown;

/**
 * The registry for all directives.
 * Maps a CSS selector string to a directive constructor.
 *
 * @internal
 */
const directiveRegistry = new Map<string, DirectiveConstructor>();

/**
 * A WeakMap to track which directives have been initialized on which elements.
 * This prevents re-initializing a directive on the same element.
 *
 * @internal
 */
const initializedElements = new WeakMap<Element, Set<DirectiveConstructor>>();

/**
 * A class decorator that registers a class as a directive.
 *
 * @param selector The CSS selector to which this directive will be attached.
 *
 * @example
 * ```ts
 * @directive('.my-button')
 * class MyButtonDirective {
 *   constructor(element: HTMLElement) {
 *     element.addEventListener('click', () => console.log('Button clicked!'));
 *   }
 * }
 * ```
 */
export function directive(selector: string) {
  logger.logMethodArgs?.('directive', {selector});
  /**
   * The decorator function that receives the class constructor.
   * @param constructor The class to be registered as a directive.
   */
  return function (constructor: DirectiveConstructor): void {
    if (directiveRegistry.has(selector)) {
      logger.accident('directive', 'duplicate_directive_selector', {selector});
    }
    directiveRegistry.set(selector, constructor);
  };
}

/**
 * Initializes all registered directives within a given root element.
 * If no root element is provided, it scans the entire document.
 *
 * This function is idempotent; it will not re-initialize a directive on an element
 * that has already been processed.
 *
 * @param rootElement The element to scan for directives. Defaults to `document`.
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

 * bootstrapDirectives(newContent);
 * ```
 */
export function bootstrapDirectives(rootElement: Element | Document = document): void {
  const rootNodeName = rootElement.nodeName;
  logger.logMethodArgs?.('bootstrapDirectives', {root: rootNodeName});

  for (const [selector, constructor] of directiveRegistry.entries()) {
    logger.logMethodArgs?.('bootstrapDirectives.loop', {selector});
    try {
      const elements = rootElement.querySelectorAll<HTMLElement>(selector);

      for (const element of Array.from(elements)) {
        let initializedConstructors = initializedElements.get(element);

        if (initializedConstructors?.has(constructor)) {
          // Already initialized, skip.
          logger.logMethodArgs?.('bootstrapDirectives.skip', {element: element.tagName, selector});
          continue;
        }

        // Instantiate the directive with the element.
        logger.logMethodArgs?.('bootstrapDirectives.instantiate', {element: element.tagName, selector});
        new constructor(element);

        // Mark it as initialized.
        if (!initializedConstructors) {
          initializedConstructors = new Set();
          initializedElements.set(element, initializedConstructors);
        }
        initializedConstructors.add(constructor);
      }
    }
    catch (err) {
      if (err instanceof DOMException) {
        logger.error('bootstrapDirectives', 'invalid_selector', {selector, error: err.message});
      }
      else {
        logger.error('bootstrapDirectives', 'unknown_error', {selector, err});
      }
    }
  }
}
