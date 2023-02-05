import '@alwatr/pwa-helper/director.js';

import {setL18eLoader} from '@alwatr/i18n';

setL18eLoader((locale) => {
  if (locale.language === 'en') {
    return import('./l18r/en.json', {assert: {type: 'json'}});
  }
  else {
    return import('./l18r/fa.json', {assert: {type: 'json'}});
  }
});
