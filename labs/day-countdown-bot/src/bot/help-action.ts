import {message} from '../director/l18e-loader.js';
import {userComposer} from '../lib/bot.js';

userComposer.action('help', async (ctx) => {
  await ctx.replyToChat(message('action_help'));
  await ctx.answerCbQuery();
});
