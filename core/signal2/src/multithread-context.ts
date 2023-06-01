import {createLogger} from '@alwatr/logger';

import {AlwatrContextSignal} from './context.js';

type AlwatrContextChangedMessage = {
  type: 'alwatr_context_changed';
  name: string;
  payload: unknown;
};

/**
 * Alwatr multithread context signal.
 */
export class AlwatrMultithreadContextSignal<TValue> extends AlwatrContextSignal<TValue> {
  protected static _logger = createLogger(`alwatr/mt-context`);
  protected static _worker?: Worker;
  protected static _registry: Record<string, AlwatrMultithreadContextSignal<unknown> | undefined> = {};

  static setupChannel(worker: Worker = self as unknown as Worker): void {
    AlwatrMultithreadContextSignal._worker = worker;
    worker.addEventListener('message', AlwatrMultithreadContextSignal._onMessage);
  }

  static _onMessage(event: MessageEvent): void {
    const message = event.data as AlwatrContextChangedMessage;
    if (message.type !== 'alwatr_context_changed') return;
    AlwatrMultithreadContextSignal._logger.logMethodArgs?.('_onMessage', {message});
    const context = AlwatrMultithreadContextSignal._registry[message.name];
    if (context === undefined) {
      throw new Error('context_not_define', {cause: 'context not define in this thread yet!'});
    }
    context._dispatch(message.payload);
  }

  static _postMessage(name: string, payload: unknown): void {
    AlwatrMultithreadContextSignal._logger.logMethodArgs?.('_postMessage', {name, payload});
    if (AlwatrMultithreadContextSignal._worker === undefined) {
      throw new Error('worker_not_defined', {cause: 'setupChannel must be called before any setValue.'});
    }
    AlwatrMultithreadContextSignal._worker.postMessage(<AlwatrContextChangedMessage>{
      type: 'alwatr_context_changed',
      name,
      payload,
    });
  }

  constructor(name: string) {
    super(name);
    if (AlwatrMultithreadContextSignal._registry[name] !== undefined) {
      throw new Error('context_name_exist');
    }
    AlwatrMultithreadContextSignal._registry[name] = this as AlwatrMultithreadContextSignal<unknown>;
  }

  /**
   * Set context value and notify all subscribers.
   */
  override setValue(value: TValue): void {
    super.setValue(value);
    AlwatrMultithreadContextSignal._postMessage(this.name, value);
  }
}
