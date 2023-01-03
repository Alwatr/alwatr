import {validator} from '@alwatr/validator';

console.log('basic test');
console.log(
    validator<
      {num: number; str: string; bool: boolean; _null: null; undef: undefined; ali: 'ali'; five: 5; true: true}
    >(
        {num: Number, str: String, bool: Boolean, _null: null, undef: undefined, ali: 'ali', five: 5, true: true},
        {num: 123, str: 'test', bool: false, _null: null, undef: undefined, ali: 'ali', five: 5, true: true},
    ),
);

console.log('sanitize value test');
console.log(
    validator<
      {num: number; str: string; bool: boolean; _null: null; undef: undefined; ali: 'ali'; five: 5; true: true}
    >(
        {num: Number, str: String, bool: Boolean, _null: null, undef: undefined, ali: 'ali', five: 5, true: true},
        {num: '123', str: 'test', bool: 'false', _null: null, undef: undefined, ali: 'ali', five: 5, true: true},
    ),
);

console.log('nested value test');
console.log(
    validator<
      {a: {num: number; str: string; bool: boolean; _null: null; undef: undefined; ali: 'ali'; five: 5; true: true}}
    >(
        {a: {num: Number, str: String, bool: Boolean, _null: null, undef: undefined, ali: 'ali', five: 5, true: true}},
        {a: {num: '123', str: 'test', bool: 'false', _null: null, undef: undefined, ali: 'ali', five: 5, true: true}},
    ),
);

console.log('not valid test');
try {
  console.log(
      validator<
        {num: number}
      >(
          {num: Number},
          {num: 'asd'},
      ),
  );
  new Error('validator_not_work');
}
catch (err) {
  console.log('test ok, error cause: ', (err as Error).cause);
}
