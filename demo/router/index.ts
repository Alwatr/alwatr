import {initialRouter, routeChangeSignal} from '@alwatr/router';

initialRouter();

routeChangeSignal.addListener((route) => {
  console.info('routeChangeSignal', route);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.querySelector('textarea')!.value = JSON.stringify(route, null, 2);
});
