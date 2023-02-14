import {customElement, css, html, SignalMixin, AlwatrBaseElement} from '@alwatr/element';
import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/card/surface.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-card': AlwatrPageCard;
  }
}

const loremText = `مداد رنگی ها مشغول بودند به جز مداد سفید، هیهم باشیم شاید فردا ما هم در کنار هم نباشیم…`;

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-page-card')
export class AlwatrPageCard extends SignalMixin(AlwatrBaseElement) {
  static override styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      padding: var(--sys-spacing-track);
      box-sizing: border-box;
      height: 100%;
      gap: var(--sys-spacing-track);
      overflow-y: scroll;
    }

    alwatr-surface,
    alwatr-icon-box {
      flex-grow: 1;
      width: 25%;
      user-select: none;
      min-height: 15rem;
    }

    alwatr-surface {
      display: flex;
      align-items: flex-end;
    }

    input {
      padding: var(--sys-spacing-track);
      color: inherit;
      background-color: transparent;
      border: 0;
      border-bottom: 1px solid transparent;
    }

    input:focus {
      border-bottom-color: currentcolor;
      outline: 0;
    }
  `;

  override render(): unknown {
    this._logger.logMethod('render');
    return html`
      <alwatr-icon-box
        .content=${{icon: 'gift-outline', headline: 'قرعه کشی', description: loremText}}
      ></alwatr-icon-box>
      <alwatr-icon-box
        .content=${{icon: 'download-outline', headline: 'کاتالوگ', description: loremText}}
      ></alwatr-icon-box>
      <alwatr-icon-box
        .content=${{icon: 'earth-outline', headline: 'وب‌سایت', description: loremText, href: '/'}}
      ></alwatr-icon-box>

      <alwatr-surface stated elevated><input type="text" value="elevated" /></alwatr-surface>
      <alwatr-surface stated elevated><input type="text" value="elevated" /></alwatr-surface>
      <alwatr-surface stated elevated disabled><input type="text" value="elevated" disabled /></alwatr-surface>

      <alwatr-surface stated elevated="2"><input type="text" value="elevated 2" /></alwatr-surface>
      <alwatr-surface stated elevated="3"><input type="text" value="elevated 3" /></alwatr-surface>
      <alwatr-surface stated elevated="4"><input type="text" value="elevated 4" /></alwatr-surface>

      <alwatr-surface stated filled><input type="text" value="filled" /></alwatr-surface>
      <alwatr-surface stated elevated filled><input type="text" value="filled" /></alwatr-surface>
      <alwatr-surface stated filled disabled><input type="text" value="filled" disabled /></alwatr-surface>

      <alwatr-surface stated outlined><input type="text" value="outlined" /></alwatr-surface>
      <alwatr-surface stated outlined><input type="text" value="outlined" /></alwatr-surface>
      <alwatr-surface stated outlined disabled><input type="text" value="outlined" disabled /></alwatr-surface>
    `;
  }
}
