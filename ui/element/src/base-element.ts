import {LitElement} from 'lit';

import {LoggerMixin} from './mixins/logging.js';

/**
 * Alwatr Base Element
 *
 * Include: LoggerMixin
 */
export const AlwatrBaseElement = LoggerMixin(LitElement);
