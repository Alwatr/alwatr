import {queueMicrotask} from '@alwatr/delay';
import {createLogger} from '@alwatr/logger';
import type {Directive} from './directive_base_class.js';
import type {DirectiveConstructor} from './type.js';

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
 * @param parent The root element to query within.
 * @param selector The CSS selector string to match elements against.
 * @returns A NodeList of matching elements, or null if the selector is invalid.
 */
export function querySelectorAllSafe_(parent: ParentNode, selector: string): NodeListOf<HTMLElement> | null {
  try {
    return parent.querySelectorAll<HTMLElement>(selector);
  } catch (err) {
    logger.error('querySelectorAllSafe', 'invalid_selector', {selector}, err);
    return null;
  }
}

/**
 * Bootstraps a single directive by finding all elements with the specified attribute and initializing the directive on them.
 *
 * @param name The name of the attribute that identifies the directive.
 * @param constructor The constructor function for the directive to initialize.
 * @param parent The root element to search within.
 */
export function bootstrapNewDirective_(
  name: string,
  constructor: DirectiveConstructor,
  parent: ParentNode = document,
): void {
  const elementList = querySelectorAllSafe_(parent, `[${name}]`);

  if (elementList === null || elementList.length === 0) {
    logger.logOther?.('no_elements_found', {name});
    return;
  }

  const len = elementList.length;
  for (let i = 0; i < len; i++) {
    bootstrapElement(name, constructor, elementList[i]);
  }
}

/**
 * Bootstraps a directive on a specific element by creating an instance of the directive and tracking it in the registry.
 *
 * @param name The name of the directive being bootstrapped.
 * @param constructor The constructor function for the directive to initialize.
 * @param element The DOM element on which to initialize the directive.
 */
export function bootstrapElement(name: string, constructor: DirectiveConstructor, element: HTMLElement): void {
  let initializedDirectives = initializedDirectiveElements_.get(element);
  if (initializedDirectives !== undefined && initializedDirectives.has(name)) {
    logger.logOther?.('bootstrapDirectives', 'directive_already_initialized', {name, element});
    return;
  }

  try {
    const directiveInstance = new constructor(element, name);
    directiveInstance.addDestroyHook(cleanOnDestroy_);
    directiveInstanceRegistry_.add(directiveInstance);
    if (initializedDirectives === undefined) {
      initializedDirectives = new Set();
      initializedDirectiveElements_.set(element, initializedDirectives);
    }
    initializedDirectives.add(name);
  } catch (err) {
    logger.error('bootstrapDirectives', 'directive_instantiation_error', {name, element}, err);
  }
}

/**
 * Cleans up the directive instance when it is destroyed.
 * @param this The directive instance to clean up.
 */
export function cleanOnDestroy_(this: Directive) {
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

// =======

/**
 * Interface representing an object that can be updated by the directive system.
 * This is used for the global batch update mechanism, allowing directives to schedule updates that will be processed together in a single microtask.
 */
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
