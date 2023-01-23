export function delay(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export function delayFrame(): Promise<DOMHighResTimeStamp> {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

export function delayIdle(timeout?: number): Promise<IdleDeadline> {
  return new Promise((resolve) => requestIdleCallback(resolve, {timeout}));
}
