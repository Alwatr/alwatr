import {logger} from './config.js';
import {storageEngine} from './lib/storage.js';

export function getTotalCount(): number {
  let globalCount = storageEngine.get('total_salavat_count')?.count;
  if (globalCount === undefined) {
    logger.incident('getGlobalCount', 'zero_salavat_count', 'The number of salavat was set to zero');
    storageEngine.set({id: 'total_salavat_count', count: 0});
    globalCount = 0;
  }

  return globalCount;
}
