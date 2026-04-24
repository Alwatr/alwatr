import {createLogger} from '@alwatr/logger';
import {createChannelSignal} from '@alwatr/signal';

const logger = createLogger('page-ready');

const pageReadyChannel_ = createChannelSignal<Record<string, undefined>>({
  name: 'page-ready',
});

export function onPageReady<T extends string>(pageId: T, handler: () => void) {
  logger.logMethodArgs?.('onPageReady', {pageId});
  pageReadyChannel_.on(pageId, handler);
}

export function dispatchPageReady(): void {
  logger.logMethod?.('dispatchPageReady');
  const element = document.querySelector('[page-id]');
  if (!element) {
    logger.incident?.('dispatchPageReady', 'element_not_found');
    return;
  }

  const pageId = element.getAttribute('page-id')?.trim();

  if (!pageId) {
    logger.accident('dispatchPageReady', 'empty_page_id', {element});
    return;
  }

  pageReadyChannel_.dispatch(pageId);
}
