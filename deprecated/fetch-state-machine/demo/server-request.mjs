import {AlwatrServerRequest} from '@alwatr/server-context';

const serverRequest = new AlwatrServerRequest({
  name: 'demo.server-request',
});

serverRequest.request({
  url: 'http://httpbin.org/uuid',
});

serverRequest.subscribe(async () => {
  console.log('serverRequest: %o', {state: serverRequest.state, response: await serverRequest.response?.text()});
});
