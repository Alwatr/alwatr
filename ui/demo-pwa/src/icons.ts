import callOutline from '@alwatr/icon/svg/call-outline.svg';
import call from '@alwatr/icon/svg/call.svg';
import {defaultExport} from '@alwatr/util';

/**
 * Main app necessary icons.
 */
export const icons = {
  call,
  callOutline,
  star: defaultExport(import('@alwatr/icon/svg/star.svg')),
  starOutline: defaultExport(import('@alwatr/icon/svg/star-outline.svg')),
  home: defaultExport(import('@alwatr/icon/svg/home.svg')),
  homeOutline: defaultExport(import('@alwatr/icon/svg/home-outline.svg')),
  triangle: defaultExport(import('@alwatr/icon/svg/triangle.svg')),
  triangleOutline: defaultExport(import('@alwatr/icon/svg/triangle-outline.svg')),
};
