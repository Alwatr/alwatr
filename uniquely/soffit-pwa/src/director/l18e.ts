import {setL18eLoader} from '@alwatr/i18n';

import type {L18eContext} from '@alwatr/type';

setL18eLoader((locale) => {
  if (locale.language === 'en') {
    return import('../l18r/en.json', {assert: {type: 'json'}}) as Promise<L18eContext>;
  }
  else {
    return import('../l18r/fa.json', {assert: {type: 'json'}}) as Promise<L18eContext>;
  }
});
