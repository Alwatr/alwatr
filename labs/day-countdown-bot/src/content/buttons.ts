import {message} from '../director/l18e-loader.js';

import type {InlineKeyboardButton} from '@grammyjs/types';


export const subscribedStartInlineKeyboard: InlineKeyboardButton[][] = [
  [{text: message('setting_subscribed_button'), callback_data: 'toggleSubscribe'}],
];

export const NotStartInlineKeyboard: InlineKeyboardButton[][] = [
  [{text: message('setting_subscribe_button'), callback_data: 'toggleSubscribe'}],
];
