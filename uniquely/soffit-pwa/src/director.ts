import '@alwatr/pwa-helper/director.js';

import {setL18eLoader} from '@alwatr/i18n';

setL18eLoader(async (locale) => {
  if (locale.language === 'en') {
    return (await import('./l18r/en.js')).l18r;
  }
  else {
    return (await import('./l18r/fa.js')).l18r;
  }
});
