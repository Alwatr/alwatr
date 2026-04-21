import {lazyDirective, DirectiveBase} from '@alwatr/directive';
import {eventSignal_} from './signal.js';

/**
 * Regex for parsing the `alwatr-on` attribute value.
 *
 * Format: `event->actionId` or `event->actionId:payload`
 *
 * - Group 1: DOM event type (e.g. `click`, `input`, `init`)
 * - Group 2: action identifier (e.g. `open-drawer`)
 * - Group 3: optional payload literal or `$value` (e.g. `main`, `$value`)
 *
 * @example
 * 'click->open-drawer:main'   → ['click', 'open-drawer', 'main']
 * 'input->search-query:$value' → ['input', 'search-query', '$value']
 * 'init->page-loaded'          → ['init', 'page-loaded', undefined]
 */
const syntaxRegex = /^([a-z0-9-]+)->([a-z0-9-]+)(?::(.+))?$/;

/**
 * A directive that listens to a DOM event and dispatches a typed action signal.
 *
 * Activated by the `alwatr-on` HTML attribute. The attribute value must follow
 * the syntax `event->actionId` or `event->actionId:payload`.
 *
 * Special event type `init` dispatches the action immediately on initialization
 * (without registering a persistent DOM listener) and then destroys itself.
 *
 * The special payload value `$value` is resolved to the element's `.value`
 * property at dispatch time (useful for `<input>` elements).
 *
 * @example
 * ```html
 * <!-- Dispatches 'open-drawer' with payload 'main' on click -->
 * <button alwatr-on="click->open-drawer:main">Open</button>
 *
 * <!-- Dispatches 'search-query' with the input's current value on every keystroke -->
 * <input alwatr-on="input->search-query:$value" />
 *
 * <!-- Dispatches 'page-loaded' once, immediately on bootstrap -->
 * <div alwatr-on="init->page-loaded"></div>
 * ```
 */
export class AlwatrActionDirective extends DirectiveBase {
  /**
   * Parsed result of the attribute value against `syntaxRegex`.
   * `null` when the attribute value is invalid.
   */

  protected actionContext_?: {actionId: string; actionPayload?: string};

  protected override init_(): void {
    const match = this.attributeValue.trim().match(syntaxRegex);

    if (!match) {
      this.logger_.accident('init_', 'invalid_syntax', {attributeValue: this.attributeValue});
      return;
    }

    const eventType = match[1];
    this.actionContext_ = {actionId: match[2], actionPayload: match[3]};

    if (eventType === 'init') {
      // Create a synthetic CustomEvent so event.target === element_ and event.type === 'init'.
      // dispatchEvent must be called first so the browser sets event.target before we forward it.
      const syntheticEvent = new CustomEvent('init', {bubbles: false, cancelable: false});
      this.element_.dispatchEvent(syntheticEvent);
      this.dispatch_(syntheticEvent);
      void this.destroy();
      return;
    }

    this.dispatch_ = this.dispatch_.bind(this);
    this.element_.addEventListener(eventType, this.dispatch_);
    this.addDestroyHook(() => {
      this.element_.removeEventListener(eventType, this.dispatch_);
    });
  }

  /**
   * Resolves the action payload and dispatches the action signal.
   *
   * - Calls `event.preventDefault()` to suppress default browser behaviour.
   * - Resolves `$value` to `element_.value` for input-like elements.
   * - Always receives a valid `Event` — either a real DOM event or the synthetic
   *   `CustomEvent('init')` created in `init_()`.
   *
   * Signature is compatible with `EventListener` so it can be passed directly
   * to `addEventListener`.
   */
  protected dispatch_(event: Event): void {
    event.preventDefault();

    let actionPayload = this.actionContext_!.actionPayload ?? '';
    if (actionPayload === '$value' && 'value' in this.element_) {
      actionPayload = (this.element_ as {value: string}).value;
    }

    eventSignal_.dispatch({actionId: this.actionContext_!.actionId, actionPayload, event});
  }
}

/**
 * Lazy registration function for `AlwatrActionDirective`.
 *
 * Call this function once before `bootstrapDirectives()` to opt-in to `alwatr-on` support.
 * If never called, the entire directive module is tree-shaken from the bundle.
 *
 * @example
 * ```ts
 * import {registerAlwatrOnDirective} from '@alwatr/on';
 * import {bootstrapDirectives} from '@alwatr/directive';
 *
 * registerAlwatrOnDirective();
 * bootstrapDirectives();
 * ```
 */
export const registerAlwatrOnDirective = lazyDirective('alwatr-on', AlwatrActionDirective);
