import {AlwatrMultithreadContext} from '@alwatr/signal2';

import type {Stringifyable} from '@alwatr/type';

type Message = {
  type: string;
  payload: Stringifyable
}
export const messageContext = new AlwatrMultithreadContext<Message>('demo.message');
