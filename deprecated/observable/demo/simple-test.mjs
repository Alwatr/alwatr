import {AlwatrObservable} from '@alwatr/observable';

class MyClass extends AlwatrObservable {
  constructor () {
    super({name: 'my-class'});
  }

  hello () {
    this.notify_({message: 'Hello, world!'});
  }
}

const a = new MyClass();
a.subscribe((message) => {
  console.log('Received message:', message);
});
a.hello();
