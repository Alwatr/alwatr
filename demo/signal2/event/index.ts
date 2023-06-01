import {AlwatrEvent} from '@alwatr/signal2';

const clickEvent = new AlwatrEvent({name: 'myClick', debounce: 'AnimationFrame'});

document.getElementById('myButton')?.addEventListener('click', () => clickEvent.dispatch());

clickEvent.subscribe((detail) => {
  if (detail !== undefined) {
    console.log('subscribe: a new `detail` received ', detail);
  }
});

const clickEvent2 = new AlwatrEvent({name: 'myClick2', debounce: 'AnimationFrame', detail: {clickedBy: 'MHF'}});

document.getElementById('myButton2')?.addEventListener('click', () => clickEvent2.dispatch());

clickEvent2.subscribe((detail) => {
  console.log('subscribe: a new `detail` received ', detail);
});
