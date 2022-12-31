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
