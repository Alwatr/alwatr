import {createLogger, globalAlwatr} from '@alwatr/logger';

import {AlwatrContext} from './context.js';

globalAlwatr.registeredList.push({
  name: '@alwatr/signal2/multithread-context',
  version: _ALWATR_VERSION_,
});

type AlwatrContextChangedMessage = {
  type: 'alwatr_context_changed',
  name: string,
  payload: unknown,
}

/**
 * Alwatr multithread context signal.
 */
export class AlwatrMultithreadContext<TValue> extends AlwatrContext<TValue> {
  protected static _worker: Worker;
  protected static _registry: Record<string, AlwatrMultithreadContext<unknown>> = {};

  static setupChannel(worker?: Worker): void {
    AlwatrMultithreadContext._worker = worker ?? self as unknown as Worker;
    AlwatrMultithreadContext._worker.addEventListener('message', AlwatrMultithreadContext._onMessage);
  }

  static _onMessage(event: MessageEvent): void {
    const message = event.data as AlwatrContextChangedMessage;
    if (message.type !== 'alwatr_context_changed') return;
    const context = AlwatrMultithreadContext._registry[message.name];
    context._dispatch(message.payload);
  }

  static _postMessage(name: string, payload: unknown): void {
    AlwatrMultithreadContext._worker.postMessage(<AlwatrContextChangedMessage>{
      type: 'alwatr_context_changed',
      name,
      payload,
    });
  }

  constructor(public override name: string) {
    super(name);
    this._logger = createLogger(`{multithread-context/signal: ${name}}`);
    if (AlwatrMultithreadContext._registry[name] !== undefined) {
      throw new Error('context_name_exist');
    }
    AlwatrMultithreadContext._registry[name] = this as AlwatrMultithreadContext<unknown>;
  }

  /**
   * Set context value and notify all subscribers.
   */
  override setValue(value: TValue): void {
    super.setValue(value);
    AlwatrMultithreadContext._postMessage(this.name, value);
  }
}
