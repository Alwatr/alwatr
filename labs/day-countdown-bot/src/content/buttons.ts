import {message} from '../director/l18e-loader.js';

import type {InlineKeyboardButton} from 'typegram';


export const subscribedSettingInlineKeyboard: InlineKeyboardButton[][] = [
  [{text: message('setting_help_button'), callback_data: 'help'}],
  [{text: message('setting_subscribed_button'), callback_data: 'toggleSubscribe'}],
];

export const settingInlineKeyboard: InlineKeyboardButton[][] = [
  [{text: message('setting_help_button'), callback_data: 'help'}],
  [{text: message('setting_subscribe_button'), callback_data: 'toggleSubscribe'}],
];
