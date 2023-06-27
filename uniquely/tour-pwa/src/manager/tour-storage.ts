import {router} from '@alwatr/router2';
import {AlwatrApiRequest} from '@alwatr/server-context';
import {AlwatrContextSignal} from '@alwatr/signal2';
import {AlwatrDocumentStorage, StringifyableRecord} from '@alwatr/type';

import {type PriceDetailItem, priceStorageRequest} from './price-storage.js';

export interface Image extends StringifyableRecord {
  url: string;
  alt?: string;
}

export interface Tour extends StringifyableRecord {
  id: string;
  categories: Array<string>;
  title: string;
  indexImage: Image;
  imageList?: Array<Image>;
}

export const tourStorageRequest = new AlwatrApiRequest<AlwatrDocumentStorage<Tour>>({
  name: 'tour_storage.server_request',
});

tourStorageRequest.request({
  url: 'tour-storage.json',
});

export const tourDetailContext = new AlwatrContextSignal<Tour & {priceRecord: Record<string, Array<PriceDetailItem>>}>({
  name: 'tour_detail_context',
});

router.subscribe(async () => {
  if (router.route.sectionList[0] !== 'tour') return;

  const tourId = router.route.sectionList[1];
  if (!tourId) {
    // FIXME:
    return;
  }

  const tourList = tourStorageRequest.response?.data;
  const priceList = priceStorageRequest.response?.data;

  if (tourList == null || priceList == null) {
    // FIXME:
    return;
  }

  if (!Object.prototype.hasOwnProperty.call(tourList, tourId)) {
    // FIXME:
    return;
  }

  const targetPrice = Object.values(priceList).find((item) => item.tourId === tourId);
  if (targetPrice == null) {
    // FIXME:
    return;
  }

  const tour = tourList[tourId];
  tourDetailContext.setValue({
    ...tour,
    priceRecord: targetPrice.priceRecord,
  });
});
