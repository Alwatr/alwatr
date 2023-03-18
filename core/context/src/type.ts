import type {serverContextFsmConstructor} from './core.js';
import type {StringifyableFetchOptions} from '@alwatr/fetch';
import type {FsmTypeHelper} from '@alwatr/fsm';
import type {AlwatrServiceResponseSuccessWithMeta, StringifyableRecord} from '@alwatr/type';

export interface ServerContextFsmContext<
  TResponse extends AlwatrServiceResponseSuccessWithMeta = AlwatrServiceResponseSuccessWithMeta
> extends StringifyableRecord {
  options?: Partial<StringifyableFetchOptions>;
  response?: TResponse;
}

export type ServerContextFsm = FsmTypeHelper<typeof serverContextFsmConstructor>;
