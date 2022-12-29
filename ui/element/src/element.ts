import {alwatrRegisteredList} from '@alwatr/type';
import {LitElement} from 'lit';

import {LoggerMixin} from './mixins/logging.js';
import {SignalMixin} from './mixins/signal.js';
import {AlwatrRootElement} from './root.js';

export {LoggerMixin, SignalMixin, AlwatrRootElement};

export * from 'lit';
export * from 'lit/decorators.js';
export {map} from 'lit/directives/map.js';
export {when} from 'lit/directives/when.js';
export {repeat} from 'lit/directives/repeat.js';
export {ifDefined} from 'lit/directives/if-defined.js';
export {unsafeSVG} from 'lit/directives/unsafe-svg.js';
export {cache} from 'lit/directives/cache.js';

alwatrRegisteredList.push({
  name: '@alwatr/element',
  version: '{{ALWATR_VERSION}}',
});

export const AlwatrDummyElement = LoggerMixin(LitElement);
export const AlwatrSmartElement = SignalMixin(LoggerMixin(LitElement));
