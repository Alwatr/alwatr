import {directive, DirectiveBase} from '@alwatr/directive';
import {eventSignal_} from './signal';

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
const syntaxRegex = /^([a-z]+)->([a-z0-9-]+)(?::(.+))?$/;

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
@directive('alwatr-on')
export class AlwatrActionDirective extends DirectiveBase {
  /**
   * Parsed result of the attribute value against `syntaxRegex`.
   * `null` when the attribute value is invalid.
   */
  protected match = this.attributeValue.trim().match(syntaxRegex);

  protected init_(): void {
    if (!this.match) {
      this.logger_.accident('init_', 'invalid_syntax', {attributeValue: this.attributeValue});
      return;
    }

    const eventType = this.match[1];

    if (eventType === 'init') {
      this.dispatch_();
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
   * - Calls `event.preventDefault()` when a DOM event is provided.
   * - Resolves `$value` to `element_.value` for input-like elements.
   */
  protected dispatch_(event?: Event): void {
    event?.preventDefault();

    const actionId = this.match![2];
    const actionPayloadRaw = this.match![3];

    let actionPayload = actionPayloadRaw ?? '';
    if (actionPayload === '$value' && 'value' in this.element_) {
      actionPayload = (this.element_ as HTMLInputElement).value;
    }

    eventSignal_.dispatch({actionId, actionPayload});
  }
}
