export const delay = (duration: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export const untilNextFrame = (): Promise<DOMHighResTimeStamp> => {
  return new Promise((resolve) => requestAnimationFrame(resolve));
};

export const untilIdle = (timeout?: number): Promise<IdleDeadline> => {
  return new Promise((resolve) => requestIdleCallback(resolve, {timeout}));
};

export const untilEvent = <T extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  eventName: T,
): Promise<HTMLElementEventMap[T]> => {
  return new Promise((resolve) => element.addEventListener(eventName, resolve, {once: true, passive: true}));
};
