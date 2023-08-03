import {html} from '@alwatr/fract';

import {icon, type IconContent} from '../icon/icon.js';

export interface IconButtonContent extends IconContent {
  onClick(event: MouseEvent): void;
  disabled?: boolean;
}

export const iconButton = (content: IconButtonContent) => html`<button ?disabled=${content.disabled} @click=${content.onClick}>${icon(content)}</button>`;
