import {random} from '@alwatr/math';

export function heavyObject() {
  const obj: Record<string, Record<string, string>> = {};
  for (let i = 100_000; i; i--) {
    const id = 'user_' + i;
    obj[id] = {
      id,
      fname: random.string(4, 16),
      lname: random.string(4, 32),
      email: random.string(8, 32),
      token: random.string(16),
    };
  }
  return obj;
}

(() => {
  // @ts-ignore
  const temp = heavyObject();
  window.addEventListener('click', () => {
    console.log(1);
  });
})();

/**
 * Empty html: 3.1MB
 * Simple event: 3.3MB
 * Use heavyObject: 64MB
 * Make heavyObject but don`t use it: 3.3MB (برگام!)
 */
