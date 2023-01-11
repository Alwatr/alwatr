import {css} from '@alwatr/element';

export const focusRingStyle = css`
  :host {
    color: hsl(var(--_color-hsl, 0, 100%, 50%));
    outline: 0;
  }

  :host(:hover) {
    background-image: linear-gradient(
      hsla(var(--_color-hsl), var(--sys-opacity-hover)),
      hsla(var(--_color-hsl), var(--sys-opacity-hover))
    );
  }

  :host(:active) {
    background-image: linear-gradient(
      hsla(var(--_color-hsl), var(--sys-opacity-pressed)),
      hsla(var(--_color-hsl), var(--sys-opacity-pressed))
    );
  }

  :host(:focus),
  :host(:focus-within) {
    background-image: linear-gradient(
      hsla(var(--_color-hsl), var(--sys-opacity-focus)),
      hsla(var(--_color-hsl), var(--sys-opacity-focus))
    );
  }

  :host([disabled]) {
    opacity: 0.38;
    pointer-events: none;
    box-shadow: var(--elevation-0) !important;
  }
`;
