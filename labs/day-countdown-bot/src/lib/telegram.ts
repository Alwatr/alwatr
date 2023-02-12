import {createLogger} from '@alwatr/logger';
import {Context, TelegramError, Telegraf, Composer} from 'telegraf';

import {message} from '../director/l18e-loader.js';

import type {Convenience, Message} from 'telegraf/types';

const logger = createLogger('alwatr/telegram');

export class AlwatrTelegram<C extends AlwatrTelegrafContext = AlwatrTelegrafContext> extends Telegraf<C> {
  async sendMessage(
      chatId: number,
      text: string,
      options: Convenience.ExtraReplyMessage = {},
      onSendMessageForbidden?: (chatId: number, error: TelegramError) => void,
  ): Promise<Message | null> {
    logger.logMethodArgs('sendMessage', {chatId, text, options});

    options.parse_mode ??= 'MarkdownV2';
    try {
      return await this.telegram.sendMessage(chatId, text, options);
    }
    catch (err) {
      const _err = err as TelegramError;
      logger.error('sendMessageToChat', _err.message);
      if (onSendMessageForbidden != null) {
        onSendMessageForbidden(chatId, _err);
      }

      return null;
    }
  }

  async deleteMessage(chatId: number, messageId: number): Promise<true> {
    logger.logMethodArgs('deleteMessage', {chatId, messageId});
    return await this.telegram.deleteMessage(chatId, messageId);
  }

  async pinChatMessage(chatId: number, messageId: number): Promise<true> {
    logger.logMethodArgs('pinChatMessage', {chatId, messageId});
    return await this.telegram.pinChatMessage(chatId, messageId);
  }

  async unpinChatMessage(chatId: number, messageId: number): Promise<true> {
    logger.logMethodArgs('unpinChatMessage', {chatId, messageId});
    return await this.telegram.unpinChatMessage(chatId, messageId);
  }

  async isChatAdmin(chatId: number, userId: number): Promise<boolean> {
    logger.logMethodArgs('isChatAdmin', {chatId, userId});
    const adminList = await this.telegram.getChatAdministrators(chatId);
    const admin = adminList.find((admin) => {
      return admin.user.id === userId;
    });
    if (admin == null) return false;
    return true;
  }

  async isGroup(chatId: number): Promise<boolean> {
    logger.logMethod('isGroup');
    return chatId < 0;
  }
}

export class AlwatrTelegrafContext extends Context {
  get chatId(): number {
    return this.chat?.id as number;
  }

  get userId(): number {
    return this.from?.id as number;
  }

  onSendMessageFailed?: (chatId: number, error: TelegramError) => void;

  get commandArgs(): string | null {
    const args = (this.message as Message.TextMessage).text.replace(/^\/\S*/, '').trim();

    if (args === '') return null;
    return args;
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
      logger.error('sendMessageToChat', _err.message);
      if (_err.code === 403 && this.onSendMessageFailed != null) {
        this.onSendMessageFailed(this.chatId, _err);
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
      logger.error('replyToChat', _err.message);
      if (this.onSendMessageFailed != null) {
        this.onSendMessageFailed(this.chatId, _err);
      }
      return null;
    }
  }
}

export class AlwatrTelegrafComposer<C extends AlwatrTelegrafContext = AlwatrTelegrafContext> extends Composer<C> {
  constructor(
    protected onSendMessageFailed: (chatId: number, error: TelegramError) => void,
    protected accessCheckCallback: (userId: number, chatId: number)
      => Promise<boolean> | boolean = async (): Promise<boolean> => true,
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  override command(commandName: string, callback: (ctx: AlwatrTelegrafContext) => void) {
    logger.logOther('register command/' + commandName);
    return super.command(commandName, (ctx) =>
      commandCallbackTemplate(ctx, commandName, callback, this.accessCheckCallback, this.onSendMessageFailed),
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  override action(actionName: string, callback: (ctx: AlwatrTelegrafContext) => void) {
    logger.logOther('register action/' + actionName);
    return super.action(actionName, (ctx) =>
      actionCallbackTemplate(ctx, actionName, callback, this.accessCheckCallback, this.onSendMessageFailed),
    );
  }
}

async function actionCallbackTemplate(
    ctx: AlwatrTelegrafContext,
    commandName: string,
    callback: (ctx: AlwatrTelegrafContext) => void,
    accessCheckCallback: (userId: number, chatId: number) => Promise<boolean> | boolean,
    onSendMessageFailed?: (chatId: number, error: TelegramError) => void,
): Promise<void> {
  logger.logMethod('action/' + commandName);
  if (ctx.chatId == null || ctx.userId == null) return;

  if (!await accessCheckCallback(ctx.userId, ctx.chatId)) {
    ctx.answerCbQuery(message('permission_denied'));
    return;
  }
  ctx.onSendMessageFailed = onSendMessageFailed;

  return callback(ctx);
}

async function commandCallbackTemplate(
    ctx: AlwatrTelegrafContext,
    commandName: string,
    callback: (ctx: AlwatrTelegrafContext) => void,
    accessCheckCallback: (userId: number, chatId: number) => Promise<boolean> | boolean,
    onSendMessageFailed?: (chatId: number, error: TelegramError) => void,
): Promise<void> {
  logger.logMethod('command/' + commandName);
  if (ctx.chatId == null || ctx.userId == null) return;

  if (!await accessCheckCallback(ctx.userId, ctx.chatId)) {
    ctx.reply(message('permission_denied'));
    return;
  }
  ctx.onSendMessageFailed = onSendMessageFailed;

  return callback(ctx);
}

/**
 * TODO:
 */
