import {fetch} from '@alwatr/fetch';

import type {CacheStrategy} from '@alwatr/fetch';

const buttons = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;

for (const button of buttons) {
  const url = button.dataset.url;

  if (button && url) {
    button.addEventListener('click', async () => {
      if (button.classList.contains('loading')) return;

      button.classList.add('loading');
      try {
        const response = await fetch({
          url,
          timeout: 2000,
          retry: 2,
          mode: 'cors',
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          cacheStrategy: document.querySelector<HTMLSelectElement>('#cacheSelect')!.value as CacheStrategy,
        });
        console.log('Demo response: %o', {url, response, text: await response.text()});
      }
      catch (error) {
        console.warn('Demo catch error: %o', {url, error});
      }
      button.classList.remove('loading');
    });
  }
}
