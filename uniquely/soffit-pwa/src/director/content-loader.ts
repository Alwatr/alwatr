import {localeContextConsumer} from '@alwatr/i18n';
import {contextProvider} from '@alwatr/signal';
import {Stringifyable} from '@alwatr/type';

localeContextConsumer.subscribe(async () => {
  const language = localeContextConsumer.getValue()?.language;
  let content;
  if (language === 'en') {
    content = (await import('../content/en.js')).homePageContent;
  }
  else {
    content = (await import('../content/fa.js')).homePageContent;
  }

  contextProvider.setValue('home-page-content', content as unknown as Stringifyable);
});
