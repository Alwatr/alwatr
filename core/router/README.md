# Alwatr Router - `@alwatr/router`

Elegant powerful router (fundamental advance browser page routing) based on the simplicity of the signals written in tiny TypeScript module.

## Example usage

### Prepare

```ts
import {router} from 'https://esm.run/@alwatr/router';

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

### Route object

Example page url: `https://example.com/product/100/book?cart=1&color=white#description`

```ts
interface Route {
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

### Full example with [lit-element](https://lit.dev)

<!-- prettier-ignore -->
```ts
import {css, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {router} from '@alwatr/router';

import type {ListenerInterface} from '@alwatr/signal';
import type {RoutesConfig} from '@alwatr/router';
import type {TemplateResult} from 'lit';

@customElement('my-element')
export class MyElement extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
  `;

  private _routes: RoutesConfig = {
    map: (route) => route.sectionList[0]?.toString(),
    list: {
      home: {
        render: () => html`<page-home>Page Home ...</page-home>`,
      },
      about: {
        render: () => html`<page-about>Page About ...</page-about>`,
      },
      article: {
        render: (route) =>
          route.sectionList[1] != null ?
            html`<page-article>Page Article ${route.sectionList[1]} ...</page-article>` :
            this._routes.list['404'],
      },
    },
  };

  constructor() {
    super();
    router.initial();
  }

  private _listenerList: Array<unknown> = [];

  override connectedCallback(): void {
    super.connectedCallback();
    this._listenerList.push(router.signal.addListener(() => this.requestUpdate()));
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._listenerList.forEach((listener) =>
      (listener as ListenerInterface<keyof AlwatrSignals>).remove()
    );
  }

  override render(): TemplateResult {
    return html`
      <h2>Hello World!</h2>

      <menu>
        <li><a href=${router.makeUrl({sectionList: ['home']})}>Home</a></li>
        <li><a href=${router.makeUrl({sectionList: ['about']})}>About</a></li>
        <li><a href=${router.makeUrl({sectionList: ['article', 100]})}>Article 100</a></li>
        <li><a href=${router.makeUrl({sectionList: ['contact']})}>Contact</a></li>
      </menu>

      <div class="page-container">${router.outlet(this._routes)}</div>
    `;
  }
}
```
