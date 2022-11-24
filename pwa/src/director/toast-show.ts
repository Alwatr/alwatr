import {SignalInterface} from '@alwatr/signal';
import {IonicSafeString, toastController} from '@ionic/core';

export const toastShowSignal = new SignalInterface('show-toast');

toastShowSignal.setProvider(async (ToastOptions) => {
  const toast = await toastController.create({
    animated: true,
    position: 'bottom',
    duration: 5_000,
    ...ToastOptions,
    message: new IonicSafeString(ToastOptions.message ?? ''),
  });

  await toast.present();

  return toast;
});
