import type {requestServiceFsmConstructor} from './core.js';
import type {StringifyableFetchOptions} from '@alwatr/fetch';
import type {FsmTypeHelper} from '@alwatr/fsm';
import type {AlwatrServiceResponseSuccessWithMeta, StringifyableRecord} from '@alwatr/type';

export interface RequestServiceFsmContext<
  TResponse extends AlwatrServiceResponseSuccessWithMeta = AlwatrServiceResponseSuccessWithMeta
> extends StringifyableRecord {
  fetchOptions?: Partial<StringifyableFetchOptions>;
  response?: TResponse;
}

export type RequestServiceFsm = FsmTypeHelper<typeof requestServiceFsmConstructor>;
