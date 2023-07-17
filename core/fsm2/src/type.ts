import type {MaybePromise} from '@alwatr/type';

export type StateEventDetail<S, E> = {
  from: S;
  event: E;
  to: S;
};

export type StateRecord<S extends string, E extends string> = Partial<Record<S | '_all', Partial<Record<E, S>>>>;

export interface Action<S extends string, E extends string> {
  (eventDetail?: StateEventDetail<S, E>): MaybePromise<void>;
}

export type ActionName<S extends string, E extends string> =
  | `_on_${E}`
  | `_on_state_exit`
  | `_on_state_enter`
  | `_on_${S}_exit`
  | `_on_${S}_enter`
  | `_on_${S}_${E}`
  | `_on_all_${E}`;

export type ActionRecord<S extends string, E extends string> = Partial<Record<ActionName<S, E>, Action<S, E>>>;
