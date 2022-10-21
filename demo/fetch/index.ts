import {fetch} from '@alwatr/fetch';

const buttons = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;

for (const button of buttons) {
  const url = button.dataset.url;

  if (button && url) {
    button.addEventListener('click', async () => {
      if (button.classList.contains('loading')) return;

      button.classList.add('loading');
      try {
        const response = await fetch(url);
        console.log('Demo response: %o', {url, response});
      }
      catch (error) {
        console.warn('Demo catch error: %o', {url, error});
      }
      button.classList.remove('loading');
    });
  }
}
