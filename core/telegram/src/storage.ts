import {createLogger} from '@alwatr/logger';

import type {AlwatrStorageClient} from '@alwatr/storage-client';
import type {AlwatrStorageEngine} from '@alwatr/storage-engine';
import type {AlwatrDocumentObject, MaybePromise} from '@alwatr/type';


export class AlwatrTelegramStorage {
  protected logger = createLogger('alwatr/telegram-storage');

  constructor(protected storage: AlwatrStorageClient | AlwatrStorageEngine) {
    this.logger.logMethod('constructor');
  }

  get<T extends AlwatrDocumentObject>(chatId: string | number): MaybePromise<T | null> {
    return this.storage.get(chatId + '') as T | null;
  }

  async set<T extends AlwatrDocumentObject>(object: T): Promise<void> {
    await this.storage.set(object);
  }

  has(chatId: string | number): MaybePromise<boolean> {
    return this.storage.has(chatId + '');
  }

  async* forEach(): AsyncGenerator<AlwatrDocumentObject, void, void> {
    const keys = typeof this.storage.keys === 'function' ? await this.storage.keys() : this.storage.keys;
    for (const documentId of keys) {
      const documentObject = await this.get(documentId);
      if (documentObject != null) yield documentObject;
    }
  }
}
