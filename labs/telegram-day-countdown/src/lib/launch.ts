import {bot} from './bot.js';
import {logger} from '../config.js';

export async function launchBot(): Promise<void> {
  logger.logMethod('launchBot');
  try {
    bot.botInfo ??= await bot.telegram.getMe();
    logger.logProperty('botInfo', bot.botInfo);

    bot.launch().catch((err) => {
      logger.error('launchBot', 'launch_bot_failed', err);
    });
  }
  catch (err) {
    logger.error('launchBot', 'launch_bot_failed', err);
  }
}
