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

export type Methods = '*' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'TRACE' | 'OPTIONS' | 'PATCH';

export interface Config {
  /**
   * The port number to listen on.
   * @default 80
   */
  port: number;

  /**
   * The hostname to listen on.
   * @default '0.0.0.0'
   */
  host: string;

  /**
   * Whether to listen automatically.
   * @default true
   */
  autoListen: boolean;
}

export interface Options {
  /**
   * CORS helper
   */
  CORSHelper?: CrossOriginResourceSharingHeaders;
}

export interface CrossOriginResourceSharingHeaders {
  /**
   * tells browsers to allow that origin to access the resource.
   */
   accessControlAllowOrigin: '*' | string[] | RegExp;
}
