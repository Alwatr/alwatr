import {AlwatrRouter} from './router2.js';

export type {RouteContext} from './type.js';

export const router = new AlwatrRouter({
  clickTrigger: true,
  popstateTrigger: true,
});
