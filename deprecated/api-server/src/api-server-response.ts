import {createLogger} from '@alwatr/logger';

import {type HttpStatusCode, HttpStatusCodes, HttpStatusMessages} from './const.js';

import type {NanotronClientRequest} from './api-client-request.js';
import type {HttpResponseHeaders, ErrorResponse, NativeServerResponse} from './type.js';
import type {JsonObject} from '@alwatr/type-helper';

/**
 * Configuration options for the Nanotron Api Server Response.
 */
export interface NanotronServerResponseConfig {
  clientRequest: NanotronClientRequest;
}

export class NanotronServerResponse {
  public readonly clientRequest: NanotronClientRequest;

  public readonly raw_: NativeServerResponse;

  public readonly headers: HttpResponseHeaders;

  protected readonly logger_;

  protected hasBeenSent_ = false;
  public get hasBeenSent(): boolean {
    return this.hasBeenSent_;
  }

  constructor(nanotronClientRequest: NanotronClientRequest, nativeServerResponse: NativeServerResponse) {
    // Store public properties.
    this.clientRequest = nanotronClientRequest;
    this.raw_ = nativeServerResponse;

    // Create logger.
    this.logger_ = createLogger(`nt-server-response(${this.clientRequest.remoteAddress})`);
    this.logger_.logMethodArgs?.('new', this.clientRequest.url.debugId);

    // Set default reply headers.
    this.headers = {
      'server': 'Alwatr Nanotron',
      'content-type': 'text/plain charset=UTF-8',
    };

    const crossOrigin = this.clientRequest.routeOption?.crossOrigin;
    if (crossOrigin?.enable === true) {
      this.headers['access-control-allow-origin'] = crossOrigin.origin;
      this.headers['access-control-allow-methods'] = crossOrigin.methods;
      this.headers['access-control-allow-headers'] = crossOrigin.headers;
      this.headers['access-control-max-age'] = crossOrigin.maxAge;
    }
  }

  public get statusCode(): HttpStatusCode {
    return this.raw_.statusCode as HttpStatusCode;
  }

  public set statusCode(value: HttpStatusCode) {
    this.raw_.statusCode = value;
  }

  protected applyHeaders_() {
    this.logger_.logMethodArgs?.('applyHeaders_', this.headers);
    for (const key in this.headers) {
      this.raw_.setHeader(key, this.headers[key as Lowercase<string>]!);
    }
  }

  public replyErrorResponse(errorResponse: ErrorResponse): void {
    this.logger_.logMethod?.('replyErrorResponse');
    this.clientRequest.terminatedHandlers = true;
    this.headers['content-type'] = 'application/json';
    let meta = '';
    if (errorResponse.meta !== undefined) {
      const metaType = typeof errorResponse.meta;
      if (metaType === 'string' || metaType === 'number' || metaType === 'boolean' || errorResponse.meta === null) {
        meta = `,"meta":"${errorResponse.meta}"`;
      } else if (metaType === 'object') {
        meta = `,"meta":${JSON.stringify(errorResponse.meta)}`;
      }
    }
    const responseString = `{"ok":false,"errorCode":"${errorResponse.errorCode}","errorMessage":"${errorResponse.errorMessage}"${meta}}`;
    this.reply(responseString);
  }

  public replyError(error?: Error | string | JsonObject | unknown): void {
    this.logger_.logMethodArgs?.('replyError', {error});

    this.clientRequest.terminatedHandlers = true;
    let statusCode = this.statusCode;

    if (statusCode < HttpStatusCodes.Error_Client_400_Bad_Request) {
      this.statusCode = statusCode = 500;
    }

    if (error instanceof Error) {
      this.replyErrorResponse({
        ok: false,
        errorCode: (error.name === 'Error' ?
          'error_' + statusCode
        : (error.name + '').toLowerCase()) as Lowercase<string>,
        errorMessage: error.message,
      });
    } else if (typeof error === 'string') {
      this.replyErrorResponse({
        ok: false,
        errorCode: ('error_' + statusCode) as Lowercase<string>,
        errorMessage: error,
      });
    } else if (typeof error === 'object' && error !== null) {
      this.replyJson(error as JsonObject);
    } else {
      this.replyErrorResponse({
        ok: false,
        errorCode: ('error_' + statusCode) as Lowercase<string>,
        errorMessage: HttpStatusMessages[statusCode],
      });
    }
  }

  public replyJson(responseJson: JsonObject): void {
    this.logger_.logMethodArgs?.('replyJson', {responseJson});

    let responseString: string;
    try {
      responseString = JSON.stringify(responseJson);
    } catch (error) {
      this.logger_.error('replyJson', 'reply_json_stringify_failed', error, this.clientRequest.url.debugId);
      this.statusCode = HttpStatusCodes.Error_Server_500_Internal_Server_Error;
      this.replyErrorResponse({
        ok: false,
        errorCode: 'reply_json_stringify_failed',
        errorMessage: 'Failed to stringify response JSON.',
      });
      return;
    }

    this.headers['content-type'] = 'application/json';
    this.reply(responseString);
  }

  public reply(context: string | Buffer): void {
    this.logger_.logMethodArgs?.('reply', this.clientRequest.url.debugId);

    if (this.raw_.writableFinished && this.hasBeenSent_ === false) {
      // The response has already been sent by direct access to the server api.
      DEV_MODE && this.logger_.accident('reply', 'server_response_writable_finished_directly');
      this.hasBeenSent_ = true;
    }

    if (this.hasBeenSent_) {
      DEV_MODE
        && this.logger_.accident('reply', 'reply_already_sent', {
          url: this.clientRequest.url.debugId,
          replySent: this.hasBeenSent_,
          writableFinished: this.raw_.writableFinished,
        });
      return;
    }

    this.hasBeenSent_ = true;

    try {
      if (typeof context === 'string') {
        context = Buffer.from(context);
      }

      this.headers['content-length'] = context.byteLength;

      this.applyHeaders_();
      this.raw_.end(context, 'binary');
    } catch (error) {
      this.logger_.error('reply', 'server_response_error', error, this.clientRequest.url.debugId);
      this.hasBeenSent_ = false;
    }
  }
}
