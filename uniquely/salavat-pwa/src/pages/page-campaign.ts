import {customElement, AlwatrSmartElement, css, html} from '@alwatr/element';

import '@alwatr/ui-kit/card/card.js';

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
    }

    div {
      margin: 0 auto;
      text-align: justify;
      padding: 0 calc(1.5 * var(--sys-spacing-track));

      font-family: var(--sys-typescale-label-large-font-family-name);
      font-weight: var(--sys-typescale-label-large-font-weight);
      font-size: var(--sys-typescale-label-large-font-size);
      letter-spacing: var(--sys-typescale-label-large-letter-spacing);
      line-height: var(--sys-typescale-label-large-line-height);
    }

    .text-1 {
      max-width: 231px;
      margin-bottom: 8px;
    }

    .text-2 {
      font-weight: 900;
      margin-bottom: 12px;
    }

    .text-3 {
      max-width: 280px;
      padding: 0 calc(3 * var(--sys-spacing-track));
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
    `;
  }
}
