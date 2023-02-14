import {customElement, css, html, AlwatrBaseElement, SignalMixin} from '@alwatr/element';

import './chat-footer.js';
import './chat-list.js';

import type {ChatStorage} from '@alwatr/type';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat': AlwatrChat;
  }
}

const currentUser = 'user-1';

const chatStorage: ChatStorage = {
  ok: true,
  meta: {
    id: `${currentUser}-chat`,
    formatVersion: 4,
    lastAutoId: 0,
    lastUpdated: Date.now(),
    reversion: 100,
  },
  data: {
    '1': {
      id: '1',
      from: 'user-1',
      type: 'text',
      text: 'به یاد اولتر...',
    },
    '2': {
      id: '2',
      from: 'user-2',
      type: 'text',
      text:
        'با تمام جهل و مستی تصمیم گرفته‌ام دفترچه رزوگار را با پاک کنِ مهر و عطوفت پاک کنم\n' +
        'و از اول با نام تو روزگار را آغاز کنم.',
    },
    '3': {
      id: '3',
      from: 'user-1',
      type: 'text',
      text: 'هنوز در نخستین صفحات آن مانده‌ام و مطلبی برای نوشتن ندارم.تا پایان نوشتن انتظارت می‌کشم.',
    },
    '4': {
      id: '4',
      from: 'user-4',
      type: 'text',
      text: 'دیوانه مسلمانی که در روزهای انتظار هزار بار به دیوانگی‌اش ایمان می‌آورد….',
    },
    '5': {
      id: '5',
      from: 'user-1',
      type: 'text',
      text: 'کودک که بودم پدرم جمعه ها صبح درب خانه را آب و جارو می کرد تا  اگر مولا از آن حوالی عبور کند …',
    },
    '6': {
      id: '6',
      from: 'user-2',
      type: 'text',
      text: 'و نو روز هر باره این حس را در من زنده می کند',
    },
    '7': {
      id: '7',
      from: 'user-2',
      type: 'text',
      text: 'مردمی را می بینم که سراسر شوق و شورند ، خانه تکانی می کنند و لباس های نو برتن…',
    },
    '8': {
      id: '8',
      from: 'user-2',
      type: 'text',
      text: 'اما برای چه ؟\nاینان منتظرند تا  بهار شود ؟',
    },
    '9': {
      id: '1',
      from: 'user-1',
      type: 'text',
      text: 'برای که ؟',
    },
    '10': {
      id: '4',
      from: 'user-2',
      type: 'text',
      text: 'دیوانه مسلمانی که در روزهای انتظار هزار بار به دیوانگی‌اش ایمان می‌آورد….',
    },
    '11': {
      id: '9',
      from: 'user-4',
      type: 'text',
      text:
        'سالهاست می اندیشم که هنگام بهار مگر چه می شود که اینگونه به هم می ریزیم' +
        '،مهربان می شویم، به سراغ هم می رویم و از همه مهمتر منتظر می شویم…',
    },
    '12': {
      id: '10',
      from: 'user-4',
      type: 'text',
      text: 'انتظار...',
    },
    '13': {
      id: '1',
      from: 'user-1',
      type: 'text',
      text: 'زیبا بود مرسی',
    },
  },
};

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-chat')
export class AlwatrChat extends SignalMixin(AlwatrBaseElement) {
  static override styles = css`
    :host {
      display: block;
      padding-top: var(--sys-spacing-track);
      box-sizing: border-box;
      position: relative;
    }

    alwatr-chat-list {
      height: 100%;
      color: var(--sys-color-on-surface-variant);
      background-color: var(--sys-color-surface-variant);
      padding-bottom: calc(12 * var(--sys-spacing-track));
    }

    alwatr-chat-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
  `;

  override render(): unknown {
    this._logger.logMethod('render');
    return html`
      <alwatr-chat-list .storage=${chatStorage} .currentUser=${currentUser}></alwatr-chat-list>
      <alwatr-chat-footer></alwatr-chat-footer>
    `;
  }
}
