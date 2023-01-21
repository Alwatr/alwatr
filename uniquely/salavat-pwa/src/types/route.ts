import type {Icon} from './icon.js';

export type Route = {
  title: string;
  icon: Readonly<Icon>;
  twoToneIcon?: boolean;
  render: () => unknown;
};
export type Routes = Record<string, Readonly<Route>>;
