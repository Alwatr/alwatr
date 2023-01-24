export function untilEvent(element: Element, eventName: string): Promise<Event> {
  return new Promise((resolve) => element.addEventListener(eventName, resolve));
}

export function delay(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export function untilNextFrame(): Promise<DOMHighResTimeStamp> {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

export function untilIdle(timeout?: number): Promise<IdleDeadline> {
  return new Promise((resolve) => requestIdleCallback(resolve, {timeout}));
}
