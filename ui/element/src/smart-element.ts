import {AlwatrDummyElement} from './dummy-element.js';
import {SignalMixin} from './mixins/signal.js';

/**
 * Alwatr Smart Element
 *
 * Include: SignalMixin, AlwatrDummyElement
 */
export const AlwatrSmartElement = SignalMixin(AlwatrDummyElement);
