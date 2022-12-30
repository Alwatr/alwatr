import type {AlwatrDocumentStorage, AlwatrDocumentObject} from '@alwatr/fetch/type.js';

type CommonMessage = AlwatrDocumentObject & {
  from: string;
  replyId?: string;
};

export type ChatTextMessage = CommonMessage & {
  type: 'text';
  text: string;
};

export type ChatPhotoMessage = CommonMessage & {
  type: 'photo';
  photo: unknown;
};

export type ChatMessage = ChatTextMessage | ChatPhotoMessage;

export type ChatStorage = AlwatrDocumentStorage<ChatTextMessage>;
