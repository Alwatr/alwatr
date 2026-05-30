import {queueMicrotask} from '@alwatr/delay';

interface Updatable {
  performUpdate_(): void;
}

/**
 * Global Batcher Queue for headless directives.
 * Uses a unique Set to ensure a directive is only queued EXACTLY ONCE per animation frame/tick.
 */
const updateQueue__ = new Set<Updatable>();
let isBatchScheduled__ = false;

/**
 * Flushes all pending directive updates synchronously inside a single microtask frame.
 */
function flushQueue__(): void {
  const currentBatch = Array.from(updateQueue__);
  updateQueue__.clear();
  isBatchScheduled__ = false;

  for (let i = 0; i < currentBatch.length; i++) {
    // Explicit call to execute the update loop immediately
    try {
      currentBatch[i].performUpdate_();
    } catch (err) {
      queueMicrotask(() => {
        throw err; // Re-throw asynchronously to avoid disrupting the current batch loop
      });
    }
  }
}

/**
 * Schedules a directive to be rendered during the upcoming centralized microtask flush.
 */
export function queueRender(target: Updatable): void {
  updateQueue__.add(target);

  if (isBatchScheduled__ === false) {
    isBatchScheduled__ = true;
    queueMicrotask(flushQueue__);
  }
}
