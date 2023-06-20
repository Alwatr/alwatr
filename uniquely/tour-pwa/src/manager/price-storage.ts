import {AlwatrApiRequest} from '@alwatr/server-context';
import {AlwatrDocumentStorage, StringifyableRecord} from '@alwatr/type';

export interface PriceDetailItem extends StringifyableRecord {
  amount: number;
  date: number;
}

export interface Price extends StringifyableRecord {
  /**
   * Tour id
   */
  id: string;

  /**
   * @description A record of categories with their prices
   * @example { 'economy': [{ amount: 18_000_000, date: 1687284459767 }, ... ]
   */
  priceRecord: Record<string, Array<PriceDetailItem>>;
}

export const priceStorageRequest = new AlwatrApiRequest<AlwatrDocumentStorage<Price>>({
  name: 'price_storage.server_request',
});

priceStorageRequest.request({
  url: '...',
});
