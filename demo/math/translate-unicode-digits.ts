import {translateUnicodeDigits} from '@alwatr/math';

const list = [
  '0123456789',
  '٠١٢٣٤٥٦٧٨٩',
  '۰۱۲۳۴۵۶۷۸۹',
  '߀߁߂߃߄߅߆߇߈߉',
  '०१२३४५६७८९',
  '০১২৩৪৫৬৭৮৯',
  '੦੧੨੩੪੫੬੭੮੯',
  '૦૧૨૩૪૫૬૭૮૯',
  '୦୧୨୩୪୫୬୭୮୯',
  '௦௧௨௩௪௫௬௭௮௯',
].join('\n');

console.log(list);

console.log(translateUnicodeDigits(list, 'fa'));
