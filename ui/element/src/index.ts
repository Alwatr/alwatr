import {globalAlwatr} from '@alwatr/logger';

export * from './base-element.js';

export * from './mixins/localize.js';
export * from './mixins/router.js';
export * from './mixins/direction.js';
export * from './mixins/logging.js';
export * from './mixins/signal.js';
export * from './mixins/toggle.js';
export * from './mixins/unresolved.js';
export * from './mixins/state-machine.js';
export * from './mixins/schedule-update-to-frame.js';

export * from './directives/map.js';

export * from './reactive-controllers/finite-state-machine.js';

export * from './lit.js';

globalAlwatr.registeredList.push({
  name: '@alwatr/element',
  version: _ALWATR_VERSION_,
});
