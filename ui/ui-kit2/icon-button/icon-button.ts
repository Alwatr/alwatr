import {html} from '@alwatr/fract';

import {icon, type IconContent} from '../icon/icon.js';

export interface IconButtonContent extends IconContent {
  onClick(event: MouseEvent): void;
  disabled?: boolean;
}

export const iconButton = (content: IconButtonContent) => html`<div @click=${content.onClick} class="flex h-full max-h-full w-full max-w-full flex-col flex-nowrap items-stretch overflow-clip">
  <div class="flex w-10 h-10 rounded-full bg-surfaceContainerHighest text-Primary items-center justify-center hover:stateHover-onSurface m-1 active:stateActive-onSurface">${icon(content)}</div></div>`;
