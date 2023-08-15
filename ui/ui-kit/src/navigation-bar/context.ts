import {AlwatrContextSignal, AlwatrSignal} from '@alwatr/signal2';

import type {NavigationBarContent, NavigationBarItemContent} from './navigation-bar.js';

export const navigationBarContext = new AlwatrContextSignal<NavigationBarContent>({name: 'navigation-bar'});
export const navigationBarEvent = new AlwatrSignal<NavigationBarItemContent>({name: 'navigation-bar'});
