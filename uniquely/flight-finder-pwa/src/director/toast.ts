import {commandHandler} from '@alwatr/signal';
import {toastController} from '@ionic/core';

commandHandler.define<{message: string}, Record<string, never>>('toast', async (ToastOptions) => {
  const toast = await toastController.create({
    animated: true,
    position: 'bottom',
    duration: 5_000,
    ...ToastOptions,
  });

  await toast.present();

  return {};
});
