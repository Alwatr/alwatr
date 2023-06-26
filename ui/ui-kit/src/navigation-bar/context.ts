import {AlwatrContextSignal, AlwatrEventSignal} from '@alwatr/signal2';

import type {NavigationBarContent, NavigationBarItemContent} from './navigation-bar.js';

export const navigationBarContext = new AlwatrContextSignal<NavigationBarContent>({name: 'navigation-bar'});
export const navigationBarEvent = new AlwatrEventSignal<NavigationBarItemContent>({name: 'navigation-bar'});
