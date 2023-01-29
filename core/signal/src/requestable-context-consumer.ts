import {contextConsumer} from './context-consumer.js';
import {requestContext} from './core2.js';

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
   * requestableContextConsumer.requestContext<RequestParamType>('product-list', {foo: 'bar'});
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
     * productListConsumer.requestContext({foo: 'bar'});
     * const newProductList = await productListConsumer.untilChange();
     * ```
     */
    request: requestContext as
      OmitFirstParam<typeof requestContext<TRquest>>,
  } as const),
} as const;
