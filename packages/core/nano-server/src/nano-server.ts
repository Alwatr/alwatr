import {createServer} from 'http';

import {alwatrRegisteredList, createLogger} from '@alwatr/logger';

import {setCORSHelperHeader as setCORSHelperHeader} from './middleware/cors-helper.js';

import type {Config, Methods, Options, ReplyContent} from './type.js';
import type {AlwatrLogger} from '@alwatr/logger';
import type {IncomingMessage, ServerResponse} from 'node:http';
import type {Duplex} from 'node:stream';

alwatrRegisteredList.push({
  name: '@alwatr/nano-server',
  version: '{{ALWATR_VERSION}}',
});

export class AlwatrNanoServer {
  protected _config: Config = {
    host: '0.0.0.0',
    port: 80,
    autoListen: true,
  };
  protected _logger: AlwatrLogger;
  protected _server = createServer(this._requestListener.bind(this));

  /**
   * Create a server for nanoservice use cases.
   *
   * Example:
   *
   * ```ts
   * import {AlwatrNanoServer} from '@alwatr/nano-server';
   * const nanoServer = new AlwatrNanoServer();
   *
   * nanoServer.route('GET', '/', async (connection) => {
   * connection.reply({
   *   ok: true,
   *   data: {
   *    app: 'Alwatr Nanoservice Starter Kit',
   *    message: 'Hello ;)',
   *   },
   *  });
   * });
   * ```
   */
  constructor(config?: Partial<Config>, public options?: Partial<Options>) {
    this._config = config = {...this._config, ...config};
    this._logger = createLogger(`alwatr-nano-server:${config.port}`);

    this._logger.logMethodArgs('constructor', config);
    this._server.on('error', this._errorListener.bind(this));
    this._server.on('clientError', this._clientErrorListener.bind(this));
    this.route('GET', '/health', this._onHealthCheckRequest.bind(this));
    if (config.autoListen) this.listen();
  }

  CORSHelper = this.options?.CORSHelper;

  /**
   * Starts the HTTP server listening for connections.
   *
   * Example:
   *
   * ```ts
   * nanoserver.listen();
   * ```
   */
  listen(): void {
    this._logger.logMethod('listen');
    this._server.listen(this._config.port, this._config.host, () => {
      this._logger.logOther(`listening on ${this._config.host}:${this._config.port}`);
    });
  }

  /**
   * Stops the HTTP server from accepting new connections.
   *
   * Example:
   *
   * ```ts
   * nanoserver.listen();
   * ```
   */
  close(): void {
    this._logger.logMethod('close');
    this._server.close();
  }

  /**
   * Refers to how an application’s endpoints (URIs) respond to client requests.
   *
   * @param method - Acceptable methods.
   * @param route - Acceptable request path.
   * @param middleware - Request handler.
   *
   * Example:
   *
   * ```ts
   * nanoServer.route('GET', '/', async (connection) => {
   * connection.reply({
   *   ok: true,
   *   data: {
   *    app: 'Alwatr Nanoservice Starter Kit',
   *    message: 'Hello ;)',
   *   },
   *  });
   * });
   * ```
   */
  route(method: Methods, route: 'all' | `/${string}`, middleware: (connection: AlwatrConnection) => void): void {
    this._logger.logMethodArgs('route', {method, route});

    if (this.middlewareList[method] == null) this.middlewareList[method] = {};

    if (typeof this.middlewareList[method][route] === 'function') {
      this._logger.accident('route', 'route_already_exists', 'Route already exists', {
        method,
        route,
      });
      throw new Error('route_already_exists');
    }

    this.middlewareList[method][route] = middleware;
  }

  protected _errorListener(err: NodeJS.ErrnoException): void {
    this._logger.accident('server.onError', 'http_server_catch_error', 'HTTP server catch an error', {
      errCode: err.code,
      errMessage: err.message,
    });

    if (err.code === 'EADDRINUSE') {
      this._logger.logOther('Address in use, retrying...');
      setTimeout(() => {
        this._server.close();
        this.listen();
      }, 1000);
    }
  }

  protected _clientErrorListener(err: NodeJS.ErrnoException, socket: Duplex): void {
    this._logger.accident('server.clientError', 'http_server_catch_client_error', 'HTTP server catch a client error', {
      errCode: err.code,
      errMessage: err.message,
    });
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  }

  protected _onHealthCheckRequest(connection: AlwatrConnection): void {
    const body = 'ok';
    connection.serverResponse.writeHead(200, {
      'Content-Length': body.length,
      'Content-Type': 'plain/text',
      'Server': 'Alwatr NanoServer',
    });
    connection.serverResponse.end(body);
  }

  // prettier-ignore
  protected middlewareList: Record<string, Record<string, (connection: AlwatrConnection) => void | Promise<void>>> = {
    all: {},
  };

