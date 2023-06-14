import {AlwatrEventSignal, AlwatrSimpleSignal} from '@alwatr/signal2';

// button 1
const clickEvent = new AlwatrSimpleSignal({name: 'button-1-click-event'});
document.getElementById('myButton1')?.addEventListener('click', () => clickEvent.dispatch());
function clickEventSubscribeHandler(): void {
  console.log('subscribe: a new signal received');
}
clickEvent.subscribe(clickEventSubscribeHandler);


// button 2
const clickEvent2 = new AlwatrEventSignal({name: 'button-2-click-event'});
document.getElementById('myButton2')?.addEventListener('click', () => clickEvent2.dispatch({clickedBy: 'BTN_2'}));
function clickEvent2SubscribeHandler(detail: unknown): void {
  console.log('subscribe: a new signal received ', detail);
}
clickEvent2.subscribe(clickEvent2SubscribeHandler);


// button 3
document.getElementById('myButton3')?.addEventListener('click', () => {
  clickEvent.subscribe(clickEventSubscribeHandler);
  clickEvent2.subscribe(clickEvent2SubscribeHandler);
});


// button 4
document.getElementById('myButton4')?.addEventListener('click', () => {
  clickEvent.unsubscribe(clickEventSubscribeHandler);
  clickEvent2.unsubscribe(clickEvent2SubscribeHandler);
});
