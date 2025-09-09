import {createLogger, delay} from '@alwatr/nanolib';

import {StateSignal} from './state-signal.js';

import type {ComputedOptions, ComputedSignal, SubscribeResult} from './type.js';

/**
 * Creates a read-only computed signal that derives its value from other signals.
 * Its value is recalculated whenever any of the specified dependencies change.
 *
 * @template T The type of the computed value.
 * @param options The options object containing the computation details.
 * @param options.signalId Optional unique identifier for the signal.
 * @param options.deps An array of signals that this computation depends on.
 * @param options.get The function to run to compute the value.
 * @returns A `ReadonlySignal` containing the computed value.
 *
 * @example
 * const firstName = new StateSignal({ initialValue: 'John' });
 * const lastName = new StateSignal({ initialValue: 'Doe' });
 *
 * const fullName = computed({
 *   signalId: 'fullName', // Optional
 *   deps: [firstName, lastName],
 *   get: () => `${firstName.value} ${lastName.value}`,
 * });
 *
 * console.log(fullName.value); // "John Doe"
 * firstName.set('Jane');
 * console.log(fullName.value); // "Jane Doe"
 */
export function computed<T>(options: ComputedOptions<T>): ComputedSignal<T> {
  const logger_ = createLogger(`computed-signal: ${options.signalId}`);

  logger_.logMethod?.('initialize');

  // Use a StateSignal internally to hold the computed value and manage subscribers.
  const internalSignal = new StateSignal<T>({
    signalId: options.signalId + '-internal',
    initialValue: options.get(), // Calculate the initial value
  });

  let isRecalculating = false;

  const recalculate = (): void => {
    if (internalSignal.isDestroyed) {
      // If the signal is destroyed, do not perform any more recalculations.
      logger_.incident?.('recalculate', 'attempt_to_recalculate_destroyed_signal');
      return;
    }

    if (isRecalculating) {
      // If a recalculation is already in progress, skip this one.
      logger_.logMethodArgs?.('recalculate', 'skipped');
      return;
    }

    logger_.logMethodArgs?.('recalculate', 'delayed');

    isRecalculating = true;

    delay
      .nextMacrotask()
      .then(() => {
        if (internalSignal.isDestroyed) {
          // Double-check in case destroy was called during the microtask
          logger_.incident?.('recalculate', 'attempt_to_recalculate_destroyed_signal');
          return;
        }
        logger_.logMethodArgs?.('recalculate', 'executing');
        internalSignal.set(options.get());
      })
      .catch((err) => {
        logger_.error('recalculate', 'recalculation_failed', err);
      })
      .finally(() => {
        isRecalculating = false;
      });
  };

  const subscriptionList: SubscribeResult[] = [];
  for (const signal of options.deps) {
    subscriptionList.push(signal.subscribe(recalculate));
  }

  const destroy = (): void => {
    logger_.logMethod?.('destroy');

    if (internalSignal.isDestroyed) {
      // Prevent multiple calls to destroy
      logger_.incident?.('destroy', 'attempt_to_destroy_already_destroyed_signal');
      return; 
    }

    internalSignal.destroy();

    // 1. Unsubscribe from all upstream dependencies.
    for (const subscription of subscriptionList) {
      subscription.unsubscribe();
    }
    subscriptionList.length = 0; // Clear the array
  };

  const checkDestroyed = (): void => {
    if (internalSignal.isDestroyed) {
      throw new Error(`Cannot interact with a destroyed computed signal (id: ${options.signalId})`);
    }
  };

  return {
    get value(): T {
      checkDestroyed();
      return internalSignal.value;
    },
    subscribe: (callback, options) => {
      checkDestroyed();
      return internalSignal.subscribe(callback, options);
    },
    destroy,
  };
}
