import {Stringifyable, OmitFirstParam} from '@alwatr/type';

import {contextConsumer} from './context-consumer.js';
import {signalManager} from './signal-manager.js';

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
  request: signalManager.requestContext,

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
    request: signalManager.requestContext as
      OmitFirstParam<typeof signalManager.requestContext<TRquest>>,
  } as const),
} as const;
