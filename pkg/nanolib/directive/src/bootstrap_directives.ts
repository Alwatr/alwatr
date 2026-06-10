import {bootstrapNewDirective_, directiveRegistry_, logger} from './lib.js';

/**
 * Initializes all registered directives within a given root element.
 * If no root element is provided, it scans the entire body.
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
 *
 * bootstrapDirectives(newContent);
 * ```
 */
export function bootstrapDirectives(rootElement?: ParentNode): void {
  DEV_MODE && logger.logMethod?.('bootstrapDirectives');
  if (typeof document === 'undefined') return;
  if (document.readyState === 'loading') {
    DEV_MODE
      && logger.incident?.(
        'bootstrapDirectives',
        'dom_not_ready',
        'Delaying directive initialization until DOM is ready',
      );
    document.addEventListener('DOMContentLoaded', () => bootstrapDirectives(rootElement), {once: true});
    return;
  }

  directiveRegistry_.forEach((constructor, attributeName) => {
    bootstrapNewDirective_(attributeName, constructor, rootElement);
  });
}
