import {TextMessage} from '@alwatr/type';

import type {AlwatrDocumentStorage} from '@alwatr/type';

declare global {
  interface AlwatrSignals {
    'comment-document-storage': AlwatrDocumentStorage<ChatMessage>;
  }
}

export type ChatMessage = TextMessage & {
  from: string;
};
