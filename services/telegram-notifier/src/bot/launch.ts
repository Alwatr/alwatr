import {config, logger} from '../config.js';
import {bot} from './bot.js';
import {sendMessage} from './send-message.js';

export async function launchBot(): Promise<void> {
  logger.logMethod('launchBot');
  try {
    bot.botInfo ??= await bot.telegram.getMe();
    logger.logProperty('botInfo', bot.botInfo);

    bot.launch().catch((err) => {
      logger.error('launchBot', 'launch_bot_failed', (err as Error).stack || err);
    });

    await sendMessage(config.telegramBot.debugNotifyToken, '⚡️ Bot launched');
  }
  catch (err) {
    logger.error('launchBot', 'launch_bot_failed', (err as Error).stack || err);
  }
}
