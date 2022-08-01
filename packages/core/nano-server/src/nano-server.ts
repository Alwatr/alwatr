import {createServer} from 'http';

import {alwatrRegisteredList, createLogger} from '@alwatr/logger';

import type {Config, Methods, ReplyContent} from './type.js';
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

  constructor(config: Partial<Config>) {
    this._config = config = {...this._config, ...config};
    this._logger = createLogger(`alwatr-nano-server:${config.port}`);
    this._logger.logMethodArgs('new', config);
    this._server.on('error', this._errorListener.bind(this));
    this._server.on('clientError', this._clientErrorListener.bind(this));
    this.route('GET', '/health', this._onHealthCheckRequest.bind(this));
    if (config.autoListen) this.listen();
  }

  listen(): void {
    this._logger.logMethod('listen');
    this._server.listen(this._config.port, this._config.host, () => {
      this._logger.logOther(`listening on 0.0.0.0:${this._config.port}`);
    });
  }

  close(): void {
    this._logger.logMethod('close');
    this._server.close();
  }

  route(
      method: Methods,
      route: 'all' | `/${string}`,
      middleware: (connection: AlwatrConnection) => void,
  ): void {
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
    this._logger.accident(
        'server.onError',
        'http_server_catch_error',
        'HTTP server catch an error',
        {
          errCode: err.code,
          errMessage: err.message,
        },
    );

    if (err.code === 'EADDRINUSE') {
      this._logger.logOther('Address in use, retrying...');
      setTimeout(() => {
        this._server.close();
        this.listen();
      }, 1000);
    }
  }

  protected _clientErrorListener(err: NodeJS.ErrnoException, socket: Duplex): void {
    this._logger.accident(
        'server.clientError',
        'http_server_catch_client_error',
        'HTTP server catch a client error',
        {
          errCode: err.code,
          errMessage: err.message,
        },
    );
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

  protected async _requestListener(
      incomingMessage: IncomingMessage,
      serverResponse: ServerResponse,
  ): Promise<void> {
    this._logger.logMethod('handleRequest');

    if (incomingMessage.url == null) {
      this._logger.accident(
          'handleRequest',
          'http_server_url_undefined',
          'incomingMessage.url is undefined',
      );
      return;
    }

    if (incomingMessage.method == null) {
      this._logger.accident(
          'handleRequest',
          'http_server_method_undefined',
          'incomingMessage.method is undefined',
      );
      return;
    }

    const connection = new AlwatrConnection(incomingMessage, serverResponse);
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
      } else {
        this._notFoundListener(connection);
      }
    } catch (err) {
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

export class AlwatrConnection {
  static versionPattern = new RegExp('^/v[0-9]+');

  readonly url = new URL(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.incomingMessage.url!.replace(AlwatrConnection.versionPattern, ''),
    'http://0.0.0.0',
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  readonly method = this.incomingMessage.method!.toUpperCase() as Methods;

  readonly bodyPromise = this._getRequestBody();

  protected _logger = createLogger(`alwatr-nano-server-connection`);

  constructor(public incomingMessage: IncomingMessage, public serverResponse: ServerResponse) {
    this._logger.logMethodArgs('new', {method: incomingMessage.method, url: incomingMessage.url});
  }

  reply(content: ReplyContent): void {
    this._logger.logMethodArgs('reply', {content});

    if (this.serverResponse.headersSent) {
      this._logger.accident('reply', 'http_header_sent', 'Response headers already sent');
      return;
    }

    let body = '';
    try {
      body = JSON.stringify(content);
    } catch {
      this._logger.accident(
          'responseData',
          'data_stringify_failed',
          'JSON.stringify(data) failed!',
      );
      return this.reply(
        content.ok === false ?
          {
            ok: false,
            statusCode: content.statusCode,
            errorCode: content.errorCode,
          } :
          {
            ok: false,
            statusCode: 500,
            errorCode: 'data_stringify_failed',
          },
      );
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

  protected async _getRequestBody(): Promise<string | void> {
    // method must be POST or PUT
    if (!(this.method === 'POST' || this.method === 'PUT')) {
      return;
    }

    const body = '';

    await new Promise((resolve) => this.incomingMessage.once('end', resolve));

    return body;
  }

  async requireJsonBody<Type extends Record<string, unknown>>(): Promise<Type | void> {
    // if request content type is json, parse the body
    const body = await this.bodyPromise;

    if (body == null || body.length === 0) {
      return this.reply({
        ok: false,
        statusCode: 400,
        errorCode: 'require_body',
      });
    }

    try {
      return JSON.parse(body) as Type;
    } catch (err) {
      return this.reply({
        ok: false,
        statusCode: 400,
        errorCode: 'invalid_json',
      });
    }
  }
}
