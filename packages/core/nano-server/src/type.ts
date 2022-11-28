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

  /**
   * Add /health route.
   *
   * @default true
   */
  healthRoute: boolean;

  /**
   * Add OPTIONS route for preflight requests to allow access all origins.
   *
   * @default false
   */
  allowAllOrigin: boolean;
}

export interface ConnectionConfig {
  /**
   * Add `Access-Control-Allow-Origin: *` header.
   *
   * @default false
   */
  allowAllOrigin: boolean;
}

export type ParamKeyType = 'string' | 'number' | 'boolean';
export type ParamValueType = string | number | boolean | null;
