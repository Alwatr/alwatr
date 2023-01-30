import {commandHandler, commandTrigger} from '@alwatr/signal';

commandHandler.define<{a: number; b: number}, number>(
    'command-add',
    (argumentObject) => argumentObject.a + argumentObject.b,
);

// ----

const commandAddTrigger = commandTrigger.bind<{a: number; b: number}, number>('command-add');

document.getElementById('requestButton')?.addEventListener('click', async () => {
  console.info('1. request command');
  const value = await commandAddTrigger.request({a: 10, b: 20});
  console.info('2. returned: ', value);
});

document.getElementById('requestButton2')?.addEventListener('click', async () => {
  console.info('1. request command (10+20)');
  const value = await commandAddTrigger.request({a: 10, b: 20});
  console.info('2. returned (10+20): ', value);

  console.info('3. request command (10+30, 10+40)');
  const value1p = commandAddTrigger.request({a: 10, b: 30});
  const value2p = commandAddTrigger.request({a: 10, b: 40});
  console.info('4. returned (%s)', (await Promise.all([value1p, value2p])).join(', '));
});
