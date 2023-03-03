import {contextProvider, commandTrigger} from '@alwatr/signal';

import type {TopAppBarContent} from '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

export const topAppBarContextProvider = contextProvider.bind<TopAppBarContent>('top_app_bar_context');
// export const topAppBarContextConsumer = contextConsumer.bind<TopAppBarContent>(topAppBarContextProvider.id);

export const scrollToTopCommand = commandTrigger.bind<{smooth?: boolean}, undefined>('command_scroll_to_top');
