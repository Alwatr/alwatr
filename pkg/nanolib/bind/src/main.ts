/**
 * @packageDocumentation
 * High-performance, lightweight binding utility for unidirectional data flow
 * and reactive DOM/context interactions.
 */

import {registerBindAttribDirective} from './directive_bind_attrib.js';
import {registerBindTextDirective} from './directive_bind_text.js';
import {registerBindValueDirective} from './directive_bind_value.js';

export * from './service_binding.js';
export * from './type.js';

/**
 * Bootstraps and registers all declarative binding directives in the application.
 *
 * Registers the following directives:
 * - `bind-text`: Binds DOM elements' `textContent` to a view model's property.
 * - `bind-value`: Binds input element values to a view model's property with cursor position guard.
 * - `bind-attrib`: Binds element attributes to view model properties with presence and removal support.
 *
 * Directives are registered as lazy directives under their respective attribute names.
 *
 * @example
 * ```typescript
 * import {setupBindDirectives} from '@alwatr/bind';
 *
 * // Call during application bootstrap
 * setupBindDirectives(true);
 * ```
 */
export function setupBindDirectives(autoBootstrap: boolean): void {
  registerBindTextDirective(autoBootstrap);
  registerBindValueDirective(autoBootstrap);
  registerBindAttribDirective(autoBootstrap);
}
