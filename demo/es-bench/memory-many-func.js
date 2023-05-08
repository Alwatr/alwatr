class test1 {
}

for(let i=0; i<1000; i++) {
  test1.prototype['method' + i] = function (a) {
    a++;
    return a;
  }
}

console.time('bench');
const a1 = new test1();
let n1=0;
for(let i=0; i<1000; i++) {
  n1 += a1.method500(i);
}
console.timeEnd('bench');


/// --


class test2 {
}

test2.prototype.methodN = function() {
  return function (a) {
    a++;
    return a;
  }
}

console.time('bench');
const a2 = new test2();
let n2=0;
for(let i=0; i<1000; i++) {
  n2 += a2.methodN()(i);
}
console.timeEnd('bench');
