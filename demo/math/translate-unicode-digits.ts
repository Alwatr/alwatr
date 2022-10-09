import {UnicodeDigits} from '@alwatr/math';

const unicodeDigits = new UnicodeDigits('all', 'fa');

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

console.log(list);
console.log('-----');

console.log(unicodeDigits.translate(list));

const start = Date.now();
const count = 20_000;

for (let i = count; i > 0; i--) {
  unicodeDigits.translate(list);
}

console.log(count / (Date.now() - start) * 1000);
