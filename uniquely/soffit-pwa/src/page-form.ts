import {customElement, AlwatrSmartElement, css, html} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-form': AlwatrPageForm;
  }
}

/**
 * Soffit Form Page
 */
@customElement('alwatr-page-form')
export class AlwatrPageForm extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
    }

    :host::-webkit-scrollbar {
      width: var(--sys-scrollbar-size);
      height: var(--sys-scrollbar-size);
    }

    :host::-webkit-scrollbar-corner,
    :host::-webkit-scrollbar-track {
      background-color: var(--sys-scrollbar-background);
    }

    :host::-webkit-scrollbar-track {
      margin: var(--sys-spacing-track);
    }

    :host::-webkit-scrollbar-thumb {
      background-color: var(--sys-scrollbar-color);
      border-radius: var(--sys-scrollbar-radius);
    }

    :host(:hover)::-webkit-scrollbar-thumb {
      background-color: var(--sys-scrollbar-color-hover);
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    form > * {
      margin: calc(2 * var(--sys-spacing-track));
    }

    input,
    input::placeholder {
      font-family: var(--sys-typescale-body-large-font-family-name);
      font-weight: var(--sys-typescale-body-large-font-weight);
      font-size: var(--sys-typescale-body-large-font-size);
      letter-spacing: var(--sys-typescale-body-large-letter-spacing);
      line-height: var(--sys-typescale-body-large-line-height);
    }

    input {
      padding: calc(2 * var(--sys-spacing-track));
      color: var(--sys-color-on-surface);
      border: 1px solid var(--sys-color-outline);
      line-height: calc(2 * var(--sys-spacing-track));
      border-radius: var(--sys-radius-xsmall);
    }

    input::placeholder {
      color: var(--sys-color-on-surface-variant);
    }

    input:hover {
      border: 1px solid var(--sys-color-on-surface);
    }

    input:focus {
      border: 2px solid var(--sys-color-primary);
    }
  `;

  override render(): unknown {
    super.render();
    return html`
      <form>
        <input dir="ltr" name="fname" placeholder="First name" value="Amir" />
        <input dir="ltr" name="lname" placeholder="Last name"/>
        <input dir="ltr" name="age" placeholder="Age" />
      </form>
    `;
  }
}
