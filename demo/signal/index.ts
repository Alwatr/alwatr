import {SignalInterface} from '@alwatr/signal';

const signal = new SignalInterface('easter-egg');

signal.setProvider((param) => {
  const newValue = param * 10;
  console.info('2. signal provider called', {param, newValue});
  return `You have ${newValue} egg`;
});

document.getElementById('requestButton')?.addEventListener('click', async () => {
  console.info('1. request with 1');
  const value = await signal.request(1);
  console.info('3. new signal value', {value});
})

document.getElementById('requestButton2')?.addEventListener('click', async () => {
  console.info('1. request with 1');
  const value1 = await signal.request(1);
  console.info('3. 2x request with 2,3');
  const value2p = signal.request(2);
  const value3p = signal.request(3);
  console.info('4. new signal value', {value1, value2: await value2p, value3: await value3p});
});
