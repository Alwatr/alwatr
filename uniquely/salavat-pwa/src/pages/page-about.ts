import {customElement, AlwatrSmartElement, css, html} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-about': AlwatrPageAbout;
  }
}

@customElement('alwatr-page-about')
export class AlwatrPageAbout extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      backdrop-filter: blur(4px);
      padding: 0 calc(2 * var(--sys-spacing-track)) calc(2 * var(--sys-spacing-track));
    }

    div {
      margin: 0 auto;
      text-align: justify;
      padding: 0 calc(1.5 * var(--sys-spacing-track));

      font-family: var(--sys-typescale-label-small-font-family-name);
      font-weight: var(--sys-typescale-label-small-font-weight);
      font-size: var(--sys-typescale-label-small-font-size);
      letter-spacing: var(--sys-typescale-label-small-letter-spacing);
      line-height: var(--sys-typescale-label-small-line-height);
    }

    .text-1 {
      max-width: 269px;
      margin-bottom: calc(.5 * var(--sys-spacing-track));
    }

    .text-2 {
      font-weight: 800;
      margin-bottom: calc(1.5 * var(--sys-spacing-track));
      font-family: var(--sys-typescale-label-medium-font-family-name);
      font-size: var(--sys-typescale-label-medium-font-size);
      letter-spacing: var(--sys-typescale-label-medium-letter-spacing);
      line-height: var(--sys-typescale-label-medium-line-height);
    }

    .text-3 {
      font-weight: 900;
      font-family: var(--sys-typescale-label-large-font-family-name);
      font-size: var(--sys-typescale-label-large-font-size);
      letter-spacing: var(--sys-typescale-label-large-letter-spacing);
      line-height: var(--sys-typescale-label-large-line-height);

      padding: 0 calc(3 * var(--sys-spacing-track));
    }
  `;

  override render(): unknown {
    super.render();

    return html`
      <div class="text-1">
        به نظر ما یه سری اتفاقات تو تاریخ موندگار میشه، به این جهت که میتونه کل دنیا رو درگیر خودش کنه. مثل بیماری کرونا
        که مدتیه درگیرش هستیم. هر سال به نیمه شعبان که می‌رسیدیم دور هم جمع می‌شدیم تا بتوانیم با گرفتن یه جشن کوچیک،
        شاد باشیم از بودنش، شادی کنیم برای داشتنش و یادمون بمونه که وظیفه داریم تلاش کنیم برای اومدنش. اما کرونا امسال
        رو برامون متفاوت کرد. واسه همین تصمیم گرفتیم نیمه ۹۹ در بستر فضای مجازی فعالیت کنیم و نتیجش شد همین صلوات‌شماری
        که می بینید. خط به خط کدهای برنامه نویسی "صلوات"، به پیکسل طراحی های گرافیکی "صلوات"، و ثانیه به ثانیه زمان که
        برای ایجاد این بستر گذاشته شده، با عشق و به یاد کسی بوده که منتظریم با اومدنش تمام روزهای بعد از بودنش رو
        برامون، "با خاطره خوش"، به یادماندنی کنه...
      </div>
      <div class="text-2">تقدیم به حجة بن الحسن (عجل الله تعالی فرجه الشریف)</div>
      <div class="text-3">
        الّلهُمَّ صَلِّ عَلَی مُحَمَّدٍ وَآلِ مُحَمَّدٍ وَعَجِّلْ فَرَجَهُمْ
      </div>
    `;
  }
}
