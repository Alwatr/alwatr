import {requestAnimationFrame} from './request_animation_frame.js';

/**
 * Suspends execution flow until the next two consecutive animation frames have occurred.
 *
 * Ensures that any pending DOM updates have been rendered before resuming execution.
 * Resolves after the second animation frame, providing a safe point to perform post-render calculations.
 *
 * @returns A Promise that resolves after two animation frames.
 *
 * @example
 * ```ts
 * await delay.requestNextRender();
 * performPostRenderCalculations();
 * ```
 */
export const requestNextRender = (callback: FrameRequestCallback): void => {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
};
