export {signalConsumer} from './signal-consumer.js';
export {signalProvider} from './signal-provider.js';
export {commandSignal} from './command-signal.js';

/*
TODO:
  1. change signal option like disable
  2. Get signal value without undefined
    (Get signal value from last dispatched signal (if any) or wait for new signal received.)
  3. dispatched bool
  4. command callback signal
  5. remove all SignalObject
  6. use Stringifyable
  7. optional commandProvider debounce
*/
