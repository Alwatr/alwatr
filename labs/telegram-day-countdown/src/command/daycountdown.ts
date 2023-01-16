import {serviceRequest} from '@alwatr/fetch';

import {config, logger} from '../config.js';
import {bot} from '../lib/bot.js';


bot.action('daycountdown', async (ctx): Promise<void> => {
  const chatId = ctx.chat?.id;
  logger.logMethodArgs('action/daycountdown', {chatId});
  if (chatId == null) return;

  try {
    const response = await serviceRequest<{message: string}>({
      url: config.apiService.domain,
      method: 'PATCH',
      bodyJson: {
        chatId,
      },
      token: config.apiService.accessToken,
    });

    if (response.data.message != null) {
      ctx.reply(response.data.message);
    }
    else {
      throw new Error('Unhandled error', {cause: {response}});
    }
  }
  catch (err) {
    ctx.reply('Oh! error occurred');
    logger.error('action/daycountdown', (err as Error).message, {err});
  }
});
