import {eventListener, eventTrigger} from '@alwatr/signal';

const buttonEventTrigger = eventTrigger.bind<{id: number}>('easter-egg');

eventListener.subscribe<{id: number}>('easter-egg', (detail) => {
  const newValue = detail.id * 10;
  console.info('2. signal provider called', {detail, newValue});
});

document.getElementById('requestButton')?.addEventListener('click', async () => {
  console.info('1. request with 1');
  const value = await buttonEventTrigger.dispatch({id: 1});
  console.info('3. new signal value', {value});
});

document.getElementById('requestButton2')?.addEventListener('click', async () => {
  console.info('1. request with 1');
  const value1 = buttonEventTrigger.dispatch({id: 2});
  console.info('3. 2x request with 2,3');
  const value2p = buttonEventTrigger.dispatch({id: 2});
  const value3p = buttonEventTrigger.dispatch({id: 3});
  console.info('4. new signal value', {value1, value2: await value2p, value3: await value3p});
});
