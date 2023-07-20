import {AlwatrServerContext} from '@alwatr/server-context';
import {AlwatrServiceResponse, StringifyableRecord} from '@alwatr/type';

import {appLogger} from '../share/logger.js';

export interface PriceDetailItem extends StringifyableRecord {
  amount: number;
  date: number;
}

export interface Image extends StringifyableRecord {
  url: string;
  alt?: string;
}

export interface Tour extends StringifyableRecord {
  id: string;
  categories: string[];
  title: string;
  indexImage: Image;
  imageList?: Image[];
  /**
   * @description A record of categories with their prices
   * @example { 'economy': [{ amount: 18_000_000, date: 1687284459767 }, ... ]
   */
  priceList: Record<string, PriceDetailItem[]>;
}

export const tourContext = new AlwatrServerContext<AlwatrServiceResponse<Record<string, Tour>>>({
  name: 'tour.server_context',
  url: 'tour-storage.json',
});

tourContext.subscribe(() => {
  appLogger.logProperty?.('tourContext', tourContext.context);
});

