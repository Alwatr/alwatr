import {bot} from './bot.js';
import {sendMessage} from './send-message.js';
import {config, logger} from '../config.js';

export async function launchBot(): Promise<void> {
  logger.logMethod?.('launchBot');
  try {
    bot.setWebhook();

    const botInfo = await bot.api.getMe();
    if (botInfo == null) throw new Error('authentication_failed');
    logger.logProperty?.('botInfo', botInfo);

    await sendMessage(config.telegramAdmin.debugNotifyToken, '⚡️ Bot launched');
  }
  catch (err) {
    logger.error('launchBot', 'launch_bot_failed', err);
  }
}
