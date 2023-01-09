import {css} from '@alwatr/element';

export const focusRingHost = css`
  :host {
    position: relative;
    overflow: hidden;
    overflow: clip;
  }
  :host::before {
    content: '';
    position: absolute;
    z-index: var(--sys-zindex-below);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    inset: 0;
    opacity: 0;
    transition: opacity var(--sys-motion-duration-small-out) var(--sys-motion-easing-linear);
    background-color: var(--sys-color-on-surface-variant);
  }

  :host(:hover)::before {
    opacity: var(--sys-opacity-hover);
    transition-duration: var(--sys-motion-duration-small-in);
  }

  :host(:active)::before {
    opacity: var(--sys-opacity-pressed);
    transition-duration: 0ms;
  }

  :host(:focus)::before {
    opacity: var(--sys-opacity-focus);
    transition-duration: var(--sys-motion-duration-small-in);
  }
`;
