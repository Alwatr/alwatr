import {AlwatrSurfaceElement, css, customElement, html, property, query} from '@alwatr/element';

import type {CSSResultGroup, PropertyValues} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-radio': AlwatrRadio;
  }
}

@customElement('alwatr-radio')
export class AlwatrRadio extends AlwatrSurfaceElement {
  static override styles: CSSResultGroup = [
    AlwatrSurfaceElement.styles,
    css`
      :host {
        --_surface-elevation: var(--sys-surface-elevation-0) !important;

        display: flex;
        align-items: center;
        justify-content: center;

        width: calc(5 * var(--sys-spacing-track));
        height: calc(5 * var(--sys-spacing-track));
        border-radius: 50%;
        cursor: pointer;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.38;
      }

      input {
        appearance: none;
        outline: none;
        margin: 0;
      }

      .check {
        width: calc(2.5 * var(--sys-spacing-track));
        height: calc(2.5 * var(--sys-spacing-track));
        padding: calc(0.25 * var(--sys-spacing-track));
        box-sizing: border-box;
        border: 2px solid var(--sys-color-on-surface-variant);
        border-radius: 50%;

        transition-property: border-color;
      }

      .check .check-point {
        background-color: var(--sys-color-primary);
        width: 100%;
        height: 100%;
        border-radius: 50%;
        opacity: 0;
        transform: scale(0.8);

        transition-property: opacity, transform;
      }

      :host([checked]) .check {
        border-color: var(--sys-color-primary);
      }
      :host([checked]) .check .check-point {
        transform: scale(1);
        opacity: 1;
      }

      .check,
      .check .check-point {
        transition-duration: var(--sys-motion-duration-small-out);
        transition-timing-function: var(--sys-motion-easing-exiting);
      }

      :host([checked]) .check,
      :host([checked]) .check .check-point {
        transition-duration: var(--sys-motion-duration-small-in);
        transition-timing-function: var(--sys-motion-easing-incoming);
      }
    `,
  ];

  @property({type: Boolean, reflect: true})
    checked = false;

  @property({type: String, reflect: true})
    name = '';

  @property({type: String})
    value = 'on';

  @property({type: Boolean, reflect: true})
    disabled = false;

  @query('input', true)
    inputElement?: HTMLInputElement;

  override render(): unknown {
    super.render();
    return html`
      <div class="check">
        <div class="check-point"></div>
      </div>
      <input
        type="radio"
        name=${this.name}
        .value=${this.value}
        .checked=${this.checked}
        @change=${this.handleChange}
      />
    `;
  }

  override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    if (this.checked === true) {
      this.uncheckAllSiblings();
    }

    this.setAttribute('stated', '');
    this.addEventListener('click', () => {
      const event = new MouseEvent('click', {bubbles: true});
      this.inputElement?.dispatchEvent(event);
    });
  }

  private handleChange(): void {
    if (this.disabled) return;

    this.uncheckAllSiblings();
    this.checked = true;
  }

  private uncheckAllSiblings(): void {
    for (const sibling of this.getNamedSiblings()) {
      if (sibling !== this) {
        sibling.checked = false;
      }
    }
  }

  private getNamedSiblings(): Array<AlwatrRadio | HTMLInputElement> {
    const root = this.getRootNode() as ParentNode;

    if (this.name.trim() == '' || root == null) return [];

    return Array.from(root.querySelectorAll<AlwatrRadio | HTMLInputElement>(`[name="${this.name}"]`));
  }
}
