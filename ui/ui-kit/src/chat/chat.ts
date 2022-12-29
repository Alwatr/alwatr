import {customElement, AlwatrSmartElement, css, html} from '@alwatr/element';

import './chat-footer.js';
import './chat-list.js';

import type {ChatStorage} from './chat-list.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat': AlwatrChat;
  }
}

const currentUser = 'user-1';

const chatStorage: ChatStorage = {
  ok: true,
  meta: {
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
      text: 'سلام',
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
      text: 'اما برای چه ؟ برای که ؟\nاینان منتظرند تا  بهار شود ؟',
    },
    '9': {
      id: '9',
      from: 'user-4',
      type: 'text',
      text:
        'سالهاست می اندیشم که هنگام بهار مگر چه می شود که اینگونه به هم می ریزیم' +
        '،مهربان می شویم، به سراغ هم می رویم و از همه مهمتر منتظر می شویم…',
    },
    '10': {
      id: '10',
      from: 'user-4',
      type: 'text',
      text: 'انتظار...',
    },
  },
};

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-chat')
export class AlwatrChat extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      color: var(--alwatr-sys-color-on-secondary-container);
      background-color: var(--alwatr-sys-color-secondary-container);
    }
  `;

  override render(): unknown {
    super.render();
    return html`
      <alwatr-chat-list .storage=${chatStorage} .currentUser=${currentUser}></alwatr-chat-list>
      <alwatr-chat-footer></alwatr-chat-footer>
    `;
  }
}
