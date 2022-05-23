import {createServer} from 'http';

import {alwatrRegisteredList, createLogger} from '@alwatr/logger';

import type {Methods, ReplyContent} from './type.js';
import type {IncomingMessage, ServerResponse} from 'http';

alwatrRegisteredList.push({
  name: '@alwatr/micro-server',
  version: '{{ALWATR_VERSION}}',
});

export class AlwatrMicroServer {
  protected logger = createLogger(`micro-server:${this.port}`);
  protected server = createServer(this.handleRequest);

  constructor(protected port: number, autoListen = true) {
    this.logger.logMethodArgs('new', {port, listen: autoListen});
    this.server = createServer(this.handleRequest.bind(this));

    this.server.on('error', (err: NodeJS.ErrnoException) => {
      this.logger.accident(
          'server.onError',
          'http_server_catch_error',
          'HTTP server catch an error',
          {
            errCode: err.code,
            errMessage: err.message,
          },
      );

      if (err.code === 'EADDRINUSE') {
        this.logger.logOther('Address in use, retrying...');
        setTimeout(() => {
          this.server.close();
          this.listen();
        }, 1000);
      }
    });

    this.server.on('clientError', (err: NodeJS.ErrnoException, socket) => {
      this.logger.accident(
          'server.clientError',
          'http_server_catch_client_error',
          'HTTP server catch a client error',
          {
            errCode: err.code,
            errMessage: err.message,
          },
      );
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });

    if (autoListen) this.listen();

    this.route('get', '/health', async (connection) => {
      const body = 'ok';
      connection.serverResponse.writeHead(200, {
        'Content-Length': body.length,
        'Content-Type': 'plain/text',
        'Server': 'Alwatr MicroServer',
      });
      connection.serverResponse.end(body);
    });
  }

  listen(): void {
    this.logger.logMethod('listen');
    this.server.listen(this.port, '0.0.0.0', () => {
      this.logger.logOther(`listening on 0.0.0.0:${this.port}`);
    });
  }

  // prettier-ignore
  protected middlewareList: Record<string, Record<string, (connection: AlwatrConnection) => void | Promise<void>>> = {
    all: {},
  };

  protected async handleRequest(
      incomingMessage: IncomingMessage,
      serverResponse: ServerResponse,
  ): Promise<void> {
    this.logger.logMethod('handleRequest');
    if (incomingMessage.url == null) {
      this.logger.accident(
          'handleRequest',
          'http_server_url_undefined',
          'incomingMessage.url is undefined',
      );
      return;
    }

    const connection = new AlwatrConnection(incomingMessage, serverResponse);
    const route = connection.url.pathname;
    const method = connection.incomingMessage.method?.toLowerCase();

    // TODO: handled open remained connections.
    try {
      if (typeof this.middlewareList.all?.[route] === 'function') {
        await this.middlewareList.all[route](connection);
      } else if (method != null && typeof this.middlewareList[method]?.[route] === 'function') {
        await this.middlewareList[method][route](connection);
      } else {
        connection.reply({
          ok: false,
          statusCode: 404,
          errorCode: 'not_found',
          data: {method, route},
        });
      }
    } catch (err) {
      this.logger.error('handleRequest', 'http_server_error_500', err, {method, route});
    }
  }

  route(method: Methods, route: string, middleware: (connection: AlwatrConnection) => void): void {
    this.logger.logMethodArgs('route', {method, route});
    if (typeof this.middlewareList[method]?.[route] === 'function') {
      this.logger.accident('route', 'route_already_exists', 'Route already exists', {
        method,
        route,
      });
      throw new Error('route_already_exists');
    }

    if (this.middlewareList[method] == null) {
      this.middlewareList[method] = {};
    }

    this.middlewareList[method][route] = middleware;
  }
}

export class AlwatrConnection {
  static versionPattern = new RegExp('^/v[0-9]+');

  url = new URL(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.incomingMessage.url!.replace(AlwatrConnection.versionPattern, ''),
    'http://0.0.0.0',
  );
  protected logger = createLogger(`connection`);

  readonly body = this._getRequestBody();

  constructor(public incomingMessage: IncomingMessage, public serverResponse: ServerResponse) {
    this.logger.logMethodArgs('new', {method: incomingMessage.method, url: incomingMessage.url});
  }

  protected async _getRequestBody(): Promise<string> {
    let body = '';

    this.incomingMessage.on('data', (chunk: unknown) => {
      body += chunk;
    });

    await new Promise((resolve) => this.incomingMessage.once('end', resolve));

    return body;
  }

  async requireJsonBody<Type extends Record<string, unknown>>(): Promise<Type | void> {
    // if request content type is json, parse the body
    const body = await this.body;

    if (body.length === 0) {
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

  reply(content: ReplyContent): void {
    this.logger.logMethodArgs('reply', {content});

    if (this.serverResponse.headersSent) {
      this.logger.accident('reply', 'http_header_sent', 'Response headers already sent');
      return;
    }

    let body = '';
    try {
      body = JSON.stringify(content);
    } catch {
      this.logger.accident('responseData', 'data_stringify_failed', 'JSON.stringify(data) failed!');
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
      'Server': 'Alwatr MicroServer',
    });

    this.serverResponse.write(body, 'utf8', (error: NodeJS.ErrnoException | null | undefined) => {
      if (error != null) {
        this.logger.accident('reply', 'http_response_write_failed', 'Response write failed', {
          errCode: error.code,
          errMessage: error.message,
        });
      }
    });

    this.serverResponse.end();
  }
}
