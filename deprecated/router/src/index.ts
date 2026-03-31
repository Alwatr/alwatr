import {AlwatrRouter} from './router.js';

export type {RouteContext} from './type.js';

export const router = new AlwatrRouter({
  clickTrigger: true,
  popstateTrigger: true,
});
