import {createLogger, globalAlwatr} from '@alwatr/logger';
import {ListenerSpec, contextProvider, contextConsumer} from '@alwatr/signal';

import type {
  ActionRecord,
  FsmConstructor,
  FsmConstructorConfig,
  FsmConsumerInterface,
  FsmInstance,
  FsmState,
  FsmTypeHelper,
  SignalConfig,
} from './type.js';
import type {OmitFirstParam, SingleOrArray, StringifyableRecord} from '@alwatr/type';

globalAlwatr.registeredList.push({
  name: '@alwatr/fsm',
  version: _ALWATR_VERSION_,
});

const logger = createLogger(`alwatr/fsm`);

/**
 * Finite state machine constructor storage.
 */
const fsmConstructorStorage: Record<string, FsmConstructor | undefined> = {};

