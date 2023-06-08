import {AlwatrApiRequest} from '@alwatr/server-context';

const serverRequest = new AlwatrApiRequest({
  name: 'demo.server-request',
});

serverRequest.request({
  url: 'https://canary.order.soffit.co/api/v1/publistore/hub/product-list/tile',
  method: 'GET',
});
serverRequest.subscribe(function StateChanged() {
  console.log('serverRequest ', {state: this.state, response: this.response});
});
