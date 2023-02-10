import {
  AlwatrTelegrafAdminComposer,
  AlwatrTelegrafComposer,
  AlwatrTelegrafContext,
  AlwatrTelegram,
} from './telegram.js';
import {deleteAdmin, isAdmin} from '../admin.js';
import {config} from '../config.js';
import {deleteUser} from '../user.js';

export const bot = new AlwatrTelegram<AlwatrTelegrafContext>(config.telegramBot.token, {
  contextType: AlwatrTelegrafContext,
});
export const adminComposer = new AlwatrTelegrafAdminComposer(isAdmin, deleteAdmin);
export const userComposer = new AlwatrTelegrafComposer(deleteUser);

bot.use(adminComposer);
bot.use(userComposer);
