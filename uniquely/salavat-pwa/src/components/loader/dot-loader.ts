import {AlwatrDummyElement, customElement, html, css} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-dot-loader': AlwatrDotLoader;
  }
}

@customElement('alwatr-dot-loader')
export class AlwatrDotLoader extends AlwatrDummyElement {
  static override styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.25em;
    }

    div {
      min-width: var(--sys-spacing-track);
      width: 0.5em;
      max-width: calc(3 * var(--sys-spacing-track));

      min-height: var(--sys-spacing-track);
      height: 0.5em;
      max-height: calc(3 * var(--sys-spacing-track));

      background-color: var(--sys-color-tertiary);
      border-radius: 50%;
      box-shadow: var(--sys-surface-elevation-2);

      animation-name: loadingAnimation;
      animation-duration: calc(3 * var(--sys-motion-duration-large));
      animation-timing-function: var(--sys-motion-easing-in-out);
      animation-iteration-count: infinite;
      animation-fill-mode: both;
    }

    div:nth-child(1) {
      animation-delay: calc(1.5 * var(--sys-motion-duration-large));
    }

    div:nth-child(2) {
      animation-delay: calc(2 * var(--sys-motion-duration-large));
    }

    div:nth-child(3) {
      animation-delay: calc(2.5 * var(--sys-motion-duration-large));
    }

    span {
      color: var(--sys-color-tertiary);
    }

    @keyframes loadingAnimation {
      50% {
        opacity: 30%;
      }
      100%,
      0% {
        opacity: 80%;
      }
    }
  `;

  override render(): unknown {
    return html`
      <div></div>
      <div></div>
      <div></div>
    `;
  }
}
