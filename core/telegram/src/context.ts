import {createLogger} from '@alwatr/logger';

import type {AlwatrTelegramApi} from './api.js';
import type {SendMessageOption} from './type.js';
import type {Message, Update} from 'typegram';

export class AlwatrTelegramContext<C extends Update> {
  protected logger = createLogger('alwatr/telegram-context');

  get messageId(): number | null {
    let messageId: number | null = null;
    if ('message' in this.update) {
      messageId = this.update.message.message_id;
    }
    return messageId;
  }

  get chatId(): number {
    let chatId: number | null = null;
    if ('message' in this.update) {
      chatId = this.update.message.chat.id;
    }
    else if ('callback_query' in this.update) {
      chatId = this.update.callback_query.from.id;
    }

    if (chatId == null) {
      throw new Error('null_chatId');
    }

    return chatId;
  }

  constructor(public readonly update: C, protected api: AlwatrTelegramApi) {
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
}
