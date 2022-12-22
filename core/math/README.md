# Alwatr Math - `@alwatr/math`

Simple useful Math library written in tiny TypeScript module.

## API

### `UnicodeDigits(fromLanguages: Array<UnicodeLangKeys> | 'all' | 'common', toLanguage: UnicodeLangKeys)`

Translate number.

- **fromLanguages** The source language to be translated.
- **toLanguages** The dest language to be translated.

Example:

```ts
const unicodeDigits = new UnicodeDigits('common', 'en');

const list = [
  '0123456789',
  '٠١٢٣٤٥٦٧٨٩',
  '߀߁߂߃߄߅߆߇߈߉',
  '०१२३४५६७८९',
  '০১২৩৪৫৬৭৮৯',
  '੦੧੨੩੪੫੬੭੮੯',
  '૦૧૨૩૪૫૬૭૮૯',
  '୦୧୨୩୪୫୬୭୮୯',
  '௦௧௨௩௪௫௬௭௮௯',
].join('\n');

console.log(unicodeDigits.translate(list));
```

### `unicodeDigits.translate(str: string): string`

Convert the String of number of the source language to the destination language.

- **str** is String of number of the source language.

@TODO: update from ts files docs

### `isNumber(value: unknown): boolean`

Check the value is number or can convert to a number, for example string ' 123 ' can be converted to 123.

#### Why is this needed?

```ts
console.log(typeof '123'); //=> 'string'
console.log(+[]); //=> 0
console.log(+''); //=> 0
console.log(+'   '); //=> 0
console.log(typeof NaN); //=> 'number'
console.log(typeof Infinity); //=> 'number'
```

#### True

<!-- prettier-ignore -->
```ts
import {isNumber} from 'https://esm.run/@alwatr/math';

isNumber(5e3);               // true
isNumber(0xff);              // true
isNumber(-1.1);              // true
isNumber(0);                 // true
isNumber(1);                 // true
isNumber(1.1);               // true
isNumber('-1.1');            // true
isNumber('0');               // true
isNumber('0xff');            // true
isNumber('1');               // true
isNumber('1.1');             // true
isNumber('5e3');             // true
isNumber('012');             // true
isNumber(parseInt('012'));   // true
isNumber(parseFloat('012')); // true
```

#### False

<!-- prettier-ignore -->
```ts
import {isNumber} from 'https://esm.run/@alwatr/math';

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

### `transformToRange(x: number, options}): number`

Transform a number from one range to another.

Options:

```ts
{
  /**
   * The input range [min, max].
   *
   */
  in: [number, number];

  /**
   * The output (request) range [min, max].
   */
  out: [number, number];

  /**
   * If true, the output will be bounded to the output range (between min and max).
   *
   * In default behavior when x (input number) does not between input min~max range,
   * the output value will be out of output min~max range.
   *
   */
  bound?: boolean;
}
```

#### Example

```ts
transformToRange(5, {in: [0, 10], out: [0, 100]}); // => 50
```

Make percentage of any value

```ts
transformToRange(2000, {in: [0, 5000], out: [0, 100]}); // => 40
```

Calculate progress-bar with

```ts
const progressOuterWith = 400; //px
const gap = 5; //px (the visual gap between progressBar and component outer).
const currentProgress = 30; //%

const progressBarWith = transformToRange(currentProgress, {
  in: [0, 100],
  out: [componentPadding, progressOuterWith - componentPadding],
  bound: true,
});

this.progressBar.style.width = `${progressBarWith}px`;
```

### Generate Random

### `value`

Returns a float random number between 0 and 1 (1 Not included).

```ts
console.log(random.value); // 0.7124123
```

### `random.integer(min: number, max: number): number`

Generate a random integer between min and max.

```ts
console.log(random.integer(1, 10)); // somewhere between 1 and 10
```

### `random.float(min: number, max: number): number`

Generate a random float between min and max.

```ts
console.log(random.float(1, 10)); // somewhere between 1 and 10
```

### `string: (min: number, max?: number): string`

Generate a random string with random length.
The string will contain only characters from the characters list.
The length of the string will be between min and max (max included).
If max not specified, the length will be set to min.

```ts
console.log(random.string(6)); // something like 'Aab1V2'
```

### `step(min: number, max: number, step: number): number`

Generate a random integer between min and max with a step.

```ts
console.log(random.step(6, 10, 2)); // 6 or 8 or 10
```

### `shuffle(array: any[]): any[]`

Shuffle an array.

```ts
const array = [1, 2, 3, 4, 5];
random.shuffle(array);
console.log(array); // [2, 4, 3, 1, 5]
```
