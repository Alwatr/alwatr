import {getGlobalThis, type GlobalThis} from '@alwatr/global-this';

export const win = /* #__PURE__ */ getGlobalThis<DictionaryOpt<unknown>>();

// prettier-ignore
const requestAnimationFrameFallback =
  (callback: FrameRequestCallback): ReturnType<typeof setTimeout> =>
    setTimeout(() => callback(Date.now()), 1000 / 60);

export const requestAnimationFrame: GlobalThis['requestAnimationFrame'] = /* #__PURE__ */ (() =>
  win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || requestAnimationFrameFallback)();

// prettier-ignore
const requestIdleCallbackFallback =
  (callback: () => void, options?: IdleRequestOptions): ReturnType<typeof setTimeout> =>
    setTimeout(callback, options?.timeout ?? 2000);

export const requestIdleCallback: GlobalThis['requestIdleCallback'] = /* #__PURE__ */ (() =>
  win.requestIdleCallback || win.webkitRequestIdleCallback || win.mozRequestIdleCallback || requestIdleCallbackFallback)();
