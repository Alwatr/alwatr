import {customElement, AlwatrSmartElement, css, html, map} from '@alwatr/element';

import '@alwatr/ui-kit/chat/chat-avatar.js';
import '@alwatr/ui-kit/chat/chat-bubble.js';
import '@alwatr/ui-kit/chat/chat-message.js';
import '@alwatr/ui-kit/chat/chat-text-input.js';

import type {ChatMessage} from '@alwatr/ui-kit/chat/chat-message.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-chat': AlwatrPageHome;
  }
}

const me = 'user-1';

const messageList: Array<ChatMessage> = [
  {
    from: 'user-1',
    type: 'text',
    text: 'سلام',
  },
  {
    from: 'user-2',
    type: 'text',
    text: 'با تمام جهل و مستی تصمیم گرفته‌ام دفترچه رزوگار را با پاک کنِ مهر و عطوفت پاک کنم\n' +
      'و از اول با نام تو روزگار را آغاز کنم.',
  },
  {
    from: 'user-1',
    type: 'text',
    text: 'هنوز در نخستین صفحات آن مانده‌ام و مطلبی برای نوشتن ندارم.تا پایان نوشتن انتظارت می‌کشم.',
  },
  {
    from: 'user-4',
    type: 'text',
    text: 'دیوانه مسلمانی که در روزهای انتظار هزار بار به دیوانگی‌اش ایمان می‌آورد….',
  },
  {
    from: 'user-1',
    type: 'text',
    text: 'کودک که بودم پدرم جمعه ها صبح درب خانه را آب و جارو می کرد تا  اگر مولا از آن حوالی عبور کند …',
  },
  {
    from: 'user-2',
    type: 'text',
    text: 'و نو روز هر باره این حس را در من زنده می کند',
  },
  {
    from: 'user-2',
    type: 'text',
    text: 'مردمی را می بینم که سراسر شوق و شورند ، خانه تکانی می کنند و لباس های نو برتن…',
  },
  {
    from: 'user-2',
    type: 'text',
    text: 'اما برای چه ؟ برای که ؟\nاینان منتظرند تا  بهار شود ؟',
  },
  {
    from: 'user-4',
    type: 'text',
    text: 'سالهاست می اندیشم که هنگام بهار مگر چه می شود که اینگونه به هم می ریزیم' +
      '،مهربان می شویم، به سراغ هم می رویم و از همه مهمتر منتظر می شویم…',
  },
  {
    from: 'user-4',
    type: 'text',
    text: 'انتظار...',
  },
];

const messageListShort = messageList.splice(0, 5);

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-page-chat')
export class AlwatrPageHome extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      height: 100%;
      overflow-y: auto;
      padding: 1.5rem;
    }

    p {
      padding: 1.5rem;
      color: var(--md-sys-color-on-surface-variant);
      background-color: var(--md-sys-color-surface-variant);
    }
    p.on-primary {
      color: var(--md-sys-color-on-surface);
      background-color: var(--md-sys-color-surface);
      border: 1px solid var(--md-sys-color-on-surface);
    }

    .section-name {
      display: block;
      margin-bottom: 1rem;
    }

    alwatr-chat-message {
      margin: 1rem 0;
    }

    alwatr-chat-list {
      min-height: 25rem;
    }
  `;

  override render(): unknown {
    super.render();
    return html`
      text on surface

      <p>
        text on surface-variant
      </p>

      <p>
        <span class="section-name">alwatr-chat-avatar</span>
        ${map(messageListShort, (message) => html`<alwatr-chat-avatar .user=${message.from}></alwatr-chat-avatar>`)}
      </p>

      <p>
        <span class="section-name">alwatr-chat-bubble</span>
        ${map(messageListShort, (message) => html`
          <alwatr-chat-bubble .text=${message.text} ?end-side=${message.from !== me}></alwatr-chat-bubble>
        `)}
      </p>

      <p>
        <span class="section-name">alwatr-chat-message</span>

        ${map(messageListShort, (message) => html`
          <alwatr-chat-message .message=${message} ?end-side=${message.from !== me}></alwatr-chat-message>
        `)}
      </p>

      <alwatr-chat-list .list=${messageList}></alwatr-chat-list>
    `;
  }
}
