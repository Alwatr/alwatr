import {AlwatrServerRequest} from '@alwatr/server-context';
import {AlwatrDocumentStorage, StringifyableRecord} from '@alwatr/type';

export interface PriceDetail extends StringifyableRecord {
  id: string;
  price: number;
  date: number
}
export type TourRecord = AlwatrDocumentStorage<PriceDetail>

export const tourServerContext = new AlwatrServerRequest({
  name: 'price-storage.server-request',
});

tourServerContext.request({
  url: '...',
});
