# @alwatr/router

Elegant powerful router (fundamental advance browser page routing) based on the simplicity of the signals written in tiny TypeScript module.

## Example usage

### Prepare

```ts
import { router } from 'https://esm.run/@alwatr/router';

/**
 * Initial and config the Router.
 */
router.initial();

/**
 * Add listener to `route-change` signal.
 */
router.signal.addListener((route) => {
  console.log(route);
});
```

### Rout object

Example page url: `https://example.com/product/100/book?cart=1&color=white#description`

```ts
interface Route
{
  sectionList: Array<string | number | boolean>; // [product, 100, book]
  queryParamList: ParamList; // {cart: 1, color: 'white'}
  hash: string; // '#description'
}
```

### Dynamic page rendering

```ts
const routes: routesConfig = {
  map: (route: Route) => route.sectionList[0]?.toString(),

  list: {
    'about': {
      render: () => html`<page-about></page-about>`,
    },
    'product-list': {
      render: () => {
        import('./page-product-list.js'); // lazy loading page
        html`<page-product-list></page-product-list>`,
      }
    },
    'contact': {
      render: () => html`<page-contact></page-contact>`,
    },

    'home': {
      render: () => html`<page-home></page-home>`,
    },
    '404': {
      render: () => html`<page-404></page-404>`,
    },
  },
};

...

// Any render function can be used.
render() {
  router.outlet(routes);
}

...

// Request update (call render again) on route change.
router.signal.addListener(() => this.requestUpdate());
```

### Make link from semantic route

`router.makeUrl(route)`

Make anchor valid href from route.

```html
<a href=${ router.makeUrl({sectionList: ['product', 100]}) }>
```
