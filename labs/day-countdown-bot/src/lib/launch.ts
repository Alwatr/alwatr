import {bot} from './bot.js';
import {notifyToAdminList} from '../admin.js';
import {logger} from '../config.js';
import {message} from '../director/l18e-loader.js';

export async function launchBot(): Promise<void> {
  logger.logMethod('launchBot');
  try {
    bot.telegram.deleteWebhook({drop_pending_updates: true}); // delete all last updates
    bot.botInfo ??= await bot.telegram.getMe();
    logger.logProperty('botInfo', bot.botInfo);

    bot.launch().catch((err) => {
      logger.error('launchBot', 'launch_bot_failed', err);
    });

    notifyToAdminList(message('bot_start_admin_notify'));
  }
  catch (err) {
    logger.error('launchBot', 'launch_bot_failed', err);
  }
}
