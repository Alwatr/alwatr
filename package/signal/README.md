# @vatr/signal

A small and fast event system with `0` dependencies.

## Installation

`npm install @vatr/signal`

## How to use

define a signal type on `VatrSignals` and listene to event with `addSignalListener` and trigger the event with `dispatchSignal`.

```TypeScript
import { addSignalListener, dispatchSignal } from 'https://esm.run/@vatr/signal';

declare global {
  interface VatrSignals {
    readonly 'test-event': number;
  }
}

addSignalListener('test-event', (value) => {
  console.log(value);
});

dispatchSignal('test-event', 1);
```

Add multiple listene to the same event name:

```TypeScript
import { addSignalListener, dispatchSignal } from 'https://esm.run/@vatr/signal';

declare global {
  interface VatrSignals {
    readonly 'test-event': void;
  }
}

addSignalListener('test-event', () => console.log(1));
addSignalListener('test-event', () => console.log(2));
addSignalListener('test-event', () => console.log(3));

dispatchSignal('test-event', undefined);
```

You can remove event from all sycle with `expireSignal`:

```TypeScript
import { addSignalListener, dispatchSignal, expireSignal } from 'https://esm.run/@vatr/signal';

declare global {
  interface VatrSignals {
    readonly 'test-event': void;
  }
}

addSignalListener('test-event', () => console.log(1));
expireSignal('test-event');
dispatchSignal('test-event', undefined); // this line must make a Error
```

You can test a signal dispatch before now with `hasSignalDispatchedBefore`:

```TypeScript
import { addSignalListener, dispatchSignal, hasSignalDispatchedBefore } from 'https://esm.run/@vatr/signal';

declare global {
  interface VatrSignals {
    readonly 'test-event': number;
  }
}

addSignalListener('test-event', (value) => {
  console.log(value);
});

dispatchSignal('test-event', 1);

console.log(hasSignalDispatchedBefore('test-event'));
```
