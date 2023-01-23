import {logger} from './config.js';
import {storageEngine} from './lib/storage.js';

export function getTotalCount(): number {
  let totalSalavatCount = storageEngine.get('total_salavat_count')?.count;
  if (totalSalavatCount === undefined) {
    logger.incident('getTotalCount', 'zero_salavat_count', 'The number of salavat was set to zero');
    storageEngine.set({id: 'total_salavat_count', count: 0});
    totalSalavatCount = 0;
  }

  return totalSalavatCount;
}
