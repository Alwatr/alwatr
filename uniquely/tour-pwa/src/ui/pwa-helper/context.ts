import {AlwatrContextSignal, AlwatrSignal} from '@alwatr/signal2';
import {TopAppBarContent} from '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

export const scrollToTopEvent = new AlwatrSignal<{smooth?: boolean}>({
  name: 'command_scroll_to_top',
});

export const topAppBarContext = new AlwatrContextSignal<TopAppBarContent>({
  name: 'top_app_bar_context',
});
