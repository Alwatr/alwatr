import {fetch} from '@alwatr/fetch';
import {createLogger} from '@alwatr/logger';

import type {AlwatrTelegramApiConfig, SendMessageOption, answerCallbackQueryOption} from './type.js';
import type {StringifyableRecord} from '@alwatr/type';
import type {ApiResponse, Message, User} from 'typegram';

export class AlwatrTelegramApi {
  protected baseApiUrl = `https://api.telegram.org/bot${this.config.token}/`;

  protected logger = createLogger('alwatr/telegram-api');

  constructor(protected readonly config: AlwatrTelegramApiConfig) {
    this.logger.logMethodArgs('constructor', config);
  }

  protected escapeText(message: string): string {
    // eslint-disable-next-line no-useless-escape
    return message.replace(/(_|\*|\[|\]|\(|\)|~|`|>|#|\+|-|=|\||\{|\}|\.|!)/g, '\$1');
  }

  async sendMessage(
      chatId: number | string,
      text: string,
      option: SendMessageOption = {},
  ): Promise<Message.TextMessage | null> {
    this.logger.logMethodArgs('sendMessage', {text, option});

    text = this.escapeText(text);
    const response = await this.callApi('sendMessage', {
      chat_id: chatId,
      text,
      ...option,
    } as unknown as StringifyableRecord);

    const responseJson = await response.json();
    if (response.status != 200) {
      this.logger.error('sendMessage', 'send_message_failed', responseJson);
      return null;
    }
    return responseJson;
  }

  async getMe(): Promise<User | null> {
    this.logger.logMethod('getMe');
    const response = await this.callApi('getMe');

    const responseJson = await response.json();
    if (response.status != 200) {
      this.logger.error('getMe', 'get_bot_info_failed', responseJson);
      return null;
    }
    return responseJson;
  }

  async answerCallbackQuery(
      callbackQueryId: string,
      option?: answerCallbackQueryOption,
  ): Promise<ApiResponse<boolean> | null> {
    this.logger.logMethodArgs('answerCallbackQuery', {callbackQueryId, option});
    const response = await this.callApi('answerCallbackQuery', {
      callback_query_id: callbackQueryId,
      text: option?.text,
      show_alert: option?.show_alert,
      url: option?.url,
      cache_time: option?.cache_time,
    });
    const responseJson = await response.json();

    if (response.status != 200) {
      this.logger.error('answerCallbackQuery', 'answer_callback_query_failed', responseJson);
      return null;
    }

    return responseJson as ApiResponse<boolean>;
  }

  protected async callApi(method: string, bodyJson?: StringifyableRecord): Promise<Response> {
    this.logger.logMethodArgs('callApi', {method, queryParameters: bodyJson});
    return fetch({
      retry: 1,
      method: 'POST',
      url: this.baseApiUrl + method,
      bodyJson,
    });
  }
}
