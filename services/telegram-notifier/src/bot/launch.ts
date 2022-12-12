import {config, logger} from '../config.js';
import {bot} from './bot.js';
import {sendMessage} from './send-message.js';

export async function launchBot(): Promise<void> {
  logger.logMethod('launchBot');
  try {
    await bot.launch();
  }
  catch (err) {
    logger.error('launchBot', 'launch_bot_failed', (err as Error).stack || err);
    throw new Error('launch_bot_failed');
  }
  logger.logProperty('botInfo', bot.botInfo);
  sendMessage(config.telegramBot.debugNotifyToken, '⚡️ Bot launched');
}
