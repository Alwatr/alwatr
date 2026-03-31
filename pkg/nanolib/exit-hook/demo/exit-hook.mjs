import {exitHook} from '@alwatr/exit-hook';

const saveAllData = () => {
  console.warn('saving before exit...');
  // process.exit(process.exitCode);
};

exitHook(saveAllData);

setInterval(() => {
  console.log('hey ;)');
  if (Math.random() > 0.9) throw new Error('Simulate sample error!');
}, 1000);
