import {AlwatrServiceResponse, serviceRequest} from '@alwatr/fetch';

import {config, logger} from './config.js';
import {storageClient} from './lib/storage.js';

const userList = (await storageClient.getStorage()).data;
const userKeyList = Object.keys(userList);
const message = generateMessage(await getDayCountdown());

for (let i = 0; i < userKeyList.length; i++) {
  sendDayCountdown(userKeyList[i], message);
}

function sendDayCountdown(chatId: string, message: string): Promise<AlwatrServiceResponse> {
  logger.logMethodArgs('sendDayCountdown', {chatId, message});
  return serviceRequest({
    method: 'POST',
    url: config.telegramNotifier.domain,
    token: config.telegramNotifier.token,
    bodyJson: {
      chatId,
      message,
    },
  });
}

function generateMessage(dayCountdown: number): string {
  logger.logMethod('generateMessage');
  return `
      ${dayCountdown} روز تا نیمه شعبان، ولادت مهربان‌ترین پدر ♥️
  `.replaceAll('      ', '');
}

async function getDayCountdown(): Promise<number> {
  const repsponse = await serviceRequest<{timeToLeft: number}>({
    method: 'GET',
    url: config.api.domain,
    token: config.api.token,
  });

  return repsponse.data.timeToLeft;
}
