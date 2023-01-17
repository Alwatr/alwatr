/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {type CacheStrategy, type CacheDuplicate, fetch} from '@alwatr/fetch';

const buttons = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;

for (const button of buttons) {
  const url = button.dataset.url;

  if (button && url) {
    button.addEventListener('click', async () => {
      try {
        const response = await fetch({
          url,
          mode: 'cors',
          timeout: +document.querySelector<HTMLSelectElement>('#timeout')!.value,
          cacheStrategy: document.querySelector<HTMLSelectElement>('#cacheStrategy')!.value as CacheStrategy,
          removeDuplicate: document.querySelector<HTMLSelectElement>('#removeDuplicate')!.value as CacheDuplicate,
          async revalidateCallback(response) {
            console.log('Demo revalidateCallback: %o', {url, response, text: await response.text()});
          },
        });
        console.log('Demo response: %o', {url, response, text: await response.text()});
      }
      catch (error) {
        console.warn('Demo catch error: %o', {url, error});
      }
    });
  }
}
