import {css} from '@alwatr/element';

export const focusRingHost = css`
  :host {
    position: relative;
    overflow: hidden;
    overflow: clip;

    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
  }

  :host(:hover) {
    background-image: linear-gradient(rgba(0, 0, 0, var(--sys-opacity-hover)), rgba(0, 0, 0, var(--sys-opacity-hover)));
  }

  :host(:active) {
    background-image: linear-gradient(
      rgba(0, 0, 0, var(--sys-opacity-pressed)),
      rgba(0, 0, 0, var(--sys-opacity-pressed))
    );
  }

  :host(:focus) {
    background-image: linear-gradient(rgba(0, 0, 0, var(--sys-opacity-focus)), rgba(0, 0, 0, var(--sys-opacity-focus)));
  }
`;
