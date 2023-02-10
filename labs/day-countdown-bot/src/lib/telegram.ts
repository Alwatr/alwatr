import {createLogger} from '@alwatr/logger';
import {Telegram, Context, TelegramError, Telegraf} from 'telegraf';

import type {Update, UserFromGetMe, Convenience, Message} from 'telegraf/types';

const logger = createLogger('alwatr/telegram');

export class AlwatrTelegram<C extends AlwatrTelegrafContext = AlwatrTelegrafContext> extends Telegraf<C> {

}

export class AlwatrTelegrafContext extends Context {
  /**
   * failed!
  */
  failed?: true;

  ErrorObj?: TelegramError;

  get chatId(): string | undefined {
    return this.chat?.id.toString();
  }

  isAdminCallback?: (chatId: string) => boolean; // telegraf
  onSendMessageForbidden?: (chatId: string) => unknown; // telegraf for admin and user;

  get isAdmin(): boolean {
    if (this.isAdminCallback == null) throw new Error('as_admin_callback_required');

    if (this.chatId == null) return false;
    return this.isAdminCallback(this.chatId);
  }

  get commandArgs(): string | null {
    const args = (this.message as Message.TextMessage).text.replace(/^\/\S*/, '').trim();

    if (args === '') return null;
    return args;
  }

  constructor(update: Update, telegram: Telegram, botInfo: UserFromGetMe) {
    super(update, telegram, botInfo);
  }

  override sendMessage(text: string, options: Convenience.ExtraReplyMessage = {}): ReturnType<Context['sendMessage']> {
    options.parse_mode ??= 'MarkdownV2';
    options.allow_sending_without_reply ??= true;

    logger.logMethodArgs('sendMessage', {chatId: this.chat?.id});
    return super.sendMessage(text, options);
  }

  override reply(text: string, options: Convenience.ExtraReplyMessage = {}): ReturnType<Context['reply']> {
    logger.logMethodArgs('reply', {chatId: this.chat?.id});

    options.reply_to_message_id ??= this.message?.message_id;
    return this.sendMessage(text, options);
  }

  async sendMessageToChat(
      ...args: Parameters<AlwatrTelegrafContext['sendMessage']>
  ): Promise<ReturnType<Context['sendMessage']> | null> {
    try {
      return await this.sendMessage(...args);
    }
    catch (err) {
      const _err = err as TelegramError;
      this.ErrorObj = _err;
      this.failed = true;

      if (_err.code === 403 && this.onSendMessageForbidden != null) {
        this.onSendMessageForbidden(this.chatId as string);
      }
      else {
        logger.error('sendMessageToChat', _err.message, {_err});
      }

      return null;
    }
  }

  async replyToChat(
      ...args: Parameters<AlwatrTelegrafContext['reply']>
  ): Promise<ReturnType<Context['reply']> | null> {
    try {
      return await this.reply(...args);
    }
    catch (err) {
      const _err = err as TelegramError;
      this.ErrorObj = _err;
      this.failed = true;

      if (_err.code === 403 && this.onSendMessageForbidden != null) {
        this.onSendMessageForbidden(this.chatId as string);
      }
      else {
        logger.error('replyToChat', _err.message, {_err});
      }

      return null;
    }
  }
}

/**
 * TODO:
 *
 */
