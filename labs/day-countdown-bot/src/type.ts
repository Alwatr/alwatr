import type {AlwatrDocumentObject} from '@alwatr/type';

export interface User extends AlwatrDocumentObject {
  lastBotMessageId?: number;
  lastDayCountdownSent?: number;
}
