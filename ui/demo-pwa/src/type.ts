import type {AlwatrDocumentObject, AlwatrDocumentStorage} from '@alwatr/type';

declare global {
  interface AlwatrSignals {
    'comment-document-storage': AlwatrDocumentStorage<ChatMessage>;
  }
}

export type ChatTextMessage = {
  from: string;
  type: 'text';
  text: string;
};

export type _ChatMessage = ChatTextMessage; // TODO: ChatPhotoMessage

export type ChatMessage = AlwatrDocumentObject & _ChatMessage;
