import {Stringifyable, OmitFirstParam} from '@alwatr/type';

import {signalManager} from './signal-manager.js';

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
  getValue: signalManager.getDetail,

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
  setValue: signalManager.dispatch,

  /**
   * Clear current context value without send signal to all consumers.
   *
   * new subscriber options.receivePrevious not work until new signal
   *
   * Example:
   *
   * ```ts
   * signalManager.expire('product-list');
   * ```
   */
  expire: signalManager.clearDetail,

  /**
   * Bind this interface to special context.
   *
   * Example:
   *
   * ```ts
   * const productListProvider = contextProvider.bind<ProductListType>('product-list');
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
     * const currentProductList = productListProvider.getValue();
     * if (currentProductList === undefined) {
     *   // productList not set before or expired.
     * }
     * ```
     */
    getValue: signalManager.getDetail.bind(null, contextId) as OmitFirstParam<typeof signalManager.getDetail<T>>,

    /**
     * Set context value and send signal to all consumers.
     *
     * Signal detail changed immediately without any debounce.
     *
     * Example:
     *
     * ```ts
     * productListProvider.setValue(newProductList);
     * ```
     */
    setValue: signalManager.dispatch.bind(null, contextId) as OmitFirstParam<typeof signalManager.dispatch<T>>,

    /**
     * Clear current context value without send signal to all consumers.
     *
     * new subscriber options.receivePrevious not work until new signal
     *
     * Example:
     *
     * ```ts
     * productListProvider.expire();
     * ```
     */
    expire: signalManager.clearDetail.bind(null, contextId),
  }),
} as const;
