import {createLogger} from '@alwatr/logger';

import type { DirectiveConstructor } from './directive.js';

/**
 * Alwatr Synapse Logger.
 */
export const logger = createLogger('alwatr/synapse');

/**
 * The registry for all directives.
 */
export const directiveRegistry_: {selector: string; constructor: DirectiveConstructor}[] = [];
