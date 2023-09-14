import {l10n} from '@alwatr/i18n2';
import {createLogger} from '@alwatr/logger';
import {delay} from '@alwatr/util';
const logger = createLogger('demo/l18n', true);

l10n.subscribe(() => {
  logger.logProperty?.('locale', l10n.locale);
  logger.logProperty?.('hi', l10n.message('hi'));
});

logger.logProperty?.('hi', l10n.message('hi'));

l10n.setResourceLoader((locale) => {
  return {
    ok: true,
    meta: {
      code: locale.language === 'fa' ? 'fa-IR' : 'en-US',
      rev: 2,
    },
    data: locale.language === 'fa' ? {
      'hi': 'سلام',
    } : {
      'hi': 'hello',
    },
  };
});

l10n.setLocale('fa');

const now = Date.now();
// @ts-expect-error constructor type
for (const unit of l10n.constructor._timeUnits) {
  const sec = unit.seconds * 1000;
  logger.logProperty?.('time ' + unit.label, l10n.relativeTime(now, now - sec));
  logger.logProperty?.('time ' + unit.label, l10n.relativeTime(now, now - 2 * sec));
  logger.logProperty?.('time ' + unit.label, l10n.relativeTime(now, now - 3 * sec));
  logger.logProperty?.('time ' + unit.label, l10n.relativeTime(now, now + sec));
  logger.logProperty?.('time ' + unit.label, l10n.relativeTime(now, now + 2 * sec));
  logger.logProperty?.('time ' + unit.label, l10n.relativeTime(now, now + 3 * sec));
}

await delay(500);

l10n.setLocale('en');
