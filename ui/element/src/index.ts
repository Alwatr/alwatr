import {globalAlwatr} from '@alwatr/logger';

export * from './dummy-element.js';
export * from './smart-element.js';

export * from './mixins/localize.js';
export * from './mixins/direction.js';
export * from './mixins/logging.js';
export * from './mixins/signal.js';
export * from './mixins/toggle.js';

export * from './directives/map.js';

export * from './lit.js';

globalAlwatr.registeredList.push({
  name: '@alwatr/element',
  version: _ALWATR_VERSION_,
});
