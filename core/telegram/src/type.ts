import type {AlwatrTelegramApi} from './api.js';
import type {StringifyableRecord} from '@alwatr/type';
import type {CallbackQuery, Message, Update} from 'typegram';

export interface AlwatrTelegramConfig extends StringifyableRecord {
  token: string;
  username?: string;
  webhookDomain: string;
}

export type TextMessageContext = Update.MessageUpdate<Message.TextMessage>
export type DataCallbackQueryContext = Update.CallbackQueryUpdate<CallbackQuery.DataQuery>

export type CommandHandlerFunction = (context: TextMessageContext, api: AlwatrTelegramApi) => void;
export type CallbackQueryHandlerFunction = (context: Update.CallbackQueryUpdate, api: AlwatrTelegramApi) => void;

export type MiddlewareRecord = StringifyableRecord & {
  message: Array<{regex: RegExp, handler: CommandHandlerFunction}>
  callbackQuery: Array<{name: string, handler: CallbackQueryHandlerFunction}>
}

export interface AlwatrTelegramApiConfig extends StringifyableRecord {
  token: string;
  username?: string;
}

// API

export interface SendMessageOption extends StringifyableRecord {
  parse_mode?: 'MarkdownV2' | 'Markdown' | 'HTML';
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
}
