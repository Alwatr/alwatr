import {newFlatomise} from '@alwatr/flatomise';

const flatomise = newFlatomise();
flatomise.promise.then(() => {
  console.log('flatomise resolved');
});
flatomise.resolve();
