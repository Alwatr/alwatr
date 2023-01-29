/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {RouteContext, routerOutlet, RoutesConfig, routeContextConsumer} from '@alwatr/router';

const routes: RoutesConfig = {
  routeId: (route: RouteContext): string | undefined => route.sectionList[0]?.toString(),
  templates: {
    'home': () => '<h1>Home Page</h1>',
    '_404': () => '<h1>404 Not Found!</h1>',
    'about': () => '<h1>About Page</h1>',
    'product-list': () => '<h1>Product List ...</h1>',
    'contact': () => '<h1>Product Page</h1>',
  },
};

/**
 * Your render process, can be lit-element requestUpdate or any other framework request render method.
 */
function render(): void {
  console.info('render');
  document.querySelector('textarea')!.value = JSON.stringify(routeContextConsumer.getValue(), null, 2);
  document.querySelector('.render')!.innerHTML = routerOutlet(routes) as string;
}

/**
 * Request update in route change.
 */
routeContextConsumer.subscribe(render);
