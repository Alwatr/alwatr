import {createLogger} from '@alwatr/logger';

import {AlwatrTelegramContext} from './context.js';

import type {AlwatrTelegramApi} from './api.js';
import type {AlwatrConversationConfig, ConversationOption, ConversationStorageRecord, UpdateType} from './type.js';
import type {Update} from '@grammyjs/types';

export class AlwatrTelegramConversation {
  protected logger = createLogger('alwatr/telegram-conversation');
  constructor(
    public readonly option: ConversationOption,
    protected readonly storage: ConversationStorageRecord,
    protected readonly api: AlwatrTelegramApi,
    public readonly config: AlwatrConversationConfig,
  ) {
    this.logger.logMethod('constructor');
    config.currentState = 'initial';
  }

  updateHandler(update: Omit<Update, 'update_id'>): boolean {
    this.logger.logMethod('updateHandler');
    if (update.message?.text == null) return false;

    const chatId = update.message.chat.id;
    const conversationConfig = this.storage.get(chatId + '');
    if (conversationConfig == null || conversationConfig.currentState === 'initial') return false;

    let handler;

    if (
      (update.callback_query?.data != null &&
        update.callback_query.data === this.option.resetOption?.callbackDataValue) ||
      (update.message.text != null && update.message.text === this.option.resetOption?.TextMessageValue)
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

  getConfig(chatId: string | number): AlwatrConversationConfig {
    this.logger.logMethod('getConfig');
    let config = this.storage.get(chatId + '');
    this.logger.logProperty('config', config);
    if (config == null) {
      config = this.config;
      this.storage.set(chatId + '', config);
    }
    this.logger.logProperty('config2', config);
    return config;
  }

  setState(chatId: string | number, conversationConfig: AlwatrConversationConfig, state: string): void {
    this.logger.logMethodArgs('setState', {chatId, conversationConfig, state});
    conversationConfig.currentState = state;
    this.storage.set(chatId + '', conversationConfig);
  }

  reset(chatId: string | number): void {
    this.logger.logMethodArgs('reset', {chatId});
    this.storage.reset(chatId + '');
  }
}
