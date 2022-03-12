# @alwatr/math

Simple useful Math library written in tiny TypeScript module.

## API

### `isNumber(value: unknown): boolean`

#### Why is this needed?

```js
console.log(typeof '123'); //=> 'string'
console.log(+[]); //=> 0
console.log(+''); //=> 0
console.log(+'   '); //=> 0
console.log(typeof NaN); //=> 'number'
console.log(typeof Infinity); //=> 'number'
```

#### True

```js
import { isNumber } from 'https://esm.run/@alwatr/math';

isNumber(5e3);               // true
isNumber(0xff);              // true
isNumber(-1.1);              // true
isNumber(0);                 // true
isNumber(1);                 // true
isNumber(1.1);               // true
isNumber(10);                // true
isNumber(10.10);             // true
isNumber(100);               // true
isNumber('-1.1');            // true
isNumber('0');               // true
isNumber('012');             // true
isNumber('0xff');            // true
isNumber('1');               // true
isNumber('1.1');             // true
isNumber('10');              // true
isNumber('10.10');           // true
isNumber('100');             // true
isNumber('5e3');             // true
isNumber(parseInt('012'));   // true
isNumber(parseFloat('012')); // true
```

#### False

```js
import { isNumber } from 'https://esm.run/@alwatr/math';

isNumber(Infinity);          // false
isNumber(NaN);               // false
isNumber(null);              // false
isNumber(undefined);         // false
isNumber('');                // false
isNumber('   ');             // false
isNumber('foo');             // false
isNumber([1]);               // false
isNumber([]);                // false
isNumber(function () {});    // false
isNumber({});                // false
```
