import type {AlwatrDocumentObject} from '@alwatr/type';

export type User = AlwatrDocumentObject & {
  lastBotMessageId?: number;
  lastDayCountdownSent?: number;
}
