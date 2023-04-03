import type {AlwatrTelegramContext} from './context.js';
import type {StringifyableRecord} from '@alwatr/type';
import type {
  ForceReply,
  InlineKeyboardMarkup,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
  Update,
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

export interface SendMessageOption {
  // TODO: extends StringifyableRecord
  parse_mode?: 'MarkdownV2' | 'Markdown' | 'HTML';
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export interface answerCallbackQueryOption extends StringifyableRecord {
  text?: string;
  show_alert?: boolean;
  url?: string;
  cache_time?: number;
}
