import {clearDetail, dispatch, getDetail, untilNext, subscribe, unsubscribe} from '@alwatr/signal/core.js';

import type {Stringifyable, OmitFirstParam} from '@alwatr/type';

/**
 * Context provider interface.
 */
export const contextProvider = {
  /**
   * Get context value.
   *
   * Return undefined if context not set before or expired.
   *
   * Example:
   *
   * ```ts
   * const currentProductList = contextProvider.getValue<ProductListType>('product-list');
   * if (currentProductList === undefined) {
   *   // productList not set before or expired.
   * }
   * ```
   */
  getValue: getDetail,

  /**
   * Set context value and send signal to all consumers.
   *
   * Signal detail changed immediately without any debounce.
   *
   * Example:
   *
   * ```ts
   * contextProvider.setValue<ProductListType>('product-list', newProductList);
   * ```
   */
  setValue: dispatch,

  /**
   * Clear current context value without send signal to all consumers.
   *
   * new subscriber options.receivePrevious not work until new signal
   *
   * Example:
   *
   * ```ts
   * contextProvider.expire('product-list');
   * ```
   */
  expire: clearDetail,

  /**
   * Waits until the context value changes.
   *
   * Example:
   *
   * ```ts
   * const newProductList = await contextProvider.untilChange<ProductListType>('product-list');
   * ```
   */
  untilChange: untilNext,

  /**
   * Subscribe to context changes, work like addEventListener.
   *
   * Example:
   *
   * ```ts
   * const listener = contextProvider.subscribe<ProductListType>('product-list', (productList) => {
   *   console.log(productList);
   * });
   * // ...
   * contextProvider.unsubscribe(listener);
   * ```
   */
  subscribe: subscribe,

  /**
   * Unsubscribe from context changes, work like removeEventListener.
   *
   * Example:
   *
   * ```ts
   * const listener = contextProvider.subscribe<ProductListType>('product-list', (productList) => {
   *   console.log(productList);
   * });
   * // ...
   * contextProvider.unsubscribe(listener);
   * ```
   */
  unsubscribe: unsubscribe,
} as const;

/**
 * Context consumer interface.
 */
export const contextConsumer = <T extends Stringifyable>(contextId: string) =>({
  /**
   * Context signal Id.
   */
  id: contextId,

  /**
   * Get context value.
   *
   * Return undefined if context not set before or expired.
   *
   * Example:
   *
   * ```ts
   * const currentProductList = productListConsumer.getValue();
   * if (currentProductList === undefined) {
   *   // productList not set before or expired.
   * }
   * ```
   */
  getValue: getDetail.bind(null, contextId) as OmitFirstParam<typeof getDetail<T>>,

  /**
   * Waits until the context value changes.
   *
   * Example:
   *
   * ```ts
   * const newProductList = await productListConsumer.untilChange();
   * ```
   */
  untilChange: untilNext.bind(null, contextId) as OmitFirstParam<typeof untilNext<T>>,

  /**
   * Subscribe to context changes, work like addEventListener.
   *
   * Example:
   *
   * ```ts
   * const listener = productListConsumer.subscribe((productList) => console.log(productList));
   * // ...
   * productListConsumer.unsubscribe(listener);
   * ```
   */
  subscribe: subscribe.bind(null, contextId) as unknown as
    OmitFirstParam<typeof subscribe<T>>,

  /**
   * Unsubscribe from context changes, work like removeEventListener.
   *
   * Example:
   *
   * ```ts
   * const listener = productListConsumer.subscribe((productList) => console.log(productList));
   * // ...
   * productListConsumer.unsubscribe(listener);
   * ```
   */
  unsubscribe: unsubscribe,
} as const);
