import {createLogger} from '@alwatr/logger';

import type {DirectiveConstructor} from './directive-decorator.js';
import type {Directive} from './directive-class.js';

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
