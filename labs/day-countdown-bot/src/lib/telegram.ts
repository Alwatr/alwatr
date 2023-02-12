import {createLogger} from '@alwatr/logger';
import {Context, TelegramError, Telegraf, Composer, Telegram} from 'telegraf';

import type {Convenience, Message, Update, UserFromGetMe} from 'telegraf/types';

const logger = createLogger('alwatr/telegram');

export class AlwatrTelegram<C extends AlwatrTelegrafContext = AlwatrTelegrafContext> extends Telegraf<C> {
  async sendMessage(
      chatId: string | number,
      text: string,
      options?: Convenience.ExtraReplyMessage,
      onSendMessageForbidden?: (chatId: string | number) => void,
  ): Promise<Message | null> {
    logger.logMethodArgs('sendMessage', {chatId, text, options});
    try {
      return await this.telegram.sendMessage(chatId, text, options);
    }
    catch (err) {
      const _err = err as TelegramError;
      if (_err.code === 403 && onSendMessageForbidden != null) {
        onSendMessageForbidden(chatId as number);
      }
      else {
        logger.error('sendMessageToChat', _err.message);
      }

      return null;
    }
  }

  async deleteMessage(chatId: string | number, messageId: number): Promise<true> {
    logger.logMethodArgs('deleteMessage', {chatId, messageId});
    return await this.telegram.deleteMessage(chatId, messageId);
  }

  async pinChatMessage(chatId: string | number, messageId: number): Promise<true> {
    logger.logMethodArgs('pinChatMessage', {chatId, messageId});
    return await this.telegram.pinChatMessage(chatId, messageId);
  }

  async unpinChatMessage(chatId: string | number, messageId: number): Promise<true> {
    logger.logMethodArgs('unpinChatMessage', {chatId, messageId});
    return await this.telegram.unpinChatMessage(chatId, messageId);
  }
}

export class AlwatrTelegrafContext extends Context {
  /**
   * failed!
   */
  failed?: true;

  ErrorObj?: TelegramError;

  get chatId(): number | undefined {
    return this.chat?.id;
  }

  isAdminCallback?: (chatId: number) => boolean;
  onSendMessageForbidden?: (chatId: string | number) => unknown;

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
        this.onSendMessageForbidden(this.chatId as number);
      }
      else {
        logger.error('sendMessageToChat', _err.message);
      }

      return null;
    }
  }

  async replyToChat(...args: Parameters<AlwatrTelegrafContext['reply']>): Promise<ReturnType<Context['reply']> | null> {
    try {
      return await this.reply(...args);
    }
    catch (err) {
      const _err = err as TelegramError;
      this.ErrorObj = _err;
      this.failed = true;

      if (_err.code === 403 && this.onSendMessageForbidden != null) {
        this.onSendMessageForbidden(this.chatId as number);
      }
      else {
        logger.error('replyToChat', _err.message);
      }

      return null;
    }
  }
}

export class AlwatrTelegrafComposer<C extends AlwatrTelegrafContext = AlwatrTelegrafContext> extends Composer<C> {
  constructor(protected onSendMessageForbidden: (chatId: string | number) => void) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  override command(commandName: string, callback: (ctx: AlwatrTelegrafContext) => void) {
    logger.logOther('register command/' + commandName);

    return super.command(commandName, (ctx) =>
      commandCallbackTemplate(ctx, commandName, callback, this.onSendMessageForbidden),
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  override action(actionName: string, callback: (ctx: AlwatrTelegrafContext) => void) {
    logger.logOther('register action/' + actionName);
    return super.action(actionName, (ctx) =>
      actionCallbackTemplate(ctx, actionName, callback, this.onSendMessageForbidden),
    );
  }
}

export class AlwatrTelegrafAdminComposer<C extends AlwatrTelegrafContext = AlwatrTelegrafContext> extends Composer<C> {
  constructor(
    protected isAdminCallback: (chatId: number) => boolean,
    protected onSendMessageForbidden: (chatId: number) => void,
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  override command(commandName: string, callback: (ctx: AlwatrTelegrafContext) => void) {
    logger.logOther('register admin command/' + commandName);
    return super.command(commandName, (ctx) =>
      adminCommandCallbackTemplate(ctx, commandName, callback, this.isAdminCallback, this.onSendMessageForbidden),
    );
  }
}

export function actionCallbackTemplate(
    ctx: AlwatrTelegrafContext,
    actionName: string,
    callback: (ctx: AlwatrTelegrafContext) => void,
    onSendMessageForbidden: (chatId: number) => void,
): void {
  logger.logMethod('action/' + actionName);
  if (ctx.chatId == null) return;
  ctx.onSendMessageForbidden = onSendMessageForbidden as (chatId: string | number) => unknown;
  return callback(ctx);
}

export function commandCallbackTemplate(
    ctx: AlwatrTelegrafContext,
    commandName: string,
    callback: (ctx: AlwatrTelegrafContext) => void,
    onSendMessageForbidden: (chatId: string | number) => void,
): void {
  logger.logMethod('command/' + commandName);
  if (ctx.chatId == null) return;
  ctx.onSendMessageForbidden = onSendMessageForbidden;
  return callback(ctx);
}

export function adminCommandCallbackTemplate(
    ctx: AlwatrTelegrafContext,
    commandName: string,
    callback: (ctx: AlwatrTelegrafContext) => void,
    isAdminCallback: (chatId: number) => boolean,
    onSendMessageForbidden: (chatId: number) => void,
): void {
  logger.logMethod('command/' + commandName);
  if (ctx.chatId == null) return;

  ctx.isAdminCallback = isAdminCallback;
  ctx.onSendMessageForbidden = onSendMessageForbidden as (chatId: string | number) => unknown;

  if (!ctx.isAdmin) return;
  return callback(ctx);
}

/**
 * TODO:
 */
