import {contextProvider, commandTrigger, eventTrigger} from '@alwatr/signal';

import type {NavigationBarContent} from '@alwatr/ui-kit/navigation-bar/navigation-bar.js';
import type {TopAppBarContent} from '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

export const topAppBarContextProvider = contextProvider.bind<TopAppBarContent>('top_app_bar_context');
// export const topAppBarContextConsumer = contextConsumer.bind<TopAppBarContent>(topAppBarContextProvider.id);

export const navigationBarActiveItemIdEventTrigger = eventTrigger.bind<{id: string}>('active_item_id_signal');
export const navigationBarContextProvider = contextProvider.bind<NavigationBarContent>('active_item_id_signal');

export const scrollToTopCommand = commandTrigger.bind<{smooth?: boolean}, undefined>('command_scroll_to_top');
