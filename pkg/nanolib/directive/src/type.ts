import type {Awaitable} from '@alwatr/type-helper';

export type ListenerCallback<T> = (value: T) => Awaitable<void>;

export interface SubscribeResult {
  unsubscribe: () => void;
}

export interface Subscribable<T, O> {
  subscribe(callback: ListenerCallback<T>, options?: O): SubscribeResult;
}
