import {AlwatrDocumentObject} from '@alwatr/storage-client';

type CommonMessage = AlwatrDocumentObject & {
  from: unknown;
  replyId?: string;
};

export type TextMessage = CommonMessage & {
  type: 'text';
  text: string;
};

export type PhotoMessage = CommonMessage & {
  type: 'photo';
  photo: Record<string, unknown>;
};

export type Message = TextMessage | PhotoMessage;
