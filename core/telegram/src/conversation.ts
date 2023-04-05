import {createLogger} from '@alwatr/logger';

import {AlwatrTelegramContext} from './context.js';

import type {AlwatrTelegramApi} from './api.js';
import type {AlwatrTelegramStorage} from './storage.js';
import type {AlwatrConversationConfig, ConversationOption, UpdateType} from './type.js';
import type {AlwatrDocumentObject, StringifyableRecord} from '@alwatr/type';
import type {Update} from '@grammyjs/types';

export interface ConversationChat extends AlwatrDocumentObject {
  conversationRecord: Record<string, AlwatrConversationConfig>;
}

export class AlwatrTelegramConversation {
  protected logger = createLogger('alwatr/telegram-conversation');

  constructor(
    public readonly option: ConversationOption,
    protected readonly storage: AlwatrTelegramStorage,
    protected readonly api: AlwatrTelegramApi,
    public readonly config: AlwatrConversationConfig,
  ) {
    this.logger.logMethod('constructor');
    config.currentState = 'initial';
  }

  async updateHandler(update: Omit<Update, 'update_id'>): Promise<boolean> {
    this.logger.logMethod('updateHandler');
    if (update.message == null) return false;

    const chatId = update.message?.chat.id;
    const conversationConfig = (await this.storage.get<ConversationChat>(chatId))?.conversationRecord[this.config.id];
    if (conversationConfig == null || conversationConfig.currentState === 'initial') return false;

    let handler;
    if (
      (update.callback_query?.data != null &&
        update.callback_query.data === this.option.resetOption?.callbackDataValue) ||
      (update.message?.text != null && update.message.text === this.option.resetOption?.TextMessageValue)
    ) {
      handler = this.option.stateRecord.reset;
    }
    else {
      handler = this.option.stateRecord[conversationConfig.currentState];
      if (handler == null) return false;
    }
    const context = new AlwatrTelegramContext<UpdateType<'message'>>(update, this.api);
    handler(context, conversationConfig);
    return true;
  }

  async getConfig(chatId: string | number): Promise<AlwatrConversationConfig | null> {
    this.logger.logMethod('getConfig');
    const chat = await this.storage.get<ConversationChat>(chatId);
    if (chat == null) return null;

    let config = chat?.conversationRecord[this.config.id];
    if (config == null) {
      config = this.config;
      chat.conversationRecord[this.config.id] = config;
      await this.storage.set<ConversationChat>(chat);
    }
    return config;
  }

  async setState(chatId: string | number, state: string): Promise<void | null> {
    this.logger.logMethodArgs('setState', {chatId, state});
    const chat = await this.storage.get<ConversationChat>(chatId);
    if (chat == null) return null;
    chat.conversationRecord[this.config.id].currentState = state;
    await this.storage.set(chat);
  }

  async setContext(
      chatId: string | number,
      context: StringifyableRecord,
  ): Promise<null | void> {
    this.logger.logMethodArgs('setState', {chatId});
    const chat = await this.storage.get<ConversationChat>(chatId);
    if (chat == null) return null;
    chat.conversationRecord[this.config.id].context = {
      ...chat.conversationRecord[this.config.id].context,
      ...context,
    };
    await this.storage.set(chat);
  }

  async reset(chatId: string | number): Promise<void | null> {
    this.logger.logMethodArgs('reset', {chatId});
    const chat = await this.storage.get<ConversationChat>(chatId);
    if (chat == null) return null;
    delete chat.conversationRecord[this.config.id];
    this.storage.set<ConversationChat>(chat);
  }
}
