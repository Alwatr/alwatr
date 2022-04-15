import type {AlWatrIcon} from './icon';

export const getUrl = (i: AlWatrIcon): string => getNamedUrl(i.name);

export const getNamedUrl = (iconName: string): string =>
  `https://cdn.jsdelivr.net/gh/ionic-team/ionicons@6.0.1/src/svg/${iconName}.svg`;
