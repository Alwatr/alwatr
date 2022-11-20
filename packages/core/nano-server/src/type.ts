interface ReplyFailedContent {
  ok: false;
  statusCode: number;
  errorCode: string;
  data?: Record<string, unknown>;
}

interface ReplySuccessContent {
  ok: true;
  statusCode?: number;
  data: Record<string, unknown>;
}

export type ReplyContent = ReplyFailedContent | ReplySuccessContent;

export type Methods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'TRACE' | 'OPTIONS' | 'PATCH';

export interface NanoServerConfig {
  /**
   * The port number to listen on.
   *
   * @default 80
   */
  port: number;

  /**
   * The hostname to listen on.
   *
   * @default '0.0.0.0'
   */
  host: string;

  /**
   * Sets the timeout (ms) for receiving the entire request from the client.
   *
   * @default 10_000 ms
   */
  requestTimeout: number;

  /**
   * Sets the timeout (ms) for receiving the complete HTTP headers from the client.
   *
   * This should be bigger than `keepAliveTimeout + your server's expected response time`.
   *
   * @default 130_000 ms
   */
  headersTimeout: number;

  /**
   * Sets the timeout (ms) for receiving the complete HTTP headers from the client.
   *
   * @default 120_000 ms
   */
  keepAliveTimeout: number;
}

export type QueryParams = Record<string, string | number | boolean>;
export type ParamType = 'string' | 'number' | 'boolean';
