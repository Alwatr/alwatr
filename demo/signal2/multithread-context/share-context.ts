import {AlwatrMultithreadContextSignal} from '@alwatr/signal2';

import type {Stringifyable} from '@alwatr/type';

interface Message {
  type: string;
  payload: Stringifyable
}
export const messageContext = new AlwatrMultithreadContextSignal<Message>({name: 'demo.message'});
