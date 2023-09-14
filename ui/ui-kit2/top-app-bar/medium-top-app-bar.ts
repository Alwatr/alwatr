import {html, nothing} from '@alwatr/fract';

import {endIconListTemplate, type CenterTopAppBarContent} from './center-top-app-bar.js';
import {iconButton} from '../icon-button/icon-button.js';


export const mediumTopAppBar = (content: CenterTopAppBarContent) => html`<header class="scroll z-sticky flex h-16 shrink-0 grow-0 select-none items-center bg-surface px-1 text-surface [&.scroll]:bg-surfaceContainer">
    <!-- <button class="inline-block cursor-pointer rounded-full p-3 text-onSurface">
      <alwatr-icon name="menu-outline" class="h-6 w-6"></alwatr-icon>
    </button> -->
    ${content.startIcon ? iconButton(content.startIcon) : nothing}
    <div class="grow overflow-clip whitespace-nowrap px-1 text-center text-titleLarge text-onSurface"></div>
    <!-- <button class="inline-block cursor-pointer rounded-full p-3 text-onSurfaceVariant">
      <alwatr-icon name="refresh-outline" class="h-6 w-6"></alwatr-icon>
    </button> -->
    ${endIconListTemplate(content.endIconList)}
    <div class="scroll flex h-12 items-end overflow-clip whitespace-nowrap bg-surface px-4 pb-5 text-right text-headlineSmall text-onSurface [&.scroll]:bg-surfaceContainer"><div>${content.title}</div></div>
  </header>
`;

