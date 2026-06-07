import type {Awaitable} from '@alwatr/type-helper';
import type {Directive} from './directive_base_class.js';

export type ListenerCallback<T> = (value: T) => Awaitable<void>;

export interface SubscribeResult {
  unsubscribe: () => void;
}

export interface Subscribable<T, O> {
  subscribe(callback: ListenerCallback<T>, options?: O): SubscribeResult;
}

/**
 * Type definition for a directive constructor.
 * A directive class must have a constructor that accepts an HTMLElement.
 */
export type DirectiveConstructor<T extends Directive = Directive> = new (
  element: HTMLElement,
  attributeName: string,
) => T;

/**
 * Lazy registration function for a directive. When called, it registers the directive and optionally bootstraps it on the page.
 *
 * @param autoBootstrap If true (default), the directive will be automatically bootstrapped on the page immediately after registration. If false, the consumer must call `bootstrapDirectives()` manually to initialize the directive on the page.
 * @param bootstrapRoot An optional root element to limit the scope of directive initialization. If not provided, it defaults to `document`, meaning the directive will be initialized across the entire document.
 */
export type RegisterDirectiveFunction = (autoBootstrap: boolean, bootstrapRoot?: HTMLElement | Document) => void;
