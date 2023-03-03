import {
  cache,
  html,
  css,
  AlwatrBaseElement,
  SignalMixin,
  RouterMixin,
  UnresolvedMixin,
  type PropertyValues,
  type CSSResultGroup,
} from '@alwatr/element';
import {localeContextConsumer, setLocale} from '@alwatr/i18n';
import {RouteContext, routerOutlet, type RoutesConfig} from '@alwatr/router';
import {commandHandler, commandTrigger} from '@alwatr/signal';
import '@alwatr/ui-kit/snackbar/controller.js';
import '@alwatr/ui-kit/style/pwa.css';
import '@alwatr/ui-kit/style/token.css';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';
import {untilNextFrame} from '@alwatr/util';

import {scrollToTopCommand, topAppBarContextProvider} from './context.js';
import './signal/back-to-home-click.js';
import './signal/browser-back-click.js';
import './signal/register-service-worker-command.js';
import './signal/sw-user-notify.js';

/**
 * Alwatr Root Base Element
 *
 * Include: AlwatrPwaElement, root styles, router config, multi-page render
 */
export class AlwatrPwaElement extends RouterMixin(SignalMixin(UnresolvedMixin(AlwatrBaseElement))) {
  static override styles: CSSResultGroup = css`
    :host {
      contain: size layout paint style;
      box-sizing: border-box;
      height: 100%;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: stretch;
      overflow: hidden;
      overflow: clip;
    }

    main {
      contain: size layout paint style;
      flex-grow: 1;
      flex-shrink: 0;
    }

    .scroll-area {
      overflow-y: auto;
    }

    [unresolved] {
      display: block;
      text-align: center;
      font-family: var(--sys-typescale-headline-small-font-family-name);
      font-weight: var(--sys-typescale-headline-small-font-weight);
      font-size: var(--sys-typescale-headline-small-font-size);
      letter-spacing: var(--sys-typescale-headline-small-letter-spacing);
      line-height: var(--sys-typescale-headline-small-line-height);
    }
  `;

  override connectedCallback(): void {
    super.connectedCallback();
    if (!localeContextConsumer.getValue()) {
      setLocale();
    }
    this._signalListenerList.push(
        commandHandler.define<{smooth?: boolean}, undefined>(scrollToTopCommand.id, (option): undefined => {
          this.renderRoot.querySelector('.scroll-area')?.scrollTo({
            top: 0,
            left: 0,
            behavior: option.smooth ? 'smooth' : 'auto',
          });
          return;
        }),
    );
  }

  protected _routesConfig: RoutesConfig = {
    routeId: (routeContext) => routeContext.sectionList[0]?.toString(),
    templates: {
      home: () => html`<h1>Page Home ;)</h1>`,
      _404: () => html`<h1>404, Not found!</h1>`,
    },
  };

  protected override _routeContextUpdated(routeContext: RouteContext): void {
    super._routeContextUpdated(routeContext);
    scrollToTopCommand.request({});
  }

  protected override async scheduleUpdate(): Promise<void> {
    await untilNextFrame();
    super.scheduleUpdate();
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return [this._topAppBarTemplate(), this._mainTemplate(), this._navigationBarTemplate()];
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    commandTrigger.request('register_service_worker_command', {});
  }

  protected _topAppBarTemplate(): unknown {
    return html`<alwatr-top-app-bar context-signal=${topAppBarContextProvider.id}></alwatr-top-app-bar>`;
  }

  protected _mainTemplate(): unknown {
    return html`<main class="scroll-area">${cache(routerOutlet(this._routesConfig))}</main>`;
  }

  protected _navigationBarTemplate(): unknown {
    return html`<footer>Navigation bar...</footer>`;
  }
}
