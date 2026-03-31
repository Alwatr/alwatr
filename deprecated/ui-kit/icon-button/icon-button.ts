import {html} from '@alwatr/fract';

import {icon, type IconContent} from '../icon/icon.js';

export interface IconButtonContent extends IconContent {
  onClick(event: MouseEvent): void;
  disabled?: boolean;
}

export const iconButton = (content: IconButtonContent) =>
  html`<button
    @click=${content.onClick}
    class="text-Primary m-1 flex h-10 w-10 items-center justify-center rounded-full bg-surfaceContainerHighest hover:stateHover-onSurface active:stateActive-onSurface"
  >
    ${icon(content)}
  </button>`;
