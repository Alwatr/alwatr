import {validator} from '@alwatr/validator';

// number
console.log(validator<{a: number}>({a: Number}, {a: 2}));
console.log(validator<{a: number}>({a: Number}, {a: '2'}));

// boolean
console.log(validator<{a: boolean}>({a: Boolean}, {a: 'false'}));
console.log(validator<{a: boolean}>({a: Boolean}, {a: 'true'}));

// string
console.log(validator<{a: string}>({a: String}, {a: 'salam'}));

// nested object
console.log(
    validator<{a: number; b: {c: boolean, d: {e: number}}}>(
        {a: Number, b: {c: Boolean, d: {e: Number}}},
        {a: '2', b: {c: true, d: {e: 1}}},
    ),
);

// not valid
try {
  console.log(
      validator<{a: number; b: {c: boolean, d: {e: number}}}>(
          {a: Number, b: {c: Boolean, d: {e: Number}}},
          {a: '2', b: {c: true, d: {e: true}}},
      ),
  );
}
catch (error) {
  console.log(error);
}

try {
  console.log(validator<{a: boolean}>({a: Boolean}, {a: 'test'}));
}
catch (error) {
  console.log(error);
}
