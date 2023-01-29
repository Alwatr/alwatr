import {getDetail, subscribe, unsubscribe, untilNext} from './core2.js';

import type {Stringifyable, OmitFirstParam} from '@alwatr/type';

/**
 * Context consumer interface.
 */
export const contextConsumer = {
  /**
   * Get context value.
   *
   * Return undefined if context not set before or expired.
   *
   * Example:
   *
   * ```ts
   * const currentProductList = contextConsumer.getValue<ProductListType>('product-list');
   * if (currentProductList === undefined) {
   *   // productList not set before or expired.
   * }
   * ```
   */
  getValue: getDetail,

  /**
   * Waits until the context value changes.
   *
   * Example:
   *
   * ```ts
   * const newProductList = await contextConsumer.untilChange<ProductListType>('product-list');
   * ```
   */
  untilChange: untilNext,

  /**
   * Subscribe to context changes, work like addEventListener.
   *
   * Example:
   *
   * ```ts
   * const listener = contextConsumer.subscribe<ProductListType>('product-list', (productList) => {
   *   console.log(productList);
   * });
   * // ...
   * contextConsumer.unsubscribe(listener);
   * ```
   */
  subscribe: subscribe,

  /**
   * Unsubscribe from context changes, work like removeEventListener.
   *
   * Example:
   *
   * ```ts
   * const listener = contextConsumer.subscribe<ProductListType>('product-list', (productList) => {
   *   console.log(productList);
   * });
   * // ...
   * contextConsumer.unsubscribe(listener);
   * ```
   */
  unsubscribe: unsubscribe,

  /**
   * Bind this interface to special context.
   *
   * Example:
   *
   * ```ts
   * const productListConsumer = contextConsumer.bind<ProductListType>('product-list');
   * ```
   */
  bind: <T extends Stringifyable>(contextId: string) =>({
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
  } as const),
} as const;
