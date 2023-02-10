import {AlwatrTelegrafContext, AlwatrTelegram} from './telegram.js';
import {config} from '../config.js';

export const bot = new AlwatrTelegram(config.telegramBot.token, {contextType: AlwatrTelegrafContext});
