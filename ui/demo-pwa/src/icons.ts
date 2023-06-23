import callIcon from '@alwatr/icon/svg/add.svg';
import {defaultExport} from '@alwatr/util';

/**
 * Main app necessary icons.
 */
export const icons = {
  callIcon,
  starIcon: defaultExport(import('@alwatr/icon/svg/star-outline.svg')),
  homeIcon: defaultExport(import('@alwatr/icon/svg/home-outline.svg')),
  triangleIcon: defaultExport(import('@alwatr/icon/svg/triangle-outline.svg')),
};
