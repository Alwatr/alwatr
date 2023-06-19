import {AlwatrServerRequest} from '@alwatr/server-context';
import {AlwatrDocumentStorage, StringifyableRecord} from '@alwatr/type';

export interface Tour extends StringifyableRecord {
  id: string;
  categories: Array<string>;
  title: string;
  indexImageUrl: string;
  imageUrlList?: Array<string>;
}
export type TourRecord = AlwatrDocumentStorage<Tour>

export const tourServerContext = new AlwatrServerRequest({
  name: 'tour-storage.server-request',
});

tourServerContext.request({
  url: '...',
});
