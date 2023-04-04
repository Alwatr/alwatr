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
  UpdateHandlerFunction,
  UpdateHandlerRecord,
} from './type.js';
import type {QueryParameters} from '@alwatr/type';
import type {Update} from '@grammyjs/types';

export * from './type.js';
export * from './api.js';
export * from './conversation.js';

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

  protected updateHandlerRecord: Partial<UpdateHandlerRecord> = {
    all: [],
    dataCallbackQuery: [],
    textMessage: [],
  };

  constructor(protected readonly config: AlwatrTelegramConfig) {
    this.logger.logMethodArgs('constructor', config);

    this.defineUpdateHandler<'callback_query'>('dataCallbackQuery', this.handleDataCallbackQueryUpdate.bind(this));
    this.defineUpdateHandler<'message'>('textMessage', this.handleTextMessageUpdate.bind(this));
  }

  /**
   * Set Webhook.
   *
   * @see https://core.telegram.org/bots/api#setwebhook
   */
  async setWebhook(listenHost = '0.0.0.0', listenPort = 8000): Promise<void> {
    this.logger.logMethod('setWebhook');
    const response = await this.callApi('setWebhook', {url: this.config.webhookDomain});
    const responseJson = await response.json();

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

  defineUpdateHandler<U extends Exclude<keyof Update, 'update_id'>>(
      updateType: keyof UpdateHandlerRecord,
      handler: UpdateHandlerFunction<UpdateType<U>>,
      priority?: 'high',
  ): void {
    this.logger.logMethodArgs('defineUpdateHandler', {updateType});
    if (priority === 'high') {
      this.updateHandlerRecord[updateType]?.unshift(handler as any); // TODO: better way?
    }
    else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.updateHandlerRecord[updateType]?.push(handler as any); // TODO: better way?
    }
  }

  protected handleUpdate(update: Update): void {
    this.logger.logMethod('handleUpdate');
    if (this.updateHandlerRecord.all != null) {
      for (const handler of this.updateHandlerRecord.all) {
        if (handler(update)) return;
      }
    }
    if (update.message != null) {
      if (this.updateHandlerRecord.textMessage != null) {
        for (const handler of this.updateHandlerRecord.textMessage) {
          if (handler(update)) return;
        }
      }
    }
    else if (update.callback_query != null) {
      if (update.callback_query.data != null) {
        if (this.updateHandlerRecord.dataCallbackQuery != null) {
          for (const handler of this.updateHandlerRecord.dataCallbackQuery) {
            if (handler(update)) return;
          }
        }
      }
    }
  }

  protected handleDataCallbackQueryUpdate(update: UpdateType<'callback_query'>): boolean {
    this.logger.logMethod('handleCallbackQueryUpdate');
    for (const middleware of this.middlewareRecord.callbackQuery) {
      if (middleware.name === update.callback_query?.data) {
        const context = new AlwatrTelegramContext<UpdateType<'callback_query'>>(update, this.api);
        middleware.handler(context);
        return true;
      }
    }
    return false;
  }

  protected handleTextMessageUpdate(update: UpdateType<'message'>): boolean {
    this.logger.logMethod('handleMessageUpdate');
    if (update.message?.text == null) return false;
    for (const middleware of this.middlewareRecord.message) {
      const regex = new RegExp(middleware.regex); // js bug, must create new instance!
      if (regex.test(update.message?.text)) {
        const context = new AlwatrTelegramContext<UpdateType<'message'>>(update, this.api);
        middleware.handler(context);
        return true;
      }
    }
    return false;
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
