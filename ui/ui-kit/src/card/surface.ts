import {AlwatrBaseElement, customElement, html, css, type CSSResultGroup} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-surface': AlwatrSurface;
  }
}

/**
 * Alwatr Surface Element
 *
 * @extends AlwatrBaseElement
 *
 * @attr {Boolean} stated
 * @attr {Number|Boolean} elevated - tinted by default
 * @attr {Boolean} filled
 * @attr {Boolean} outlined
 * @attr {Boolean} active-outline - outline on active and focus
 * @attr {Boolean} disabled
 *
 * @cssprop {String} [--_surface-color-on=var(--sys-color-on-surface-hsl)]
 * @cssprop {String} [--_surface-color-bg=var(--sys-color-surface-hsl)]
 * @cssprop {String} [--_surface-elevation=var(--sys-surface-elevation-0)]
 * @cssprop {String} [--_surface-tint-color=var(--sys-color-surface-tint-hsl)]
 * @cssprop {String} [--_surface-state-color=var(--_surface-color-on)]
 * @cssprop {Number} [--_surface-tint-opacity=0]
 * @cssprop {Number} [--_surface-state-opacity=0]
 */
@customElement('alwatr-surface')
export class AlwatrSurface extends AlwatrBaseElement {
  static override styles: CSSResultGroup = css`
    :host {
      --_surface-color-on: var(--sys-color-on-surface-hsl);
      --_surface-color-bg: var(--sys-color-surface-hsl);
      --_surface-elevation: var(--sys-surface-elevation-0);
      --_surface-tint-color: var(--sys-color-surface-tint-hsl);
      --_surface-state-color: var(--_surface-color-on);
      --_surface-tint-opacity: 0;
      --_surface-state-opacity: 0;

      display: block;
      padding: calc(2 * var(--sys-spacing-track));
      color: hsl(var(--_surface-color-on));
      background-color: hsl(var(--_surface-color-bg));
      box-shadow: var(--_surface-elevation);
      background-image: linear-gradient(
          hsla(var(--_surface-tint-color), var(--_surface-tint-opacity)),
          hsla(var(--_surface-tint-color), var(--_surface-tint-opacity))
        ),
        linear-gradient(
          hsla(var(--_surface-state-color), var(--_surface-state-opacity)),
          hsla(var(--_surface-state-color), var(--_surface-state-opacity))
        );
      background-repeat: no-repeat;
      outline: 0;
      border-radius: var(--sys-radius-medium);
      overflow: hidden;
      overflow: clip;
      transition-property: opacity, background-color, color;
      transition-duration: var(--sys-motion-duration-small);
      transition-timing-function: var(--sys-motion-easing-normal);
      -webkit-tap-highlight-color: transparent;
    }

    :host([outlined]) {
      border: 1px solid var(--sys-color-outline);
    }

    :host([filled]) {
      --_surface-color-bg: var(--sys-color-surface-variant-hsl);
    }

    :host([elevated]) {
      --_surface-elevation: var(--sys-surface-elevation-1);
    }
    :host([elevated='2']) {
      --_surface-elevation: var(--sys-surface-elevation-2);
    }
    :host([elevated='3']) {
      --_surface-elevation: var(--sys-surface-elevation-3);
    }
    :host([elevated='4']) {
      --_surface-elevation: var(--sys-surface-elevation-4);
    }

    :host([tinted]),
    :host([elevated]) {
      --_surface-tint-opacity: var(--sys-surface-tint-opacity-1);
    }
    :host([tinted='2']),
    :host([elevated='2']) {
      --_surface-tint-opacity: var(--sys-surface-tint-opacity-2);
    }
    :host([tinted='3']),
    :host([elevated='3']) {
      --_surface-tint-opacity: var(--sys-surface-tint-opacity-3);
    }
    :host([tinted='4']),
    :host([elevated='4']) {
      --_surface-tint-opacity: var(--sys-surface-tint-opacity-4);
    }
    :host([tinted='5']) {
      --_surface-tint-opacity: var(--sys-surface-tint-opacity-5);
    }

    :host([stated]:hover) {
      --_surface-state-opacity: var(--sys-surface-state-opacity-hover);
    }
    :host([stated]:active) {
      --_surface-state-opacity: var(--sys-surface-state-opacity-pressed);
    }
    :host([stated]:focus),
    :host([stated]:focus-within) {
      --_surface-state-opacity: var(--sys-surface-state-opacity-focus);
    }

    :host([active-outline]:active),
    :host([active-outline]:focus),
    :host([active-outline]:focus-within) {
      border-color: var(--sys-color-primary);
      box-shadow: 0 0 0.4px 0.8px var(--sys-color-primary);
    }

    :host([stated]:hover:not(:active)),
    :host([stated]:focus),
    :host([stated]:focus-within) {
      --_surface-elevation: var(--sys-surface-elevation-1);
      --_surface-tint-opacity: var(--sys-surface-tint-opacity-1);
    }
    :host([stated][elevated]:hover:not(:active)),
    :host([stated][elevated]:focus),
    :host([stated][elevated]:focus-within) {
      --_surface-elevation: var(--sys-surface-elevation-2);
      --_surface-tint-opacity: var(--sys-surface-tint-opacity-2);
    }
    :host([stated][elevated='2']:hover:not(:active)),
    :host([stated][elevated='2']:focus),
    :host([stated][elevated='2']:focus-within) {
      --_surface-elevation: var(--sys-surface-elevation-3);
      --_surface-tint-opacity: var(--sys-surface-tint-opacity-3);
    }
    :host([stated][elevated='3']:hover:not(:active)),
    :host([stated][elevated='3']:focus),
    :host([stated][elevated='3']:focus-within) {
      --_surface-elevation: var(--sys-surface-elevation-4);
      --_surface-tint-opacity: var(--sys-surface-tint-opacity-4);
    }
    :host([stated][elevated='4']:hover:not(:active)),
    :host([stated][elevated='4']:focus),
    :host([stated][elevated='4']:focus-within) {
      --_surface-elevation: var(--sys-surface-elevation-5);
      --_surface-tint-opacity: var(--sys-surface-tint-opacity-5);
    }

    :host([disabled]) {
      pointer-events: none;
      box-shadow: var(--sys-surface-elevation-0) !important;
      color: var(--sys-color-on-surface) !important;
      opacity: var(--sys-surface-disabled-opacity);
    }

    :host([outlined][disabled]) {
      opacity: var(--sys-surface-disabled-outlined-opacity);
    }
  `;

  override render(): unknown {
    this._logger.logMethod('render');
    return html`<slot></slot>`;
  }
}
