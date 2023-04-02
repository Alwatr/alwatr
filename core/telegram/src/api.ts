import {fetch} from '@alwatr/fetch';
import {createLogger} from '@alwatr/logger';

import type {AlwatrTelegramApiConfig, SendMessageOption} from './type.js';
import type {QueryParameters} from '@alwatr/type';
import type {Message, User} from 'typegram';

export class AlwatrTelegramApi {
  protected baseApiUrl = `https://api.telegram.org/bot${this.config.token}/`;

  protected logger = createLogger('alwatr/telegram-api:bot-' + this.config.username);

  constructor(protected readonly config: AlwatrTelegramApiConfig) {
    this.logger.logMethodArgs('constructor', config);
  }

  protected escapeText(message: string): string {
    return message.replace(/(_|\*|\[|\]|\(|\)|~|`|>|#|\+|-|=|\||\{|\}|\.|!)/g, '\\$1');
  }

  async sendMessage(
      chatId: number| string,
      text: string,
      option?: SendMessageOption,
  ): Promise<Message.TextMessage | null> {
    this.logger.logMethodArgs('sendMessage', {text, option});

    text = this.escapeText(text);
    const response = await this.callApi('sendMessage', {
      chat_id: chatId,
      text,
      ...option,
    });

    const responseJson = await response.json();
    if (response.status != 200) {
      this.logger.error('sendMessage', 'send_message_failed', responseJson);
      return null;
    }
    return responseJson;
  }


  protected async callApi(method: string, queryParameters?: QueryParameters): Promise<Response> {
    this.logger.logMethodArgs('callApi', {method, queryParameters});
    return fetch({
      url: this.baseApiUrl + method,
      queryParameters: queryParameters,
    });
  }
}
