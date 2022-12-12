import {config, logger} from '../config.js';
import {bot} from './bot.js';
import { sendMessage } from './send-message.js';

export async function launchBot() {
  logger.logMethod('launchBot');
  await bot.launch();
  logger.logProperty('botInfo', bot.botInfo);
  sendMessage(config.telegramBot.debugNotifyToken, '⚡️ Bot launched')
}
