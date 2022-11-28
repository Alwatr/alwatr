import {createLogger} from '@alwatr/logger';

import {AlwatrStorageEngine} from './storage-engine.js';

import type {AlwatrStorageEngineConfig, AlwatrStorageEngineProviderConfig, AlwatrDocumentObject} from './type.js';

// TODO: auto unload base of last usage time and memory limit.

/**
 * Easy access to many storages with auto garbage collector
 *
 * Example:
 *
 * ```ts
 * import {AlwatrStorageEngineProvider} from '@alwatr/storage-engine';
 * const storageList = new AlwatrStorageEngineProvider();
 * // ...
 * const user = (await storageList.get('user-list')).get('userId1');
 * ```
 */
export class AlwatrStorageEngineProvider {
  protected _logger = createLogger('alwatr-storage-provider');
  protected _list: Record<string, AlwatrStorageEngine> = {};

  constructor(protected _config: AlwatrStorageEngineProviderConfig) {
    this._logger.logMethodArgs('constructor', _config);
  }

  // TODO: update all jsdoc and readme.
  get<T extends AlwatrDocumentObject = AlwatrDocumentObject>(
      config: AlwatrStorageEngineConfig,
  ): AlwatrStorageEngine<T> {
    this._logger.logMethodArgs('get', {name: config.name});
    if (!this._list[config.name]) {
      this._logger.incident('get', 'new_storage', 'Create new storage engine', {name: config.name});
      this._list[config.name] = new AlwatrStorageEngine<T>({
        ...this._config,
        ...config,
      });
      console.log('Memory usage: %sMB', Math.round(process.memoryUsage.rss() / 100_000) / 10);
    }
    return this._list[config.name] as AlwatrStorageEngine<T>;
  }

  unload(name: string): void {
    this._logger.logMethodArgs('unload', {name});
    if (this._list[name] == null) {
      this._logger.accident('unload', 'storage_not_found', 'Storage not defined or unloaded before', {name});
      return;
    }
    this._list[name].unload();
    delete this._list[name];
  }

  unloadAll(): void {
    for (const name in this._list) {
      if (!Object.prototype.hasOwnProperty.call(this._list, name)) continue;
      this._list[name].unload();
      delete this._list[name];
    }
    this._list = {};
  }
}
