import {
  AlwatrTelegrafBotAdminComposer,
  AlwatrTelegrafChatAdminComposer,
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
export const botAdminComposer = new AlwatrTelegrafBotAdminComposer(isAdmin, deleteAdmin);
export const chatAdminComposer = new AlwatrTelegrafChatAdminComposer(
    bot.isChatAdmin.bind(bot),
    bot.isGroup.bind(bot),
    deleteAdmin,
);
export const userComposer = new AlwatrTelegrafComposer(deleteUser);

bot.use(botAdminComposer);
bot.use(chatAdminComposer);
bot.use(userComposer);
