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
