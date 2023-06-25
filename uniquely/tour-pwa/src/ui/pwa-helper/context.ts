import {AlwatrSignal} from '@alwatr/signal2';
import {untilNextFrame} from '@alwatr/util';

export const scrollToTopEvent = new AlwatrSignal<{smooth?: boolean}>({
  name: 'command_scroll_to_top',
});

scrollToTopEvent.subscribe(async (option): Promise<undefined> => {
  await untilNextFrame();
  document.documentElement.querySelector('.scroll-area')?.scrollTo({
    top: 0,
    left: 0,
    behavior: option.smooth ? 'smooth' : 'auto',
  });
});
