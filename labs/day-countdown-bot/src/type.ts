import type {AlwatrDocumentObject, StringifyableRecord} from '@alwatr/type';

export interface Chat extends AlwatrDocumentObject {
  chatDetail: ChatDetail;
  isSubscribe?: boolean;
  lastBotMessageId?: number;
  lastDayCountdownSent?: number;
  lastNotifyMessageId?: number;
}

export type ChatDetail = ChannelDetail | GroupDetail | PrivateChatDetail | SuperGroupDetail;

export interface PrivateChatDetail extends StringifyableRecord {
  chatId: number;
  type: 'private';
  username?: string;
}

export interface SuperGroupDetail extends StringifyableRecord {
  chatId: number;
  type: 'supergroup',
  title: string
  username?: string,
}

export interface GroupDetail extends StringifyableRecord {
  chatId: number;
  type: 'group',
  title: string
  username?: string,
}

export interface ChannelDetail extends StringifyableRecord {
  chatId: number;
  type: 'channel',
  title: string
  username?: string,
}

export interface BotSetting extends AlwatrDocumentObject {
  adminChatIdList: Array<number>;
}
