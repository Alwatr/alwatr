import {createLogger} from '@alwatr/logger';

import type {AlwatrTelegramApi} from './api.js';
import type {SendMessageOption, answerCallbackQueryOption} from './type.js';
import type {ApiResponse, Message, Update} from '@grammyjs/types';

export class AlwatrTelegramContext<U extends Omit<Update, 'update_id'>> {
  protected logger = createLogger('alwatr/telegram-context');

  get messageId(): number | null {
    return this.update.message?.message_id ?? null;
  }

  get chatId(): number {
    let chatId: number | null = null;
    if ('message' in this.update) {
      chatId = this.update.message?.chat.id ?? null;
    }
    else if ('callback_query' in this.update) {
      chatId = this.update.callback_query?.from.id ?? null;
    }

    if (chatId == null) {
      throw new Error('null_chatId');
    }
    return chatId;
  }

  constructor(public readonly update: U, protected api: AlwatrTelegramApi) {
    this.logger.logMethod('constructor');
  }

  async sendMessage(text: string, option?: SendMessageOption): Promise<Message.TextMessage | null> {
    return this.api.sendMessage(this.chatId, text, option);
  }

  async reply(text: string, option: SendMessageOption = {}): Promise<Message.TextMessage | null> {
    if (this.messageId == null) {
      this.logger.error('reply', 'null_message_id');
      return null;
    }
    option.reply_to_message_id = this.messageId;
    option.allow_sending_without_reply ??= true;
    return this.api.sendMessage(this.chatId, text, option);
  }

  async answerCallbackQuery(option?: answerCallbackQueryOption): Promise<ApiResponse<boolean> | null> {
    if ('callback_query' in this.update && this.update.callback_query) {
      return this.api.answerCallbackQuery(this.update.callback_query?.id, option);
    }
    return null;
  }
}
