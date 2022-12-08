import {SignalInterface} from '@alwatr/signal';
import {toastController} from '@ionic/core';

export const showToastSignal = new SignalInterface('toast');

showToastSignal.addListener(async (ToastOptions) => {
  const toast = await toastController.create({
    animated: true,
    position: 'bottom',
    duration: 5_000,
    ...ToastOptions,
  });

  await toast.present();
});
