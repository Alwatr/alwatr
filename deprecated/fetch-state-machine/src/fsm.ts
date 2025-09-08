import {AlwatrFetchStateMachineBase, type FetchOptions, type ServerRequestState} from './base.js';

export class AlwatrFetchStateMachine extends AlwatrFetchStateMachineBase {
  /**
   * Current state.
   */
  get state(): ServerRequestState {
    return this.message_.state;
  }

  get rawResponse(): Response | undefined {
    return this.rawResponse_;
  }

  request(options?: Partial<FetchOptions>): void {
    return this.request_(options);
  }

  /**
   * Reset the machine to its initial state without notifying, and clean up existing response and state.
   */
  clean(): void {
    this.clean_();
  }
}
