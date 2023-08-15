export interface AlwatrStorageClientConfig {
  /**
   * Storage name (like database name).
   */
  name?: string;

  /**
   * Storage server host name.
   */
  host: string;

  /**
   * Storage server port number.
   */
  port: number;

  /**
   * Storage server token (like database password).
   */
  token: string;

  /**
   * A timeout in ms for the fetch request.
   *
   * Use with cation, you will have memory leak issue in nodejs.
   *
   * @default 0 disabled
   */
  timeout?: number;

  /**
   * Enable or disable debug mode.
   *
   * @default undefined Auto detect base on `NODE_ENV`
   */
  devMode?: boolean;
}
