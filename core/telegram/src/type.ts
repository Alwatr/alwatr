import type {AlwatrTelegramContext} from './context.js';
import type {StringifyableRecord} from '@alwatr/type';
import type {CallbackQuery, Message, Update} from 'typegram';

export interface AlwatrTelegramConfig extends StringifyableRecord {
  token: string;
  webhookDomain: string;
  username?: string;
}

export interface AlwatrTelegramApiConfig extends StringifyableRecord {
  token: string;
  username?: string;
}

export type CommandHandlerFunction =
 (context: AlwatrTelegramContext<Update.MessageUpdate<Message.TextMessage>>) => void;
export type CallbackQueryHandlerFunction =
 (context: AlwatrTelegramContext<Update.CallbackQueryUpdate<CallbackQuery.DataQuery>>) => void;

export type MiddlewareRecord = StringifyableRecord & {
  message: Array<{regex: RegExp, handler: CommandHandlerFunction}>
  callbackQuery: Array<{name: string, handler: CallbackQueryHandlerFunction}>
}

// API

export interface SendMessageOption extends StringifyableRecord {
  parse_mode?: 'MarkdownV2' | 'Markdown' | 'HTML';
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;

export interface answerCallbackQueryOption extends StringifyableRecord {
  text?: string;
  show_alert?: boolean;
  url?: string;
  cache_time?: number;
}
