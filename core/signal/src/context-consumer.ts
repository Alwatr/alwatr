import {Stringifyable, OmitFirstParam} from '@alwatr/type';

import {signalManager} from './signal-manager.js';

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
  getValue: signalManager.getDetail,

  /**
   * Waits until the context value changes.
   *
   * Example:
   *
   * ```ts
   * const newProductList = await contextConsumer.untilChange<ProductListType>('product-list');
   * ```
   */
  untilChange: signalManager.untilNext,

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
  subscribe: signalManager.subscribe,

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
  unsubscribe: signalManager.unsubscribe,

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
     * Event signal Id.
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
    getValue: signalManager.getDetail.bind(null, contextId) as OmitFirstParam<typeof signalManager.getDetail<T>>,

    /**
     * Waits until the context value changes.
     *
     * Example:
     *
     * ```ts
     * const newProductList = await productListConsumer.untilChange();
     * ```
     */
    untilChange: signalManager.untilNext.bind(null, contextId) as OmitFirstParam<typeof signalManager.untilNext<T>>,

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
    subscribe: signalManager.subscribe.bind(null, contextId) as unknown as
      OmitFirstParam<typeof signalManager.subscribe<T>>,

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
    unsubscribe: signalManager.unsubscribe,
  }),
} as const;
