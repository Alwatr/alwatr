import {AlwatrEventSignal, AlwatrSimpleSignal} from '@alwatr/signal2';

const clickEvent = new AlwatrSimpleSignal('myClick');

document.getElementById('myButton')?.addEventListener('click', () => clickEvent.dispatch());

clickEvent.subscribe(() => {
  console.log('subscribe: a new signal received ');
});

const clickEvent2 = new AlwatrEventSignal('myClick2');

document.getElementById('myButton2')?.addEventListener('click', () => clickEvent2.dispatch({clickedBy: 'MHF'}));

clickEvent2.subscribe((detail) => {
  console.log('subscribe: a new signal received ', detail);
});
