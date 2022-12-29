import {alwatrRegisteredList} from '@alwatr/logger';

export * from './dummy-element.js';
export * from './smart-element.js';
export * from './root-element.js';

export * from './mixins/localize.js';
export * from './mixins/direction.js';

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

