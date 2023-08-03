import {html, nothing} from '@alwatr/fract';

import {iconButton, type IconButtonContent} from '../icon-button/icon-button.js';

export interface CenterTopAppBarContent {
  title: string;

  startIcon?: IconButtonContent;
  endIconList?: IconButtonContent[];

  tinted?: number;
  elevated?: number;
}

export const centerTopAppBar = (content: CenterTopAppBarContent) => html`
  <header
    class="scroll z-sticky flex h-16 shrink-0 grow-0 select-none items-center bg-surface px-1 [&.scroll]:bg-surfaceContainer"
  >

    <!-- <button class="inline-block cursor-pointer rounded-full p-3 text-onSurface">
      <alwatr-icon name="menu-outline" class="h-6 w-6"></alwatr-icon>
    </button> -->
    ${content.startIcon ? iconButton(content.startIcon) : nothing}

    <div class="lead whitespace-nowrap grow overflow-clip px-1 text-center text-titleLarge text-onSurface">${content.title}</div>

    <!-- <button class="inline-block cursor-pointer rounded-full p-3 text-onSurfaceVariant">
      <alwatr-icon name="refresh-outline" class="h-6 w-6"></alwatr-icon>
    </button> -->
    ${endIconListTemplate(content.endIconList)}
  </header>
`;

const endIconListTemplate = (iconList?: IconButtonContent[]) => {
  return iconList?.map((icon) => {
    return iconButton(icon);
  });
};

