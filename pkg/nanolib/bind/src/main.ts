import {registerBindAttribDirective} from './directive_bind_attrib.js';
import {registerBindTextDirective} from './directive_bind_text.js';
import {registerBindValueDirective} from './directive_bind_value.js';

export * from './service_binding.js';
export * from './type.js';

export function setupBindDirectives(): void {
  registerBindTextDirective();
  registerBindValueDirective();
  registerBindAttribDirective();
}
