import {SignalInterface} from '@alwatr/signal';

export const loadingSignal = new SignalInterface('loading');

loadingSignal.setProvider((loadingPromise) => {
  const oldValue = loadingSignal.value ?? [];

  if (loadingPromise.status === 'start') {
    return [...oldValue, loadingPromise.key].filter((key, index, array) => array.indexOf(key) === index);
  }

  // else
  return oldValue.filter((key) => key !== loadingPromise.key);
});
