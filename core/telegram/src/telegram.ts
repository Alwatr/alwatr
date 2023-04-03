import {fetch} from '@alwatr/fetch';
import {createLogger} from '@alwatr/logger';
import {AlwatrNanoServer} from '@alwatr/nano-server';

import {AlwatrTelegramApi} from './api.js';
import {AlwatrTelegramContext} from './context.js';

import type {
  MiddlewareRecord,
  AlwatrTelegramConfig,
  CommandHandlerFunction,
  CallbackQueryHandlerFunction,
  UpdateType,
} from './type.js';
import type {QueryParameters} from '@alwatr/type';
import type {ApiResponse, Update} from '@grammyjs/types';

export * from './type.js';
export * from './api.js';

export class AlwatrTelegram {
  protected logger = createLogger('alwatr/telegram');

  /**
   * API Base URL.
   */
  protected baseApiUrl = `https://api.telegram.org/bot${this.config.token}/`;

  api = new AlwatrTelegramApi({
    token: this.config.token,
    username: this.config.username,
  });

  protected middlewareRecord: MiddlewareRecord = {
    message: [],
    callbackQuery: [],
  };

  constructor(protected readonly config: AlwatrTelegramConfig) {
    this.logger.logMethodArgs('constructor', config);
  }

  /**
   * Set Webhook.
   *
   * @see https://core.telegram.org/bots/api#setwebhook
   */
  async setWebhook(listenHost = '0.0.0.0', listenPort = 8000): Promise<void> {
    this.logger.logMethod('setWebhook');
    const response = await this.callApi('setWebhook', {url: this.config.webhookDomain});
    const responseJson = await response.json() as ApiResponse<boolean>;

    if (!responseJson.ok) {
      this.logger.error('setWebhook', 'set_webhook_failed', responseJson.error_code, responseJson.description);
      throw new Error('set_webhook_failed');
    }

    const nanoServer = new AlwatrNanoServer({
      host: listenHost,
      port: listenPort,
      allowAllOrigin: true,
    });

    nanoServer.route('POST', '/', async (connection) => {
      const body = (await connection.requireJsonBody()) as unknown as Update;
      this.handleUpdate(body as Update);
      return {
        ok: true,
        data: {},
      };
    });
  }

  defineTextMessageHandler(regex: RegExp, handler: CommandHandlerFunction): void {
    this.logger.logMethodArgs('defineTextMessageHandler', regex);
    this.middlewareRecord.message.push({
      regex: regex,
      handler,
    });
  }

  defineCallbackQueryHandler(callbackDataName: string, handler: CallbackQueryHandlerFunction): void {
    this.logger.logMethodArgs('defineCallbackQueryHandler', {callbackDataName});
    this.middlewareRecord.callbackQuery.push({
      name: callbackDataName,
      handler,
    });
  }


  defineCommandHandler(commandName: string, handler: CommandHandlerFunction): void {
    this.logger.logMethodArgs('defineCommandHandler', commandName);
    this.middlewareRecord.message.push({
      regex: new RegExp(`/${commandName} ?(.|\n)*`, 'gmi'),
      handler,
    });
  }

  protected handleUpdate(update: Update): void {
    this.logger.logMethodArgs('handleUpdate', update);
    if ('message' in update && update.message != null) {
      if ('chat_shared' in update.message && update.message.chat_shared != null) {
        return this.handleChatSharedUpdate(update);
      }
      return this.handleTextMessageUpdate(update);
    }
    else if ('callback_query' in update && update.callback_query) {
      if ('data' in update.callback_query && update.callback_query.data) {
        return this.handleCallbackQueryUpdate(update);
      }
    }
  }

  protected handleCallbackQueryUpdate(update: UpdateType<'callback_query'>): void {
    this.logger.logMethod('handleCallbackQueryUpdate');
    for (const middleware of this.middlewareRecord.callbackQuery) {
      if (middleware.name === update.callback_query?.data) {
        const context = new AlwatrTelegramContext<UpdateType<'callback_query'>>(update, this.api);
        middleware.handler(context);
        break;
      }
    }
  }

  protected handleChatSharedUpdate(_update: UpdateType<'message'>): void {
  }

  protected handleTextMessageUpdate(update: UpdateType<'message'>): void {
    this.logger.logMethod('handleMessageUpdate');
    if (update.message?.text == null) return;
    for (const middleware of this.middlewareRecord.message) {
      const regex = new RegExp(middleware.regex); // js bug, must create new instance!
      if (regex.test(update.message?.text)) {
        const context = new AlwatrTelegramContext<UpdateType<'message'>>(update, this.api);
        middleware.handler(context);
        break;
      }
    }
  }

  protected async callApi(method: string, queryParameters?: QueryParameters): Promise<Response> {
    this.logger.logMethodArgs('callApi', {method, queryParameters});
    return fetch({
      retry: 1,
      method: 'POST',
      url: this.baseApiUrl + method,
      bodyJson: queryParameters,
    });
  }
}

/**
 * TODO:
 * 1- handle user black list
 */
