import {AlwatrRemoteContextStateMachineBase, type ServerContextState} from './base.js';

import type {FetchOptions} from '@alwatr/nanolib';

export class AlwatrRemoteContextStateMachine<T extends JsonValue = JsonObject> extends AlwatrRemoteContextStateMachineBase<T> {
  /**
   * Current state.
   */
  get state(): ServerContextState {
    return this.message_.state;
  }

  get context(): T | undefined {
    return this.context_;
  }

  request(fetchOptions?: Partial<FetchOptions>): void {
    return this.request_(fetchOptions);
  }

  /**
   * Reset the machine to its initial state without notifying, and clean up existing context (include raw response) and state.
   */
  clean(): void {
    this.clean_();
  }
}
