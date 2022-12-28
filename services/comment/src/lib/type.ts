import {AlwatrDocumentObject} from '@alwatr/type';

type CommonMessage = AlwatrDocumentObject & {
  user: unknown;
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
