import {AlwatrSignal} from '@alwatr/signal';

// Create a new signal
const mySignal = new AlwatrSignal({name: 'my-signal'});

// Subscribe to the signal
const subscription = mySignal.subscribe((message) => {
  console.log('Received message:', message);
});

// Emit an event
mySignal.notify({message: 'Hello, world!'});

// Wait for the next event asynchronously
const nextMessage = await mySignal.untilNewNotify();
console.log('Next message:', nextMessage);
