import {contextConsumer} from './context-consumer.js';
import {getDetail, requestContext} from './core.js';
import {RequestableContext} from './type.js';

import type {Stringifyable, OmitFirstParam} from '@alwatr/type';

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
   * TODO: update me
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
  bind: <TContextContent extends Stringifyable, TRquest extends Stringifyable = null>(contextId: string) =>({
    ...contextConsumer.bind<RequestableContext<TContextContent>>(contextId),

    /**
     * Get context value.
     *
     * Example:
     *
     * ```ts
     * const currentProductList = productListConsumer.getValue();
     * TODO: update me
     * ```
     */
    getValue: (): RequestableContext<TContextContent> =>
      getDetail<RequestableContext<TContextContent>>(contextId) ?? {state: 'initial'},

    /**
     * Send new context request to the provider.
     *
     * Example:
     *
     * ```ts
     * productListConsumer.request({foo: 'bar'});
     * TODO: update me
     * ```
     */
    request: requestContext.bind(null, contextId) as
      OmitFirstParam<typeof requestContext<TRquest>>,
  } as const),
} as const;
