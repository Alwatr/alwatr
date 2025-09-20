import {createLogger} from '@alwatr/logger';

import type {DirectiveConstructor} from './directiveDecorator.js';
import type {} from '@alwatr/type-helper';

/**
 * Alwatr Synapse Logger.
 */
export const logger = createLogger('alwatr/synapse');

/**
 * The registry for all directives.
 */
export const directiveRegistry_: {selector: string; constructor: DirectiveConstructor}[] = [];
