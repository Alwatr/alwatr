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
} from './type.js';
import type {QueryParameters} from '@alwatr/type';
import type {ApiResponse, CallbackQuery, Message, Update} from 'typegram';

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
   * {@link https://core.telegram.org/bots/api#setwebhook}
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
      this.handleUpdate(body as Update.MessageUpdate<Message.TextMessage>);
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

  protected handleUpdate(update: Update.MessageUpdate<Message.TextMessage> | Update.CallbackQueryUpdate): void {
    this.logger.logMethodArgs('handleUpdate', update);
    if ('message' in update) {
      this.handleMessageUpdate(update);
    }
    else if ('callback_query' in update) {
      if ('data' in update.callback_query) {
        this.handleCallbackQueryUpdate(update as Update.CallbackQueryUpdate<CallbackQuery.DataQuery>);
      }
    }
  }

  protected handleCallbackQueryUpdate(update: Update.CallbackQueryUpdate<CallbackQuery.DataQuery>): void {
    this.logger.logMethod('handleCallbackQueryUpdate');
    for (const middleware of this.middlewareRecord.callbackQuery) {
      if (middleware.name === update.callback_query.data) {
        const context = new AlwatrTelegramContext(update, this.api);
        middleware.handler(context);
        break;
      }
    }
  }

  protected handleMessageUpdate(update: Update.MessageUpdate<Message.TextMessage>): void {
    this.logger.logMethod('handleMessageUpdate');
    for (const middleware of this.middlewareRecord.message) {
      const regex = new RegExp(middleware.regex); // js bug, must create new instance!
      if (regex.test(update.message.text)) {
        const context = new AlwatrTelegramContext(update, this.api);
        middleware.handler(context);
        break;
      }
    }
  }

  protected async callApi(method: string, queryParameters?: QueryParameters): Promise<Response> {
    this.logger.logMethodArgs('callApi', {method, queryParameters});
    return fetch({
      url: this.baseApiUrl + method,
      queryParameters: queryParameters,
    });
  }
}

/**
 * TODO:
 * 1- handle user black list
 */
