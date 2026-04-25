import {createLogger} from '@alwatr/logger';

import {NanotronServerResponse} from './api-server-response.js';
import {HttpStatusCodes} from './const.js';

import type {DefineRouteOption, HttpRequestHeaders, NativeClientRequest, NativeServerResponse} from './type.js';
import type {NanotronUrl} from './url.js';
import type {DictionaryOpt} from '@alwatr/type-helper';

export class NanotronClientRequest<TSharedMeta extends DictionaryOpt = DictionaryOpt> {
  public readonly url: NanotronUrl;

  public readonly serverResponse: NanotronServerResponse;

  public readonly routeOption: Required<DefineRouteOption> | null;

  /**
   * A flag to indicate if the running handlers queue has been terminated.
   * This can occur due to an error being thrown or by explicitly calling the `replyError` method.
   *
   * When `terminatedHandlers` is set to `true`, it signifies that the execution of the current
   * sequence of handlers (including pre, main, and post handlers) has been halted and no further
   * handlers in the queue will be executed.
   *
   * Usage:
   * - Check this flag to determine if the handlers queue has been interrupted.
   * - Set this flag to `true` to manually stop the execution of subsequent handlers.
   */
  public terminatedHandlers?: true;

  public readonly sharedMeta: TSharedMeta = {} as TSharedMeta;

  public readonly raw_: NativeClientRequest;

  protected readonly logger_;

  public readonly remoteAddress: string | null;

  public get headers(): HttpRequestHeaders {
    return this.raw_.headers;
  }

  private queryParams__?: DictionaryOpt<string>;
  public get queryParams(): DictionaryOpt<string> {
    if (this.queryParams__ === undefined) {
      this.queryParams__ = {};
      for (const [key, value] of this.url.searchParams.entries()) {
        this.queryParams__[key] = value;
      }
    }
    return this.queryParams__;
  }

  constructor(
    url: NanotronUrl,
    nativeClientRequest: NativeClientRequest,
    nativeServerResponse: NativeServerResponse,
    routeOption: Required<DefineRouteOption> | null,
  ) {
    // Store public properties.
    this.raw_ = nativeClientRequest;
    this.url = url;
    this.routeOption = routeOption;

    // Get and store remote address.
    this.remoteAddress = this.getRemoteAddress__();

    // Create logger.
    this.logger_ = createLogger(`nt-client-request(${this.remoteAddress})`);
    this.logger_.logMethodArgs?.('new', url.debugId);

    // Create server response.
    this.serverResponse = new NanotronServerResponse(this, nativeServerResponse);
  }

  public getBodyRaw(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      // method must be POST or PUT or PATCH
      const method = this.url.method;
      if (!(method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        this.serverResponse.headers.connection = 'close';
        this.serverResponse.statusCode = HttpStatusCodes.Error_Client_405_Method_Not_Allowed;
        return reject(new Error('body_not_allowed'));
      }

      const contentLength = +this.raw_.headers['content-length']!;

      if (Number.isNaN(contentLength) || contentLength === 0) {
        this.serverResponse.headers.connection = 'close';
        this.serverResponse.statusCode = HttpStatusCodes.Error_Client_411_Length_Required;
        return reject(new Error('body_length_required'));
      }

      if (contentLength > this.routeOption!.bodyLimit) {
        // TODO: routeOption when null?!
        this.serverResponse.headers.connection = 'close';
        this.serverResponse.statusCode = HttpStatusCodes.Error_Client_413_Payload_Too_Large;
        return reject(new Error('body_too_large'));
      }

      const dataChunks: Uint8Array[] = [];
      let receivedLength = 0;

      const onData = (chunk: Uint8Array) => {
        receivedLength += chunk.length;
        dataChunks.push(chunk);

        if (receivedLength > this.routeOption!.bodyLimit) {
          this.raw_.removeListener('data', onData);
          this.raw_.removeListener('end', onEnd);
          this.raw_.removeListener('error', onEnd);
          dataChunks.length = 0; // free memory
          this.serverResponse.headers.connection = 'close';
          this.serverResponse.statusCode = HttpStatusCodes.Error_Client_413_Payload_Too_Large;
          return reject(new Error('body_too_large'));
        }
      };

      const onEnd = (err?: Error) => {
        this.raw_.removeListener('data', onData);
        this.raw_.removeListener('end', onEnd);
        this.raw_.removeListener('error', onEnd);

        if (err !== undefined) {
          dataChunks.length = 0; // free memory
          this.serverResponse.statusCode = HttpStatusCodes.Error_Client_400_Bad_Request;
          return reject(err);
        }

        if (receivedLength !== contentLength) {
          dataChunks.length = 0; // free memory
          this.serverResponse.statusCode = HttpStatusCodes.Error_Client_413_Payload_Too_Large;
          return reject(new Error('body_too_large'));
        }

        const body = Buffer.concat(dataChunks);

        resolve(body);
      };

      this.raw_.on('data', onData);
      this.raw_.on('end', onEnd);
      this.raw_.on('error', onEnd);
      this.raw_.resume();
    });
  }

  private getRemoteAddress__(): string | null {
    return this.raw_.headers['x-forwarded-for']?.split(',').pop()?.trim() || this.raw_.socket.remoteAddress || null;
  }
}
