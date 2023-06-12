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

  get chatId(): number {
    let chatId: number | undefined;
    if ('message' in this.update) {
      chatId = this.update.message?.chat.id;
    }
    else if ('callback_query' in this.update) {
      chatId = this.update.callback_query?.message?.chat.id;
    }

    if (chatId == null) {
      throw new Error('null_chatId');
    }
    return chatId;
  }

  get messageId(): number | undefined {
    return this.update.message?.message_id ?? this.update.callback_query?.message?.message_id;
  }

  get messageThreadId(): number | undefined {
    return this.update.message?.message_thread_id ?? this.update.callback_query?.message?.message_thread_id;
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

  constructor(public readonly update: U, protected api: AlwatrTelegramApi) {
    this.logger.logMethod?.('constructor');
  }

  async sendMessage(text: string, option?: SendMessageOption): Promise<ApiResponse<Message.TextMessage>> {
    return this.api.sendMessage(this.chatId, text, option);
  }

  async reply(text: string, option: SendMessageOption = {}): Promise<ApiResponse<Message.TextMessage>> {
    if (this.messageId == null) {
      this.logger.error('reply', 'null_message_id');
      return {
        ok: false,
        error_code: 400,
        description: 'null_message_id',
      };
    }
    option.reply_to_message_id = this.messageId;
    option.message_thread_id = this.messageThreadId;
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
