import {AlwatrDummyElement, css, customElement, html} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-text-input': AlwatrChatTextInput;
  }
}

/**
 * Alwatr chat text input element.
 */
@customElement('alwatr-chat-text-input')
export class AlwatrChatTextInput extends AlwatrDummyElement {
  static override styles = css`
    :host {
      /* flex options */
      display: flex;
      flex: 1 1 100%;
      align-items: end;
      /* font options */
      font-size: 16px;
      /* theme options */
      color: var(--md-sys-color-on-surface-variant);
      background-color: var(--md-sys-color-surface-variant);
      /* shape options */
      border-radius: 1.5em;
    }
    textarea {
      /* flex options */
      display: flex;
      flex: 1 1 100%;
      /* reset */
      resize: none;
      border: none;
      outline: none;
      background: transparent;
      min-width: unset;
      /* font options */
      font-family: var(--font-vazirmatn);
      font-size: 1em;
      /* spacing options */
      line-height: 1.25em;
      margin: auto;
      margin-inline: 0 1em;
      padding: 0.9em 1em;
    }
  `;

  override render(): unknown {
    return html` <textarea rows="1" placeholder="تایپ کنید" @input=${this.__inputChange}></textarea> `;
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
