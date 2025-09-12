import {AlwatrApiRequest} from '@alwatr/server-context';

const apiRequest = new AlwatrApiRequest({
  name: 'demo.server-request',
});

apiRequest.request({
  url: 'https://order.soffit.co/api/v1/publistore/',
});

apiRequest.subscribe(() => {
  console.log('serverRequest: %o', {state: apiRequest.state, response: apiRequest.response});
});
