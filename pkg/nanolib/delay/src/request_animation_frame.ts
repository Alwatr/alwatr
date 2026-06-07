import {globalThis_} from './lib.js';

/**
 * Robust fallback wrapper for native `requestAnimationFrame`.
 *
 * Schedules a callback to be run before the next browser repaint.
 * If the environment does not support `requestAnimationFrame` (e.g., Node.js, Bun, or Web Workers),
 * it falls back to a timer that simulates a ~30 frames-per-second (33.3ms) refresh rate.
 *
 * @param callback - The function to execute before the next repaint. Receives a high-resolution timestamp.
 * @returns A unique request ID that can be used to cancel the request.
 *
 * @example
 * ```ts
 * requestAnimationFrame((timestamp) => {
 *   console.log('Frame timestamp:', timestamp);
 * });
 * ```
 */
export const requestAnimationFrame: (callback: FrameRequestCallback) => number =
  globalThis_.requestAnimationFrame?.bind(globalThis_)
  ?? ((callback: FrameRequestCallback) =>
    setTimeout(() => callback(globalThis_.performance?.now() ?? Date.now()), 1000 / 30));
