import {AlwatrElement} from '@alwatr/element';
import {l10n} from '@alwatr/i18n';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import '@alwatr/icon';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome;
  }
}

@customElement('page-home')
export class PageHome extends AlwatrElement {
  static override styles = [
    css`
      * {
        box-sizing: border-box;
        transition: all 1s ease;
      }
      :host {
        display: flex;
        flex-direction: column;
        padding: 1em 1em 0;
        height: 100%;
        width: 100vw;
      }
    `,
    css`
      .chat-main {
        display: flex;
        flex-direction: column;
        flex: 1 1 0;
        border-radius: 0.6em 0.6em 0 0;
        background-color: var(--secondary-color);
      }
      .chat-main__content {
        display: flex;
        flex-direction: column;
        flex: 1 1 0;
        padding: 1em;
        gap: 1em;
        overflow: auto;
      }

      .chat-message {
        display: flex;
        align-items: end;
        gap: 0.75em;
      }
      .chat-message__avatar {
        display: flex;
        flex-shrink: 0;
        width: 35px;
        height: 35px;
        overflow: hidden;
        border-radius: 50%;
      }
      .chat-message__avatar img {
        width: 100%;
        height: 100%;
      }
      .chat-message__text {
        display: flex;
        background-color: #fff;
        font-size: 14px;
        color: var(--text-primary-color);
        padding: 1em 0.85em;
      }

      .chat-message.start-side {
        justify-content: start;
      }
      .chat-message.start-side .chat-message__avatar {
        order: 1;
      }
      .chat-message.start-side .chat-message__text {
        order: 2;
        border-radius: 1.5em 1.5em 0.5em 1.5em;
      }

      .chat-message.end-side {
        justify-content: end;
      }
      .chat-message.end-side .chat-message__avatar {
        order: 2;
      }
      .chat-message.end-side .chat-message__text {
        order: 1;
        border-radius: 1.5em 1.5em 1.5em 0.5em;
      }

      .chat-footer {
        display: flex;
        align-items: end;
        gap: 0.1em;
        border-radius: 0.6em 0.6em 0 0;
        background-color: #fff;
        padding: 1em 0.1em;
      }
    `,
    css`
      button.alwatr__icon-button {
        display: inline-flex;

        justify-content: center;
        align-items: center;
        flex-shrink: 0;

        width: 3.5em;
        height: 3.5em;

        min-width: 46px;
        min-height: 46px;

        border: none;
        color: var(--text-secondary-color);
        background-color: #0000;
        border-radius: 27px;
        transition: background-color 300ms ease;
      }
      button.alwatr__icon-button:hover {
        background-color: #6661;
      }
      button.alwatr__icon-button:focus {
        background-color: #8883;
      }
      button.alwatr__icon-button alwatr-icon {
        font-size: 26px;
      }
    `,
    css`
      .alwatr__textarea {
        display: flex;
        flex: 1 1 0;
        background-color: var(--tertiary-color);
        border-radius: 24px;
        align-items: end;
        margin-inline-start: 1em;
      }
      .alwatr__textarea-input {
        display: flex;
        flex: 1 1 0;

        width: 0;
        resize: none;
        border: none;
        outline: none;
        background-color: transparent;
        font-family: var(--font-vazirmatn);
        font-size: 15px;
        line-height: 1.25em;
        margin: auto;
        padding: 0.5em 0;

        margin-inline-end: 1em;
        min-width: none;
      }
    `,
  ];

  override connectedCallback(): void {
    super.connectedCallback();

    l10n.resourceChangeSignal.addListener(() => {
      this.requestUpdate();
    });
  }

  override render(): TemplateResult {
    const messages = [
      this.__renderMessage('https://picsum.photos/200/200?random=1', 'لورم ایپسوم متن '),
      this.__renderMessage('https://picsum.photos/200/200?random=2', 'لورم ایپسوم متن ساختگی با تولید سادگی '),
      this.__renderMessage('https://picsum.photos/200/200?random=3', 'لورم ایپسوم متن ساختگی با '),
      this.__renderMessage(
          'https://picsum.photos/200/200?random=4',
          'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت ',
          'end',
      ),
      this.__renderMessage('https://picsum.photos/200/200?random=5', 'لورم ایپسوم متن ساختگی با تولید سادگی '),
    ];
    return html`
      <section class="chat-main">
        <div class="chat-main__content">${messages}</div>
        <footer class="chat-footer">
          <div class="alwatr__textarea">
            <button class="alwatr__textarea-slot alwatr__icon-button">
              <alwatr-icon name="mic-outline"></alwatr-icon>
            </button>
            <textarea
              class="alwatr__textarea-input"
              rows="1"
              placeholder="تایپ کنید"
              @input=${this.__inputChange}
            ></textarea>
          </div>
          <button class="alwatr__icon-button">
            <alwatr-icon name="happy-outline"></alwatr-icon>
          </button>
          <button class="alwatr__icon-button">
            <alwatr-icon name="add-circle-outline"></alwatr-icon>
          </button>
        </footer>
      </section>
    `;
  }

  private __renderMessage(avatarSource: string, message: string, side: 'start' | 'end' = 'start'): TemplateResult {
    return html`
      <div class="chat-message ${side + '-side'}">
        <div class="chat-message__avatar">
          <img src=${avatarSource} />
        </div>
        <div class="chat-message__text">${message}</div>
      </div>
    `;
  }

  private __inputChange(event: InputEvent): void {
    const textarea = event.target as HTMLTextAreaElement;

    const lines = textarea.value.split('\n').length;

    if (lines < 6) {
      textarea.rows = textarea.value.split('\n').length;
    }
    else {
      textarea.rows = 6;
    }
  }
}
