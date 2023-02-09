import {StringifyableRecord} from './type-helper.js';

export type Methods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'TRACE' | 'OPTIONS' | 'PATCH';

export type ParamKeyType = 'string' | 'number' | 'boolean';
export type ParamValueType = string | number | boolean;
export type QueryParameters = Record<string, string | number | boolean>;

export interface AlwatrServiceResponseFailed extends StringifyableRecord {
  ok: false;
  statusCode: number;
  errorCode: string;
  meta?: StringifyableRecord;
  data?: never;
}

export interface AlwatrServiceResponseSuccess<TData extends StringifyableRecord> extends StringifyableRecord {
  ok: true;
  statusCode?: number;
  errorCode?: never;
  meta?: never;
  data: TData;
}

export interface AlwatrServiceResponseSuccessWithMeta<
  TData extends StringifyableRecord,
  TMeta extends StringifyableRecord
> extends StringifyableRecord {
  ok: true;
  statusCode?: number;
  errorCode?: never;
  meta: TMeta;
  data: TData;
}

export type AlwatrServiceResponse<TData extends StringifyableRecord, TMeta extends StringifyableRecord> =
  | AlwatrServiceResponseSuccess<TData>
  | AlwatrServiceResponseSuccessWithMeta<TData, TMeta>
  | AlwatrServiceResponseFailed;
