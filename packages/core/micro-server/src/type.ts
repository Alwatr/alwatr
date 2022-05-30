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

export interface ResponseOptions {
  corsHelper?: CorsHelperHeader;
}

export interface CorsHelperHeader {
  allowOrigin: string;
  allowMethods?: string;
  allowHeaders?: string;
  exposeHeaders?: string;
  allowCredentials?: boolean;
  maxAge?: number;
}

export type ReplyContent = ReplyFailedContent | ReplySuccessContent;

export type Methods = ('all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options') & string;
