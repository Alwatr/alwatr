export type Methods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'TRACE' | 'OPTIONS' | 'PATCH';

export type QueryParameters = Record<string, string | number | boolean>;
export type ParamKeyType = 'string' | 'number' | 'boolean';
export type ParamValueType = string | number | boolean | null;

export type AlwatrServiceResponseFailed = {
  ok: false;
  statusCode: number;
  errorCode: string;
  meta?: Record<string, unknown>;
  data?: never;
};

export type AlwatrServiceResponseSuccess<TData = Record<string, unknown>> = {
  ok: true;
  statusCode?: number;
  errorCode?: never;
  meta?: never;
  data: TData;
};

export type AlwatrServiceResponseSuccessWithMeta<TData = Record<string, unknown>, TMeta = Record<string, unknown>> = {
  ok: true;
  statusCode?: number;
  errorCode?: never;
  meta: TMeta;
  data: TData;
};

export type AlwatrServiceResponse<TData = Record<string, unknown>, TMeta = Record<string, unknown>> =
  | AlwatrServiceResponseSuccess<TData>
  | AlwatrServiceResponseSuccessWithMeta<TData, TMeta>
  | AlwatrServiceResponseFailed;
