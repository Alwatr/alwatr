import {validator} from '@alwatr/validator';

console.log('basic test');
console.log(
    validator<
      {num: number; str: string; bool: boolean; _null: null; ali: 'ali'; five: 5; true: true}
    >(
        {num: Number, str: String, bool: Boolean, _null: null, ali: 'ali', five: 5, true: true},
        {num: 123, str: 'test', bool: false, _null: null, ali: 'ali', five: 5, true: true},
    ),
);

console.log('sanitize value test');
console.log(
    validator<
      {num: number; str: string; bool: boolean; _null: null; ali: 'ali'; five: 5; true: true}
    >(
        {num: Number, str: String, bool: Boolean, _null: null, ali: 'ali', five: 5, true: true},
        {num: '123', str: 'test', bool: 'false', _null: null, ali: 'ali', five: 5, true: true},
    ),
);

console.log('nested value test');
console.log(
    validator<
      {a: {num: number; str: string; bool: boolean; _null: null; ali: 'ali'; five: 5; true: true}}
    >(
        {a: {num: Number, str: String, bool: Boolean, _null: null, ali: 'ali', five: 5, true: true}},
        {a: {num: '123', str: 'test', bool: 'false', _null: null, ali: 'ali', five: 5, true: true}},
    ),
);

console.log('not valid test');
try {
  console.log(
      validator<
        {num: number}
      >(
          {num: Number},
          {num: 'test'},
      ),
  );
  throw new Error('validator_not_work');
}
catch (err) {
  if ((err as Error).message !== 'validator_not_work') {
    console.log('test ok, error message `%s`, error cause: %s', (err as Error).message, (err as Error).cause);
  }
  else {
    throw err;
  }
}

try {
  console.log(
      validator<
        {num: boolean}
      >(
          {num: Boolean},
          {num: 'true'},
      ),
  );
  throw new Error('validator_not_work');
}
catch (err) {
  if ((err as Error).message !== 'validator_not_work') {
    console.log('test ok, error message `%s`, error cause: %s', (err as Error).message, (err as Error).cause);
  }
  else {
    throw err;
  }
}

try {
  console.log(
      validator<
        {num: null}
      >(
          {num: null},
          {num: 'test'},
      ),
  );
  throw new Error('validator_not_work');
}
catch (err) {
  if ((err as Error).message !== 'validator_not_work') {
    console.log('test ok, error message `%s`, error cause: %s', (err as Error).message, (err as Error).cause);
  }
  else {
    throw err;
  }
}

try {
  console.log(
      validator<
        {num: number}
      >(
          {num: Number},
          {num: 'test'},
      ),
  );
  throw new Error('validator_not_work');
}
catch (err) {
  if ((err as Error).message !== 'validator_not_work') {
    console.log('test ok, error message `%s`, error cause: %s', (err as Error).message, (err as Error).cause);
  }
  else {
    throw err;
  }
}

try {
  console.log(
      validator<
        {num: string}
      >(
          {num: 'test'},
          {num: 'tes'},
      ),
  );
  throw new Error('validator_not_work');
}
catch (err) {
  if ((err as Error).message !== 'validator_not_work') {
    console.log('test ok, error message `%s`, error cause: %s', (err as Error).message, (err as Error).cause);
  }
  else {
    throw err;
  }
}
