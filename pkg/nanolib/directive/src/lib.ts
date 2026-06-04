import {queueMicrotask} from '@alwatr/delay';
import {createLogger} from '@alwatr/logger';

import type {DirectiveConstructor} from './decorator_directive.js';
import type {Directive} from './directive_base_class.js';

/**
 * Alwatr Directive System Logger
 */
export const logger = createLogger('alwatr/directive');

/**
 * A Map to store registered directives.
 * The key is the directive name (e.g., 'my-button'), and the value is the constructor class for that directive.
 * This registry is populated by the `@Directive` decorator when directives are defined.
 * The `bootstrapDirectives` function uses this registry to find and initialize directives on the page.
 */
export const directiveRegistry_ = new Map<string, DirectiveConstructor>();

/**
 * A WeakMap to track which directives have been initialized on which elements.
 * The key is the DOM element, and the value is a Set of directive names that have been initialized on that element.
 * This allows us to prevent multiple initializations of the same directive on the same element, and also to clean up the tracking when elements are destroyed.
 * The `bootstrapDirectives` function updates this WeakMap as it initializes directives, and checks it to avoid re-initialization.
 */
export const initializedDirectiveElements_ = new WeakMap<Element, Set<string>>();

/**
 * A Set to keep track of all directive instances that have been created.
 */
export const directiveInstanceRegistry_ = new Set<Directive>();

/**
 * A FinalizationRegistry to monitor when directive instances are garbage collected.
 */
export const finalizationRegistry =
  typeof FinalizationRegistry !== 'undefined' ?
    new FinalizationRegistry((heldValue) => {
      logger.logOther?.(`Directive ${heldValue} has been garbage collected successfully.`);
    })
  : null;

/**
 * Safely queries the DOM for elements matching the specified selector, while handling potential errors from invalid selectors.
 * If the selector is invalid, it logs an error and returns null instead of throwing an exception.
 *
 * @param root The root element to query within.
 * @param selector The CSS selector string to match elements against.
 * @returns A NodeList of matching elements, or null if the selector is invalid.
 */
export function querySelectorAllSafe_(root: HTMLElement, selector: string): NodeListOf<HTMLElement> | null {
  try {
    return root.querySelectorAll<HTMLElement>(selector);
  } catch (err) {
    logger.error('querySelectorAllSafe', 'invalid_selector', {selector}, err);
    return null;
  }
}

interface Updatable {
  performUpdate_(): void;
}

/**
 * Global Batcher Queue for headless directives.
 * Uses a unique Set to ensure a directive is only queued EXACTLY ONCE per animation frame/tick.
 */
const updateQueue__ = new Set<Updatable>();
let isBatchScheduled__ = false;

/**
 * Flushes all pending directive updates synchronously inside a single microtask frame.
 */
function flushQueue__(): void {
  const currentBatch = Array.from(updateQueue__);
  updateQueue__.clear();
  isBatchScheduled__ = false;

  for (let i = 0; i < currentBatch.length; i++) {
    // Explicit call to execute the update loop immediately
    try {
      currentBatch[i].performUpdate_();
    } catch (err) {
      queueMicrotask(() => {
        throw err; // Re-throw asynchronously to avoid disrupting the current batch loop
      });
    }
  }
}

/**
 * Schedules a directive to be rendered during the upcoming centralized microtask flush.
 */
export function queueRender(target: Updatable): void {
  updateQueue__.add(target);

  if (isBatchScheduled__ === false) {
    isBatchScheduled__ = true;
    queueMicrotask(flushQueue__);
  }
}