  protected async _requestListener(incomingMessage: IncomingMessage, serverResponse: ServerResponse): Promise<void> {
    this._logger.logMethod('handleRequest');

    if (incomingMessage.url == null) {
      this._logger.accident('handleRequest', 'http_server_url_undefined', 'incomingMessage.url is undefined');
      return;
    }

    if (incomingMessage.method == null) {
      this._logger.accident('handleRequest', 'http_server_method_undefined', 'incomingMessage.method is undefined');
      return;
    }

    const connection = new AlwatrConnection(incomingMessage, serverResponse, this.options);
    const route = connection.url.pathname;

    // TODO: handled open remained connections.

    const middleware =
      this.middlewareList[connection.method]?.[route] ||
      this.middlewareList.all[route] ||
      this.middlewareList[connection.method]?.all ||
      this.middlewareList.all.all;

    try {
      if (typeof middleware === 'function') {
        await middleware(connection);
      }
      else {
        this._notFoundListener(connection);
      }
    }
    catch (err) {
      this._logger.error('handleRequest', 'http_server_middleware_error', err, {
        method: connection.method,
        route,
      });
      connection.reply({
        ok: false,
        statusCode: 500,
        errorCode: 'http_server_middleware_error',
      });
    }
  }

  protected _notFoundListener = (connection: AlwatrConnection): void => {
    connection.reply({
      ok: false,
      statusCode: 404,
      errorCode: 'not_found',
      data: {
        method: connection.method,
        route: connection.url.pathname,
      },
    });
  };
}

/**
 * Connection...?
 */
export class AlwatrConnection {
  static versionPattern = new RegExp('^/v[0-9]+');

  /**
   * Request URL.
   */
  readonly url = new URL(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.incomingMessage.url!.replace(AlwatrConnection.versionPattern, ''),
    'http://localhost/',
  );

  /**
   * Request method.
   */
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  readonly method = this.incomingMessage.method!.toUpperCase() as Methods;

  /**
   * The token placed in the request header.
   */
  readonly token = this._getToken();

  /**
   * Request body for POST & PUT method.
   */
  readonly bodyPromise = this._getRequestBody();

  protected _logger = createLogger(`alwatr-nano-server-connection`);

  constructor(
    public incomingMessage: IncomingMessage,
    public serverResponse: ServerResponse,
    public options?: Options,
  ) {
    this._logger.logMethodArgs('new', {method: incomingMessage.method, url: incomingMessage.url});
  }

  /**
   * Responds to the request.
   *
   * Example:
   * ```ts
   * nanoServer.route('GET', '/', async (connection) => {
   *   connection.reply({
   *     ok: true,
   *     data: {
   *      app: 'Alwatr Nanoservice Starter Kit',
   *      message: 'Hello ;)',
   *     },
   *    });
   * });
   * ```
   */
  reply(content: ReplyContent): void {
    this._logger.logMethodArgs('reply', {content});

    if (this.serverResponse.headersSent) {
      this._logger.accident('reply', 'http_header_sent', 'Response headers already sent');
      return;
    }

    let body = '';
    try {
      body = JSON.stringify(content);
    }
    catch {
      this._logger.accident('responseData', 'data_stringify_failed', 'JSON.stringify(data) failed!');
      return this.reply(
        content.ok === false
          ? {
            ok: false,
            statusCode: content.statusCode,
            errorCode: content.errorCode,
          }
          : {
            ok: false,
            statusCode: 500,
            errorCode: 'data_stringify_failed',
          },
      );
    }

    if (this.options?.CORSHelper !== undefined) {
      setCORSHelperHeader(this, this.options.CORSHelper);
    }

    this.serverResponse.writeHead(content.statusCode ?? 200, {
      'Content-Length': body.length,
      'Content-Type': 'application/json',
      'Server': 'Alwatr NanoServer',
    });

    this.serverResponse.write(body, 'utf8', (error: NodeJS.ErrnoException | null | undefined) => {
      if (error == null) return;
      this._logger.accident('reply', 'http_response_write_failed', 'Response write failed', {
        errCode: error.code,
        errMessage: error.message,
      });
    });

    this.serverResponse.end();
  }

  protected _getToken(): string | null {
    const auth = this.incomingMessage.headers.authorization?.split(' ');

    if (auth == null || auth[0] !== 'Bearer') {
      return null;
    }

    return auth[1];
  }

  protected async _getRequestBody(): Promise<string | null> {
    // method must be POST or PUT
    if (!(this.method === 'POST' || this.method === 'PUT')) {
      return null;
    }

    let body = '';

    this.incomingMessage.on('data', (chunk: unknown) => {
      body += chunk;
    });

    await new Promise((resolve) => this.incomingMessage.once('end', resolve));

    return body;
  }

  /**
   * Parse request body.
   *
   * @returns Request body.
   *
   * Example:
   * ```ts
   * const bodyData = await connection.requireJsonBody();
   * ```
   */
  async requireJsonBody<Type extends Record<string, unknown>>(): Promise<Type | null> {
    // if request content type is json, parse the body
    const body = await this.bodyPromise;

    if (body === null || body.length === 0) {
      this.reply({
        ok: false,
        statusCode: 400,
        errorCode: 'require_body',
      });
      return null;
    }

    try {
      return JSON.parse(body) as Type;
    }
    catch (err) {
      this.reply({
        ok: false,
        statusCode: 400,
        errorCode: 'invalid_json',
      });
      return null;
    }
  }
}
