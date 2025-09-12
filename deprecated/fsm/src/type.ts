export interface StateEventDetail<S extends string, E extends string> {
  from: S;
  event: E | 'reset';
  to: S;
}

export type StateRecord<S extends string, E extends string> = Partial<Record<S, Partial<Record<E | 'reset', S>>>>;

export type Action<S extends string, E extends string> = (eventDetail?: StateEventDetail<S, E | 'reset'>) => Awaitable<void>;

export type ActionName<S extends string, E extends string> =
  | `on_event_${E}`
  | `on_any_state_exit`
  | `on_any_state_enter`
  | `on_state_${S}_exit`
  | `on_state_${S}_enter`
  | `on_state_${S}_event_${E}`;

export type ActionRecord<S extends string, E extends string> = Partial<Record<ActionName<S, E | 'reset'>, Action<S, E | 'reset'>>>;
