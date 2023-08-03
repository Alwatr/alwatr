import {html} from '@alwatr/fract';

import {icon, type IconContent} from '../icon/icon.js';

export interface IconButtonContent extends IconContent {
  onClick(event: MouseEvent): void;
  disabled?: boolean;
}

export const iconButton = (content: IconButtonContent) => html`<button @click=${content.onClick} class="flex w-10 h-10 rounded-full bg-surfaceContainerHighest text-Primary items-center justify-center hover:stateHover-onSurface m-1 active:stateActive-onSurface">${icon(content)}</button>`;
