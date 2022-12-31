import type {ChatMessage, AlwatrDocumentStorage} from '@alwatr/type';

declare global {
  interface AlwatrSignals {
    'comment-document-storage': AlwatrDocumentStorage<ChatMessage>;
  }
}
