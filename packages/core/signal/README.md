# Alwatr Signal - `@alwatr/signal`

Elegant powerful event system for handle global signals and states written in tiny TypeScript module.

Every signal has own value and can be used as a advance **state management** like redux and recoil without the complexities and unnecessary facilities of those libraries.

## Example usage

### Add your signal name to global `AlwatrSignals` type helper

```ts
declare global {
  /**
   * Global signals value type registry.
   */
  interface AlwatrSignals {
    readonly 'content-change': Record<string, number>;
  }

  /**
   * Global request signal parameters types.
   */
  interface AlwatrRequestSignals {
    readonly 'content-change': number;
  }
}
```

### Dispatch signal with value

```ts
import {SignalInterface} from 'https://esm.run/@alwatr/signal';

const contentChangeSignal1 = new SignalInterface('content-change');

contentChangeSignal1.dispatch({a: 1, b: 2});

contentChangeSignal1.dispatch({a: 2, b: 3});

// Multiple dispatch debounced and last value dispatched after an animation frame.
contentChangeSignal1.dispatch({a: 3, b: 4});
```

### Receive the signal value

```ts
import {SignalInterface} from 'https://esm.run/@alwatr/signal';

const contentChangeSignal2 = new SignalInterface('content-change'); // Same share signal as contentChangeSignal1

contentChangeSignal2.addListener((content) => {
  console.log(content); // {a:3, b:4}
});
```

## API

### Prepare

#### `new SignalInterface(signal-name)`

```ts
import {SignalInterface} from 'https://esm.run/@alwatr/signal';

const contentChangeSignal = new SignalInterface('content-change');
```

### `name`

Get signal name.

Example:

```ts
console.log(contentChangeSignal.name); // 'content-change'
```

### `value`

Get last dispatched signal value or undefined.

Example:

```ts
if (contentChangeSignal.dispatched) {
  const content = contentChangeSignal.value!;
  ...
}
```

### `dispatched`

Check signal dispatched before or not!

Example

```ts
if (contentChangeSignal.dispatched) {
  // contentChangeSignal.value exist.
}
```

### `disabled`

Disable signal, all dispatch's ignored (just value updated) and no more listeners will be called.

Example:

```ts
contentChangeSignal.disabled = true;
```

### `expire()`

Expire the signal by clear last dispatched value.

dispatched and receivePrevious etc not work until new signal.

Example:

```ts
contentChangeSignal.dispatched; // true
contentChangeSignal.expire();
contentChangeSignal.value; // undefined
contentChangeSignal.dispatched; // false
```

### `setProvider(provider)`

Defines the provider of the signal that will be called when the signal requested (addRequestSignalListener).

Example:

```ts
contentChangeSignal.setProvider(async (requestParam) => {
  const content = await fetchNewContent(requestParam);
  if (content != null) {
    return content; // Dispatch signal 'content-change' with content.
  } else {
    // dispatch new signal: 'content-not-found'
  }
});
```

### `request(requestParam)`

Dispatch request signal and wait for answer (wait for new signal dispatched).

Resolved with signal value when new signal received (getNextSignalValue).

Example:

```ts
// dispatch request signal and wait for answer (wait for NEW signal).
const newContent = await contentChangeSignal.request({foo: 'bar'});
```

### `getNextSignalValue()`

Resolved with signal value when new signal received.

Example:

```ts
// Wait for NEW signal received.
const newContent = await contentChangeSignal.getNextSignalValue();
```

### `getSignalValue()`

Resolved with signal value when signal is ready.

Get signal value from last dispatched signal (if any) or wait for new signal received.

Example:

```ts
// get signal value from last dispatched signal (if any) or wait for a new signal to receive
const content = await contentChangeSignal.getSignalValue();
```

### `dispatch(signalValue)`

Dispatch signal to all listeners.

Example:

```ts
contentChangeSignal.dispatch(content);
```

### `addListener(listener)`

Adds a new listener to the signal.

Example:

```ts
const listener = contentChangeSignal.addListener((content) => console.log(content));
```

### Listener API Interface

#### `listener.disabled`

Disable the listener, not called anymore.

Example:

```ts
const listener = contentChangeSignal.addListener((content) => console.log(content));
...
listener.disabled = true;
```

#### `listener.remove()`

Removes a listener from the signal.

Example:

```ts
const listener = contentChangeSignal.addListener((content) => console.log(content));
...
listener.remove();
```
