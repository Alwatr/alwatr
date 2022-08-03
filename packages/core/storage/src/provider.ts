import {createLogger} from '@alwatr/logger';

import {AlwatrStorage} from './storage';
import {AlwatrStorageConfig, AlwatrStorageProviderConfig, DocumentObject} from './type';

/**
 * Easy access to many storages with auto garbage collector
 *
 * Example:
 *
 * ```ts
 * import {AlwatrStorageProvider} from '@alwatr/storage';
 * const storageList = new AlwatrStorageProvider();
 * // ...
 * const user = (await storageList.get('user-list')).get('userId1');
 * ```
 */
export class AlwatrStorageProvider {
  protected _logger = createLogger('alwatr-storage-provider');
  protected _list: Record<string, AlwatrStorage<DocumentObject>> = {};
  protected _config: AlwatrStorageProviderConfig;

  constructor(config: AlwatrStorageProviderConfig) {
    this._logger.logMethodArgs('constructor', config);
    this._config = config;
  }

  async get<DocumentType extends DocumentObject = DocumentObject>(
      config: AlwatrStorageConfig,
  ): Promise<AlwatrStorage<DocumentType>> {
    if (!this._list[config.name]) {
      this._list[config.name] = new AlwatrStorage<DocumentType>({
        ...this._config,
        ...config,
      });
    }
    if (this._list[config.name].readyState !== true) {
      await this._list[config.name].readyPromise;
    }
    return this._list[config.name] as AlwatrStorage<DocumentType>;
  }

  unload(name: string): void {
    if (this._list[name] == null) return;
    this._list[name].unload();
    delete this._list[name];
  }

  unloadAll(): void {
    // eslint-disable-next-line guard-for-in
    for (const name in this._list) {
      this._list[name].unload();
    }
    this._list = {};
  }
}
