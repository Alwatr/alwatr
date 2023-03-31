import {bench} from './bench.js';

function test1(id: string): void {
  console.log(id);
}
function test2(id: string): void {
  console.log(id);
}
function test3(id: string): void {
  console.log(id);
}

const bind = (id: string) => ({
  id,
  test1: test1.bind(null, id),
  test2: test2.bind(null, id),
  test3: test3.bind(null, id),
} as const);

class MyClass {
  constructor(public id: string) {
  }

  test1(): void {
    console.log(this.id);
  }
  test2(): void {
    console.log(this.id);
  }
  test3(): void {
    console.log(this.id);
  }
}

function test_bind(): string {
  const a = bind('123');
  return a.id;
}

function test_class(): string {
  const a = new MyClass('123');
  return a.id;
}

test_class();
test_bind();

bench('test_bind', test_bind);
bench('test_class', test_class);
bench('test_bind', test_bind);
bench('test_class', test_class);

globalThis.document?.body.append(' Done. Check the console.');
