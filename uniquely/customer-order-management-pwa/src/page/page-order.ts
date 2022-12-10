import {AlwatrElement} from '@alwatr/element';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import styles from '../style';

import type {ListenerInterface} from '@alwatr/signal';
import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-order': PageOrder;
  }
}

@customElement('page-order')
export class PageOrder extends AlwatrElement {
  static override styles = [
    ...styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
      }

      ion-item.message__input::part(native) {
        --padding-start: 0;
        --inner-padding-end: 0;

        align-items: flex-end;
      }

      ion-item.message__input ion-buttons {
        margin: 0 !important;
      }

      ion-item.message__input ion-textarea {
        margin: 0 !important;
      }

      ion-card.message {
        margin: 0;
        border-radius: 0;
        box-shadow: none;
        border-bottom: 1px solid var(--ion-color-step-200);
      }

      ion-card.message alwatr-icon {
        font-size: 20px;
      }

      ion-card.message ion-card-content {
        padding-top: 0 !important;
      }

      ion-label p {
        display: flex;
        align-items: center;
      }

      ion-label p ion-text {
        display: flex;
        height: 100%;
        align-items: center;
      }

      ion-label p ion-text:nth-child(1) {
        padding-left: 4px;
      }
    `,
  ];

  protected _listenerList: Array<unknown> = [];

  override connectedCallback(): void {
    super.connectedCallback();
    // this._listenerList.push(router.signal.addListener(() => this.requestUpdate()));
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._listenerList.forEach((listener) => (listener as ListenerInterface<keyof AlwatrSignals>).remove());
  }

  override render(): TemplateResult {
    return html`
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>شرکت تولیدی بازرگانی سافیت</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content fullscreen>
        <ion-card>
          <ion-card-header>
            <ion-card-title>سفارش: <span style="direction:ltr;">958-001</span></ion-card-title>
            <ion-card-subtitle> وضعیت: در انتظار پرداخت </ion-card-subtitle>
          </ion-card-header>
        </ion-card>
        <ion-card>
          <ion-card class="message">
            <ion-item lines="none">
              <ion-avatar slot="start">
                <img src="/image/soffit.jpg" />
              </ion-avatar>
              <ion-label>
                <h2>بازرگانی سافیت</h2>
                <p>
                  <ion-text color="secondary">
                    <alwatr-icon name="time-outline"></alwatr-icon>
                  </ion-text>
                  <ion-text color="medium">
                    <ion-label> ۷ دقیقه پیش </ion-label>
                  </ion-text>
                </p>
              </ion-label>
            </ion-item>
            <ion-card-content>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و
              متون
            </ion-card-content>
          </ion-card>
          <ion-card class="message">
            <ion-item lines="none">
              <ion-avatar slot="start">
                <img src="/image/profile.jpg" />
              </ion-avatar>
              <ion-label>
                <h2>حسن روحانی</h2>
                <p>
                  <ion-text color="secondary">
                    <alwatr-icon name="time-outline"></alwatr-icon>
                  </ion-text>
                  <ion-text color="medium">
                    <ion-label> ۷ دقیقه پیش </ion-label>
                  </ion-text>
                </p>
              </ion-label>
            </ion-item>
            <ion-card-content>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و
              متون
            </ion-card-content>
          </ion-card>
          <ion-card class="message">
            <ion-item lines="none">
              <ion-avatar slot="start">
                <img src="/image/soffit.jpg" />
              </ion-avatar>
              <ion-label>
                <h2>بازرگانی سافیت</h2>
                <p>
                  <ion-text color="secondary">
                    <alwatr-icon name="time-outline"></alwatr-icon>
                  </ion-text>
                  <ion-text color="medium">
                    <ion-label> ۷ دقیقه پیش </ion-label>
                  </ion-text>
                </p>
              </ion-label>
            </ion-item>
            <ion-card-content>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و
              متون
            </ion-card-content>
          </ion-card>
          <ion-card class="message">
            <ion-item lines="none">
              <ion-avatar slot="start">
                <img src="/image/profile.jpg" />
              </ion-avatar>
              <ion-label>
                <h2>حسن روحانی</h2>
                <p>
                  <ion-text color="secondary">
                    <alwatr-icon name="time-outline"></alwatr-icon>
                  </ion-text>
                  <ion-text color="medium">
                    <ion-label> ۷ دقیقه پیش </ion-label>
                  </ion-text>
                </p>
              </ion-label>
            </ion-item>
            <ion-card-content>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و
              متون
            </ion-card-content>
          </ion-card>
          <ion-card class="message">
            <ion-item lines="none">
              <ion-avatar slot="start">
                <img src="/image/soffit.jpg" />
              </ion-avatar>
              <ion-label>
                <h2>بازرگانی سافیت</h2>
                <p>
                  <ion-text color="secondary">
                    <alwatr-icon name="time-outline"></alwatr-icon>
                  </ion-text>
                  <ion-text color="medium">
                    <ion-label> ۷ دقیقه پیش </ion-label>
                  </ion-text>
                </p>
              </ion-label>
            </ion-item>
            <ion-card-content>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و
              متون
            </ion-card-content>
          </ion-card>
          <ion-card class="message">
            <ion-item lines="none">
              <ion-avatar slot="start">
                <img src="/image/profile.jpg" />
              </ion-avatar>
              <ion-label>
                <h2>حسن روحانی</h2>
                <p>
                  <ion-text color="secondary">
                    <alwatr-icon name="time-outline"></alwatr-icon>
                  </ion-text>
                  <ion-text color="medium">
                    <ion-label> ۷ دقیقه پیش </ion-label>
                  </ion-text>
                </p>
              </ion-label>
            </ion-item>
            <ion-card-content>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و
              متون
            </ion-card-content>
          </ion-card>
        </ion-card>
      </ion-content>
      <ion-footer>
        <ion-item class="message__input">
          <ion-textarea rows="1" placeholder="پیام خود را وارد کنید" auto-grow></ion-textarea>
          <ion-buttons slot="start">
            <ion-button color="primary">
              <alwatr-icon slot="icon-only" name="send"></alwatr-icon>
            </ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button>
              <alwatr-icon slot="icon-only" name="happy-outline"></alwatr-icon>
            </ion-button>
          </ion-buttons>
        </ion-item>
      </ion-footer>
    `;
  }
}
