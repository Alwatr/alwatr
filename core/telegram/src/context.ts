import {createLogger} from '@alwatr/logger';

import type {AlwatrTelegramApi} from './api.js';
import type {
  SendMessageOption,
  AnswerCallbackQueryOption,
  EditMessageReplyMarkupOption,
  EditTextMessageOption,
} from './type.js';
import type {ApiResponse, Message, Update} from '@grammyjs/types';

export class AlwatrTelegramContext<U extends Omit<Update, 'update_id'>> {
  protected logger = createLogger('alwatr/telegram-context');

  get messageId(): number | null {
    return this.update.message?.message_id ?? null;
  }

  get commandParams(): Array<string> | null {
    if (this.update.message && this.update.message.text) {
      if (this.update.message.text.startsWith('/')) {
        const params = this.update.message.text.split(' ');
        params.shift();
        return params;
      }
    }

    return null;
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

  async answerCallbackQuery(option?: AnswerCallbackQueryOption): Promise<ApiResponse<boolean> | null> {
    if (!('callback_query' in this.update && this.update.callback_query)) return null;
    return this.api.answerCallbackQuery(this.update.callback_query?.id, option);
  }

  async editTextMessage(
      option: Omit<EditTextMessageOption, 'chat_id' | 'message_id' | 'inline_message_id'>,
  ): Promise<Message | ApiResponse<true> | null> {
    if (!('message' in this.update)) return null;
    return this.api.editTextMessage({
      chat_id: this.chatId,
      message_id: this.update.message?.message_id,
      ...option,
    });
  }

  async editMessageReplyMarkup(
      option: Omit<EditMessageReplyMarkupOption, 'chat_id' | 'message_id' | 'inline_message_id'>,
  ): Promise<Message | ApiResponse<true> | null> {
    if (!('callback_query' in this.update)) return null;
    return this.api.editMessageReplyMarkup({
      chat_id: this.chatId,
      message_id: this.update.callback_query?.message?.message_id,
      ...option,
    });
  }

  requireAccess(validator: (chatId: string | number) => boolean): boolean {
    return validator(this.chatId);
  }
}
