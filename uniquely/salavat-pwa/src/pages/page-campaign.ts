import {customElement, AlwatrSmartElement, css, html} from '@alwatr/element';

import '@alwatr/ui-kit/card/card.js';

import '../components/button/text-button.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-campaign': AlwatrPageCampaign;
  }
}

@customElement('alwatr-page-campaign')
export class AlwatrPageCampaign extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      backdrop-filter: blur(4px);
      padding: 0 calc(2 * var(--sys-spacing-track)) calc(2 * var(--sys-spacing-track));
    }

    .text-1,
    .text-2,
    .text-3,
    .buttons-row {
      margin: 0 auto;
      text-align: justify;
      padding: 0 calc(1.5 * var(--sys-spacing-track));

      font-family: var(--sys-typescale-label-medium-font-family-name);
      font-weight: var(--sys-typescale-label-medium-font-weight);
      font-size: var(--sys-typescale-label-medium-font-size);
      letter-spacing: var(--sys-typescale-label-medium-letter-spacing);
      line-height: var(--sys-typescale-label-medium-line-height);
    }

    .text-1 {
      max-width: 241px;
      margin-bottom: calc(0.5 * var(--sys-spacing-track));
    }

    .text-2 {
      font-weight: 900;
      margin-bottom: calc(1.5 * var(--sys-spacing-track));
    }

    .text-3 {
      max-width: 256px;
      padding: 0 calc(3 * var(--sys-spacing-track));
    }

    .buttons-row {
      display: flex;
      flex-grow: 1;
      margin-top: calc(2 * var(--sys-spacing-track));
      gap: var(--sys-spacing-track);
    }
  `;

  override render(): unknown {
    super.render();

    return html`
      <div class="text-1">
        گاهی آنقدر تلخی زندگی‌مان زیاد می شود،که رنگِ خوشِ شادی روزهایمان، در قرنطینه تلخِ روزگار به خاکستری می زند. اما
        ما یاد گرفته ایم تا دهانمان را با سلام و صلوات بر محمد و آل او و درخواست فرج فرزندشان شیرین کنیم تا همه چیز با
        نشاط شود و غم، از زندگی‌مان رخت ببندد.
      </div>
      <div class="text-2">سلامی به شیرینی با تو بودن...</div>
      <div class="text-3">
        به مناسبت ایام پر برکت شعبان و رمضان، تصمیم گرفتیم کمپین نذر "یک میلیون" صلوات به نیت دعا برای سلامتی و ظهور
        امام زمان (عجل الله تعالی فرجه الشریف) را از میلاد حضرتش تا میلاد کریم اهل‌بیت، حضرت امام حسن مجتبی (علیه
        السلام) در نیمه رمضان آغاز کنیم. برای هماهنگی و رسیدن به عدد یک میلیون صلوات، خواهشمندیم تعداد صلوات‌های فرستاده
        شده را در شمارنده وارد کنید.
      </div>
      <div class="buttons-row">
        <alwatr-text-button
          icon="salavat-small"
          url-prefix="/images/icons/"
          label="ثبت صلوات"
          href="/home/"
        ></alwatr-text-button>
        <alwatr-text-button icon="logo-instagram" label="دانلود استوری"></alwatr-text-button>
      </div>
    `;
  }
}
