import {router} from '@alwatr/router2';
import {renderState} from '@alwatr/util';

type PageName = 'home' | 'about' | 'products' | 'product' | 'contact';

/**
 * Your render process, can be lit-element requestUpdate or any other framework request render method.
 */
function render(): void {
  console.info('render');
  document.querySelector('textarea')!.value = JSON.stringify(router.route, null, 2);
  document.querySelector('.render')!.innerHTML = renderState(
    <PageName>router.route.sectionList[0] ?? 'home',
    {
      home: 'about',
      about: () => '<h1>About Page</h1>',
      products: () => '<h1>Product List</h1>',
      product: () => `<h1>Product ${router.route.sectionList[1]}</h1>`,
      contact: () => '<h1>Product Page</h1>',
      _default: () => '<h1>404 Not Found!</h1>',
    },
  ) ?? 'error!';
}

/**
 * Request update in route change.
 */
router.subscribe(render);

router.redirect('/');
