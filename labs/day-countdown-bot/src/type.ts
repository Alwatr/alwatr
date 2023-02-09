import type {AlwatrDocumentObject} from '@alwatr/type';

export interface User extends AlwatrDocumentObject {
  lastBotMessageId?: number;
  lastDayCountdownSent?: number;
  lastNotifyMessageId?: number;
}

export interface BotSetting extends AlwatrDocumentObject {
  adminChatIdList: Array<string>;
}
