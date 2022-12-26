import {validator} from '@alwatr/validator';

// number
console.log(validator<{a: number}>({a: 2}, {a: 'number'}));
console.log(validator<{a: number}>({a: '2'}, {a: 'number'}));

// boolean
console.log(validator<{a: boolean}>({a: true}, {a: 'boolean'}));
console.log(validator<{a: boolean}>({a: false}, {a: 'boolean'}));

// string
console.log(validator<{a: string}>({a: 'salam'}, {a: 'string'}));

// nested object
console.log(
    validator<{a: number; b: {c: boolean, d: {e: number}}}>(
        {a: '2', b: {c: true, d: {e: 1}}},
        {a: 'number', b: {c: 'boolean', d: {e: 'number'}}},
    ),
);

// not valid
try {
  console.log(
      validator<{a: number; b: {c: boolean, d: {e: number}}}>(
          {a: '2', b: {c: true, d: {e: true}}},
          {a: 'number', b: {c: 'boolean', d: {e: 'number'}}},
      ),
  );
}
catch (error) {
  console.log(error);
}

try {
  console.log(validator<{a: boolean}>({a: 'test'}, {a: 'boolean'}));
}
catch (error) {
  console.log(error);
}
