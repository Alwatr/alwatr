import {contextProvider} from '@alwatr/signal';

import type {TopAppBarContent} from '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

export const topAppBarContextProvider = contextProvider.bind<TopAppBarContent>('top-app-bar-context');
// export const topAppBarContextConsumer = contextConsumer.bind<TopAppBarContent>(topAppBarContextProvider.id);
