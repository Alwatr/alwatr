import type {AlwatrTelegramContext} from './context.js';
import type {StringifyableRecord} from '@alwatr/type';
import type {
  ForceReply,
  InlineKeyboardMarkup,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
  Update,
  MessageEntity,
} from '@grammyjs/types';

export interface AlwatrTelegramConfig extends StringifyableRecord {
  token: string;
  webhookDomain: string;
  username?: string;
}

export interface AlwatrTelegramApiConfig extends StringifyableRecord {
  token: string;
  username?: string;
}

export type UpdateType<U extends keyof Update> = Pick<Update, U>

export type CommandHandlerFunction = (
  context: AlwatrTelegramContext<UpdateType<'message'>>
) => void;
export type CallbackQueryHandlerFunction = (
  context: AlwatrTelegramContext<UpdateType<'callback_query'>>
) => void;

export type MiddlewareRecord = StringifyableRecord & {
  message: Array<{regex: RegExp; handler: CommandHandlerFunction}>;
  callbackQuery: Array<{name: string; handler: CallbackQueryHandlerFunction}>;
};

// API

export type ParseMode = 'MarkdownV2' | 'Markdown' | 'HTML'

export interface SendMessageOption { // TODO: extends StringifyableRecord
  parse_mode?: ParseMode;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export interface EditTextMessageOption {
  text: string;
  chat_id?: string | number;
  message_id?: number;
  inline_message_id?: string;
  parse_mode?: string;
  entities?: Array<MessageEntity>;
  disable_web_page_preview?: boolean;
  reply_markup?: InlineKeyboardMarkup;
}

export interface EditMessageReplyMarkupOption {
  chat_id?: string | number;
  message_id?: number;
  inline_message_id?: string;
  reply_markup?: InlineKeyboardMarkup;
}

export interface AnswerCallbackQueryOption extends StringifyableRecord {
  text?: string;
  show_alert?: boolean;
  url?: string;
  cache_time?: number;
}
