import {contextConsumer} from './context-consumer.js';
import {requestContext} from './core.js';

import type{Stringifyable, OmitFirstParam} from '@alwatr/type';

/**
 * Requestable context consumer interface.
 */
export const requestableContextConsumer = {
  ...contextConsumer,

  /**
   * Send new context request to the provider.
   *
   * Example:
   *
   * ```ts
   * requestableContextConsumer.request<RequestParamType>('product-list', {foo: 'bar'});
   * const newProductList = await requestableContextConsumer.untilChange<ProductListType>('product-list');
   * ```
   */
  request: requestContext,

  /**
   * Bind this interface to special context.
   *
   * Example:
   *
   * ```ts
   * const productListConsumer = requestableContextConsumer.bind<ProductListType>('product-list');
   * ```
   */
  bind: <TContext extends Stringifyable, TRquest extends Stringifyable>(contextId: string) =>({
    ...contextConsumer.bind<TContext>(contextId),

    /**
     * Send new context request to the provider.
     *
     * Example:
     *
     * ```ts
     * productListConsumer.request({foo: 'bar'});
     * const newProductList = await productListConsumer.untilChange();
     * ```
     */
    request: requestContext.bind(null, contextId) as
      OmitFirstParam<typeof requestContext<TRquest>>,
  } as const),
} as const;
