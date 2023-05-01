import {replaceNumber, localeContextConsumer} from '@alwatr/i18n';
import {eventListener} from '@alwatr/signal';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';
import {delay, getLocalStorageItem, setLocalStorageItem} from '@alwatr/util';

// FIXME: i18n

eventListener.subscribe('service_worker_registered', async () => {
  if (getLocalStorageItem('notify_new_version', null) !== null) {
    if (localeContextConsumer.getValue() == null) {
      await localeContextConsumer.untilChange();
    }
    localStorage.removeItem('notify_new_version');
    snackbarSignalTrigger.request({
      message: `به نسخه ${replaceNumber(_ALWATR_VERSION_.replace('-beta.', ' بتا '))} خوش‌آمدید.`,
    });
  }
});

eventListener.subscribe('service_worker_installed', () => void snackbarSignalTrigger.request({
  message: 'برنامه نصب شد و اکنون به صورت آفلاین در دسترس است.',
}));

eventListener.subscribe('service_worker_updated', async () => {
  setLocalStorageItem('notify_new_version', '');
  const response = await snackbarSignalTrigger.requestWithResponse({
    message: 'نسخه جدید این برنامه نصب و هم‌اکنون در دسترس است.',
    actionLabel: 'به‌روزرسانی',
    duration: -1,
  });
  if (response.actionButton) {
    await delay(500);
    window.location.reload();
  }
});

