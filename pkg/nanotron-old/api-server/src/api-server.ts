import {createServer} from 'node:http';

import {createLogger} from '@alwatr/logger';

import {NanotronClientRequest} from './api-client-request.js';
import {HttpStatusCodes, HttpStatusMessages} from './const.js';
import {NanotronUrl} from './url.js';

import type {DefineRouteOption, MatchType, NativeClientRequest, NativeServerResponse} from './type.js';
import type {Duplex} from 'node:stream';
import type {DictionaryOpt} from '@alwatr/type-helper';

/**
 * Configuration options for the NanotronApiServer.
 */
export interface NanotronApiServerConfig {
  /**
   * The port number to listen on.
   *
   * @default 80
   */
  port?: number;

  /**
   * The hostname to listen on.
   *
   * @default '0.0.0.0'
   */
  host?: string;

  /**
   * Sets the timeout (ms) for receiving the entire request from the client.
   *
   * @default 10_000 ms
   */
  requestTimeout?: number;

  /**
   * Sets the timeout (ms) for receiving the complete HTTP headers from the client.
   *
   * This should be bigger than `keepAliveTimeout + your server's expected response time`.
   *
   * @default 130_000 ms
   */
  headersTimeout?: number;

  /**
   * Sets the timeout (ms) for receiving the complete HTTP headers from the client.
   *
   * @default 120_000 ms
   */
  keepAliveTimeout?: number;

  /**
   * Add /health route.
   *
   * @default true
   */
  healthRoute?: boolean;

  /**
   * Add OPTIONS route for preflight requests to allow access origins.
   *
   * @default {enable: false, origin: '*', methods: '*', headers: '*', maxAge: 86_400}
   */
  crossOrigin?: {
    enable: boolean;
    origin: string;
    methods: string;
    headers: string;
    maxAge: string | number;
  };

  /**
   * A prefix to be added to the beginning of the `url` of all defined routes.
   *
   * @default '/api/'
   */
  prefix?: `/${string}/` | '/';

  /**
   * The maximum size of the request body in bytes.
   *
   * @default `1_048_576` (1MiB)
   */
  bodyLimit?: number;
}

export class NanotronApiServer {
  protected static readonly defaultConfig_: Readonly<Required<NanotronApiServerConfig>> = {
    host: '0.0.0.0',
    port: 80,
    requestTimeout: 10_000,
    headersTimeout: 130_000,
    keepAliveTimeout: 120_000,
    healthRoute: true,
    crossOrigin: {
      enable: false,
      origin: '*',
      methods: '*',
      headers: '*',
      maxAge: 86_400, // 24h
    },
    prefix: '/api/',
    bodyLimit: 1_048_576, // 1MiB
  };

  public readonly config_: Required<NanotronApiServerConfig>;
  protected readonly logger_;

  public readonly httpServer;

  protected readonly routeHandlerList__: Record<MatchType, DictionaryOpt<DictionaryOpt<Required<DefineRouteOption>>>>;

  constructor(config?: Partial<NanotronApiServerConfig>) {
    // Merge the config with the default config.
    this.config_ = {
      ...NanotronApiServer.defaultConfig_,
      ...config,
    };

    // Create logger.
    this.logger_ = createLogger('nt-api-server' + (this.config_.port !== 80 ? ':' + this.config_.port : ''));
    this.logger_.logMethodArgs?.('new', {config: this.config_});

    // Bind methods.
    this.handleClientRequest_ = this.handleClientRequest_.bind(this);
    this.handleServerError_ = this.handleServerError_.bind(this);
    this.handleClientError_ = this.handleClientError_.bind(this);

    // Initialize route handler list.
    this.routeHandlerList__ = {
      exact: {},
      startsWith: {},
    };

    // Create the HTTP server.
    this.httpServer = createServer(
      {
        keepAlive: true,
        keepAliveInitialDelay: 0,
        noDelay: true,
      },
      this.handleClientRequest_,
    );

    // Configure the server.
    this.httpServer.requestTimeout = this.config_.requestTimeout;
    this.httpServer.keepAliveTimeout = this.config_.keepAliveTimeout;
    this.httpServer.headersTimeout = this.config_.headersTimeout;

    // Start the server.
    this.httpServer.listen(this.config_.port, this.config_.host, () => {
      this.logger_.logOther?.(`listening on ${this.config_.host}:${this.config_.port}`);
    });

    // Handle server errors.
    this.httpServer.on('error', this.handleServerError_);
    this.httpServer.on('clientError', this.handleClientError_);

    this.defineCorsRoute_();

    if (this.config_.healthRoute) {
      this.defineHealthRoute_();
    }
  }

  public close(): void {
    this.logger_.logMethod?.('close');
    this.httpServer.close();
  }

  protected getRouteOption_(url: NanotronUrl): Required<DefineRouteOption> | null {
    this.logger_.logMethod?.('getRouteOption_');

    if (
      Object.hasOwn(this.routeHandlerList__.exact, url.method)
      && Object.hasOwn(this.routeHandlerList__.exact[url.method]!, url.pathname)
    ) {
      return this.routeHandlerList__.exact[url.method]![url.pathname]!;
    }

    if (Object.hasOwn(this.routeHandlerList__.startsWith, url.method)) {
      const routeList = this.routeHandlerList__.startsWith[url.method];
      for (const pathname in routeList) {
        if (url.pathname.indexOf(pathname) === 0) {
          return routeList[pathname]!;
        }
      }
    }

    this.logger_.incident?.('getRouteOption_', 'route_not_found', {method: url.method, url: url.pathname});
    return null;
  }

