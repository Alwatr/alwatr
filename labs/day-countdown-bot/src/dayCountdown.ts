import {logger} from './config.js';
import {dateDistance, nime} from './lib/calender.js';
import {sendMessage} from './lib/send-message.js';
import {storageEngine} from './lib/storage.js';

export async function notify(): Promise<void> {
  const dayToLeft = dateDistance(nime.valueOf());
  for (const user of storageEngine.allObject()) {
    try {
      await sendMessage(user.id, `**${dayToLeft} روز مانده تا ولادت مهربان ترین پدر ♥️**`, {parse_mode: 'MarkdownV2'});
    }
    catch (err) {
      logger.error('notify', 'send_message_failed', {err});
      // TODO: remove blocked user
    }
  }
}
