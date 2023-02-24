interface IndexableWindow {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const win = globalThis as IndexableWindow;

const requestAnimationFrameFallback = (callback: FrameRequestCallback): ReturnType<typeof setTimeout> =>
  setTimeout(() => callback(Date.now()), 1000 / 60);

export const requestAnimationFrame: typeof globalThis.requestAnimationFrame =
  win.requestAnimationFrame ||
  win.webkitRequestAnimationFrame ||
  win.mozRequestAnimationFrame ||
  requestAnimationFrameFallback;

const requestIdleCallbackFallback = (
    callback: () => void,
    options?: IdleRequestOptions,
): ReturnType<typeof setTimeout> => setTimeout(callback, options?.timeout ?? 2000);

export const requestIdleCallback: typeof globalThis.requestIdleCallback =
  win.requestIdleCallback ||
  win.webkitRequestIdleCallback ||
  win.mozRequestIdleCallback ||
  requestIdleCallbackFallback;