  protected setRouteOption_(option: Required<DefineRouteOption>): void {
    this.logger_.logMethodArgs?.('setRouteOption_', option);

    const routeHandlerList = this.routeHandlerList__[option.matchType];

    routeHandlerList[option.method] ??= {};

    if (Object.hasOwn(routeHandlerList[option.method]!, option.url)) {
      this.logger_.error('defineRoute', 'route_already_exists', option);
      throw new Error('route_already_exists');
    }

    routeHandlerList[option.method]![option.url] = option;
  }

  public defineRoute<TSharedMeta extends DictionaryOpt<any> = DictionaryOpt<any>>(
    option: DefineRouteOption<TSharedMeta>,
  ): void {
    const option_: Required<DefineRouteOption<TSharedMeta>> = {
      matchType: 'exact',
      preHandlers: [],
      postHandlers: [],
      bodyLimit: this.config_.bodyLimit,
      crossOrigin: this.config_.crossOrigin,
      ...option,
    };
    this.logger_.logMethodArgs?.('defineRoute', option_);
    this.setRouteOption_(option_ as Required<DefineRouteOption>);
  }

  protected handleServerError_(error: NodeJS.ErrnoException): void {
    if (error.code === 'EADDRINUSE') {
      this.logger_.error('handleServerError_', 'address_in_use', error);
    } else {
      this.logger_.error('handleServerError_', 'http_server_error', error);
    }
  }

  protected handleClientError_(err: NodeJS.ErrnoException, socket: Duplex): void {
    DEV_MODE
      && this.logger_.accident('handleClientError_', 'http_server_client_error', {
        errCode: err.code,
        errMessage: err.message,
      });

    const errorCode = err.code?.toLowerCase() ?? `error_${HttpStatusCodes.Error_Client_400_Bad_Request}`;
    const errorMessage = err.message ?? HttpStatusMessages[HttpStatusCodes.Error_Client_400_Bad_Request];
    const errorResponse = `{"ok":false,"errorCode":"${errorCode}","errorMessage":"${errorMessage}"}`;

    const responseHeaders = [
      `HTTP/1.1 ${HttpStatusCodes.Error_Client_400_Bad_Request} ${HttpStatusMessages[HttpStatusCodes.Error_Client_400_Bad_Request]}`,
      'content-type: application/json',
      `content-length: ${Buffer.byteLength(errorResponse)}`,
      '\r\n',
    ].join('\r\n');

    socket.end(responseHeaders + errorResponse);
  }

  protected async handleClientRequest_(
    nativeClientRequest: NativeClientRequest,
    nativeServerResponse: NativeServerResponse,
  ): Promise<void> {
    this.logger_.logMethod?.('handleClientRequest_');

    if (nativeClientRequest.url === undefined) {
      DEV_MODE && this.logger_.accident('handleClientRequest_', 'http_server_url_undefined');
      return;
    }

    const url = new NanotronUrl(nativeClientRequest, this.config_.prefix);

    const routeOption = this.getRouteOption_(url);

    const connection = new NanotronClientRequest(url, nativeClientRequest, nativeServerResponse, routeOption);

    if (routeOption === null) {
      connection.serverResponse.statusCode = HttpStatusCodes.Error_Client_404_Not_Found;
      connection.serverResponse.replyError();
      return;
    }

    try {
      for (const handler of routeOption.preHandlers) {
        await handler.call(connection, connection, connection.serverResponse, connection.sharedMeta);
        if (connection.terminatedHandlers === true) return; // must check after each pre-handler.
      }

      await routeOption.handler.call(connection, connection, connection.serverResponse, connection.sharedMeta);

      for (const handler of routeOption.postHandlers) {
        if (connection.terminatedHandlers === true) return; // must check before each post-handler.
        await handler.call(connection, connection, connection.serverResponse, connection.sharedMeta);
      }
    } catch (error) {
      this.logger_.error('handleClientRequest_', 'route_handler_error', error, url.debugId);

      if (connection.serverResponse.statusCode < HttpStatusCodes.Error_Client_400_Bad_Request) {
        connection.serverResponse.statusCode = HttpStatusCodes.Error_Server_500_Internal_Server_Error;
      }
      connection.serverResponse.replyError(error);
    }

    // TODO: handled open remained connections.
  }

  protected defineHealthRoute_(): void {
    this.logger_.logMethod?.('defineHealthRoute_');

    this.defineRoute({
      method: 'GET',
      url: '/health',
      handler: function () {
        const res = this.serverResponse.raw_;
        res.statusCode = HttpStatusCodes.Success_200_OK;
        res.setHeader('server', 'Alwatr Nanotron');
        res.setHeader('content-type', 'application/json');
        res.end('{"ok":true}');
      },
    });
  }

  protected defineCorsRoute_(): void {
    this.logger_.logMethod?.('defineCorsRoute_');
    const crossOrigin = this.config_.crossOrigin;
    if (crossOrigin?.enable !== true) return;
    this.defineRoute({
      method: 'OPTIONS',
      matchType: 'startsWith',
      url: '/',
      handler: function () {
        const res = this.serverResponse.raw_;
        res.writeHead(HttpStatusCodes.Success_204_No_Content, {
          'access-control-allow-origin': crossOrigin.origin,
          'access-control-allow-methods': crossOrigin.methods,
          'access-control-allow-headers': crossOrigin.headers,
          'access-control-max-age': crossOrigin.maxAge + '',
          'content-length': 0,
        });
        res.end();
      },
    });
  }
}
