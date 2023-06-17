import type {AlwatrDocumentObject, StringifyableRecord} from '@alwatr/type';

export interface DayCountdownChat extends AlwatrDocumentObject {
  chatDetail?: ChatDetail;
  isSubscribed?: boolean;
  lastBotMessageId?: number;
  lastDayCountdownSent?: Array<number>;
  lastNotifyMessageId?: Array<number>;
  isDeleted?: boolean,
}

export type ChatDetail = ChannelDetail | GroupDetail | PrivateChatDetail | SuperGroupDetail;

export interface PrivateChatDetail extends StringifyableRecord {
  chatId: number;
  type: 'private';
  username?: string;
}

export interface SuperGroupDetail extends StringifyableRecord {
  chatId: number;
  type: 'supergroup';
  title: string;
  username?: string;
  messageThreadId?: number;
}

export interface GroupDetail extends StringifyableRecord {
  chatId: number;
  type: 'group';
  title: string;
  username?: string;
}

export interface ChannelDetail extends StringifyableRecord {
  chatId: number;
  type: 'channel';
  title: string;
  username?: string;
}

export interface AdminChatInfo extends StringifyableRecord {
  chatId: number;
  messageThreadId?: number;
}

export interface BotSetting extends AlwatrDocumentObject {
  adminInfoList: Array<AdminChatInfo>;
}

export interface Content extends AlwatrDocumentObject {
  chatId: number;
  messageId: number;
}

export type Conversation = AlwatrDocumentObject & {
  name: string;
  state: string;
  context?: StringifyableRecord;
};
