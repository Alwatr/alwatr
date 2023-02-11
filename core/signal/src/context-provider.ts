import {clearDetail, dispatch, getDetail, untilNext} from './core.js';

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
     * const currentProductList = productListProvider.getValue();
     * if (currentProductList === undefined) {
     *   // productList not set before or expired.
     * }
     * ```
     */
    getValue: getDetail.bind(null, contextId) as OmitFirstParam<typeof getDetail<T>>,

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
    setValue: dispatch.bind(null, contextId) as OmitFirstParam<typeof dispatch<T>>,

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
    expire: clearDetail.bind(null, contextId),

    /**
     * Waits until the context value changes.
     *
     * Example:
     *
     * ```ts
     * const newProductList = await productListProvider.untilChange();
     * ```
     */
    untilChange: untilNext.bind(null, contextId) as OmitFirstParam<typeof untilNext<T>>,
  } as const),
} as const;
