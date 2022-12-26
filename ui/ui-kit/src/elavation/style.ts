import {css} from '@alwatr/element';

export const hostElevation = css`
  :host {
    position: relative;
  }
  :host::before,
  :host::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }
  :host::before {
    opacity: 0.3;
    box-shadow: 0px
      calc(
        1px *
          (
            clamp(0, var(--_elevation-level), 1) + clamp(0, var(--_elevation-level) - 3, 1) + 2 *
              clamp(0, var(--_elevation-level) - 4, 1)
          )
      )
      calc(
        1px *
          (
            2 * clamp(0, var(--_elevation-level), 1) + clamp(0, var(--_elevation-level) - 2, 1) +
              clamp(0, var(--_elevation-level) - 4, 1)
          )
      )
      0px var(--md-sys-color-shadow);
  }
  :host::after {
    opacity: 0.15;
    box-shadow: 0px
      calc(
        1px *
          (
            clamp(0, var(--_elevation-level), 1) + clamp(0, var(--_elevation-level) - 1, 1) + 2 *
              clamp(0, var(--_elevation-level) - 2, 3)
          )
      )
      calc(1px * (3 * clamp(0, var(--_elevation-level), 2) + 2 * clamp(0, var(--_elevation-level) - 2, 3)))
      calc(1px * (clamp(0, var(--_elevation-level), 4) + 2 * clamp(0, var(--_elevation-level) - 4, 1)))
      var(--md-sys-color-shadow);
  }
`;
