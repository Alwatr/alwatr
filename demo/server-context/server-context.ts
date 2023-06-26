import {AlwatrServerContext} from '@alwatr/server-context';

const serverContext = new AlwatrServerContext({
  name: 'demo.server_context',
  url: 'https://order.soffit.co/api/v1/publistore/',
});

serverContext.request();
serverContext.subscribe(async function StateChaned() {
  console.log('serverContext => result', {state: this.state, context: this.context});
});
