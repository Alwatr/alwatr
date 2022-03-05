# @vatr/signal

Elegant powerful event system for handle global signals and states written in tiny TypeScript module.

Every signal has own value and can be used as a advance **state management** like redux and recoil without the complexities and unnecessary facilities of those libraries.

## Example usage

### Signal providers

```TypeScript
import { addSignalListener, dispatchSignal } from 'https://esm.run/@vatr/signal';

declare global {
  interface VatrSignals {
    readonly 'my-money-change': number;
  }
}

dispatchSignal('my-money-change', 10);
// signal debounced with browser animation frame
dispatchSignal('my-money-change', 20);
```

### Signal receivers in another file *without any cohesion with providers*

*Receive as a event:*

```TypeScript
addSignalListener('my-money-change', (money) => {
  // money type is automatically set to number.
  console.log(money);
});
```

*Receive inside code as a promise:*

```TypeScript
const money = await waitForSignal('my-money-change', {receivePrevious: true});
```
