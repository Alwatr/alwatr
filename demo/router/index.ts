/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {router} from '@alwatr/router';

import type {Route, RoutesConfig} from '@alwatr/router';

/**
 * Initial and config the Router.
 */
router.initial();

const routes: RoutesConfig = {
  map: (route: Route): string | undefined => route.sectionList[0]?.toString(),

  list: {
    'about': {
      render: (): string => '<h1>About Page</h1>',
    },
    'product-list': {
      render: (): string => '<h1>Product List ...</h1>',
    },
    'contact': {
      render: (): string => '<h1>Product Page</h1>',
    },

    'home': {
      render: (): string => '<h1>Home Page</h1>',
    },
    '404': {
      render: (): string => '<h1>404 Not Found!</h1>',
    },
  },
};

/**
 * Your render process, can be lit-element requestUpdate or any other framework request render method.
 */
function render(): void {
  console.info('render');
  document.querySelector('textarea')!.value = JSON.stringify(router.currentRoute, null, 2);
  document.querySelector('.render')!.innerHTML = router.outlet(routes) as string;
}

/**
 * Request update in route change.
 */
router.signal.addListener(render);
