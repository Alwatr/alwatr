import { logger } from "../config.js";
import { bot } from "../bot.js";

export let adminChatId: number | null;

bot.command('start', async (ctx) => {
  adminChatId = ctx.chat.id;

  await ctx.reply('Now you are admin!')
  logger.logProperty('adminChatId', adminChatId);
});
