import {alwatrRegisteredList} from '@alwatr/logger';
import {LitElement} from 'lit';

import {LoggerMixin} from './mixins/logging.js';
import {SignalMixin} from './mixins/signal.js';

export * from './mixins/logging.js';
export * from './mixins/signal.js';

export * from 'lit';
export * from 'lit/decorators.js';
export {map} from 'lit/directives/map.js';
export {when} from 'lit/directives/when.js';
export {repeat} from 'lit/directives/repeat.js';
export {ifDefined} from 'lit/directives/if-defined.js';
export {unsafeSVG} from 'lit/directives/unsafe-svg.js';

alwatrRegisteredList.push({
  name: '@alwatr/element',
  version: '{{ALWATR_VERSION}}',
});

export const AlwatrDummyElement = LoggerMixin(LitElement);
export const AlwatrElement = SignalMixin(LoggerMixin(LitElement));
