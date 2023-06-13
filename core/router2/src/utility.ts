import type {TemplateList} from './type.js';

export const renderState = <PageName extends string>(
  page: PageName,
  templateList: TemplateList<PageName>,
  thisArg: unknown = null,
): (() => unknown) => {
  let render = templateList[page];

  while (typeof render === 'string') {
    render = templateList[render as PageName];
  }

  return render.call(thisArg) as () => unknown;
};

/**
 * The result of calling the current route's render() callback base on routesConfig.
 *
 * alias for `routesConfig.templates[routesConfig.routeId(currentRoute)](currentRoute)`
 *
 * if the location is app root and `routeId()` return noting then redirect to `home` automatically
 * if `routeId()` return noting or render function not defined in the `templates` redirected to `_404` routeId.
 *
 * Example:
 *
 * ```ts
 * const routeConfig = {
 *   routeId: (routeContext) => routeContext.sectionList[0]?.toString(),
 *   templates: {
 *     'about': () => html`<page-about></page-about>`,
 *     'product-list': () => {
 *       import('./page-product-list.js'); // lazy import
 *       return html`<page-product-list></page-product-list>`,
 *     },
 *     'contact': () => html`<page-contact></page-contact>`,
 *     'home': () => html`<page-home></page-home>`,
 *     '_404': () => html`<page-404></page-404>`,
 *   },
 * };
 *
 * routerOutlet(routeConfig);
 * ```
 */
// routerOutlet(routesConfig: RoutesConfig, thisArg: unknown = null): unknown {
//   this._logger.logMethodArgs?.('routerOutlet', {routesConfig});

//   const routeContext = this._getDetail();

//   if (routeContext == null) {
//     this._logger.accident('routerOutlet', 'route_context_undefined', 'Route context not provided yet.');
//     return;
//   }

// const routeId = routesConfig.routeId(routeContext) ?? '';
// let render = routesConfig.templates[routeId];

// while (typeof render === 'string') {
//   render = routesConfig.templates[render];
// }

// try {
//   if (typeof render === 'function') {
//     return render.call(thisArg, routeContext);
//   }
//   // else
//   if (routeId === '') {
//     return routesConfig.templates.home(routeContext);
//   }
//   // else
//   this._logger.incident?.(
//       'routerOutlet',
//       'page_not_found',
//       'Requested page not defined in routesConfig.templates',
//       {
//         routeId,
//         routeContext,
//         routesConfig,
//       },
//   );
//   return routesConfig.templates._404(routeContext);
// }
// catch (err) {
//   this._logger.error('routerOutlet', 'render_failed', err);
//   return routesConfig.templates.home(routeContext);
// }
// }
