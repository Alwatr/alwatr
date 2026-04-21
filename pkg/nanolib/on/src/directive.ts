import {lazyDirective, DirectiveBase} from '@alwatr/directive';
import {eventSignal_} from './lib.js';

/**
 * Regex for parsing the `alwatr-on` attribute value.
 *
 * Format: `event.modifier1.modifier2->actionId` or `event.modifier->actionId:payload`
 *
 * - Group 1: DOM event type with optional modifiers (e.g. `click.prevent.once`, `input`, `init`)
 * - Group 2: action identifier (e.g. `open-drawer`)
 * - Group 3: optional payload literal or `$value` (e.g. `main`, `$value`)
 *
 * @example
 * 'click.prevent.once->open-drawer:main'   → ['click.prevent.once', 'open-drawer', 'main']
 * 'input->search-query:$value' → ['input', 'search-query', '$value']
 * 'init->page-loaded'          → ['init', 'page-loaded', undefined]
 */
const syntaxRegex = /^([a-z0-9.-]+)->([a-z0-9-]+)(?::(.+))?$/;

type OnModifier = 'once' | 'prevent' | 'stop' | 'passive';

const supportedModifierSet = new Set<OnModifier>(['once', 'prevent', 'stop', 'passive']);

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
  protected actionContext_?: {
    eventType: string;
    modifiers: ReadonlySet<OnModifier>;
    actionId: string;
    actionPayload?: string;
  };

  protected override init_(): void {
    this.logger_.logMethodArgs?.('init_', {attributeValue: this.attributeValue});

    const match = this.attributeValue.trim().match(syntaxRegex);

    if (!match) {
      this.logger_.accident('init_', 'invalid_syntax', {attributeValue: this.attributeValue});
      return;
    }

    const [eventType, ...modifierList] = match[1].split('.');

    const modifiers = new Set<OnModifier>();
    for (const modifier of modifierList) {
      if (!supportedModifierSet.has(modifier as OnModifier)) {
        this.logger_.accident('init_', 'invalid_modifier', {attributeValue: this.attributeValue, modifier});
        return;
      }
      modifiers.add(modifier as OnModifier);
    }

    this.actionContext_ = {
      eventType,
      modifiers,
      actionId: match[2],
      actionPayload: match[3],
    };

    if (eventType === 'init') {
      this.dispatch_();
      void this.destroy();
      return;
    }

    this.dispatch_ = this.dispatch_.bind(this);
    const listenerOptions: AddEventListenerOptions = {once: modifiers.has('once'), passive: modifiers.has('passive')};
    this.element_.addEventListener(eventType, this.dispatch_, listenerOptions);
    this.addDestroyHook(() => {
      this.element_.removeEventListener(eventType, this.dispatch_, listenerOptions);
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
  protected dispatch_(event?: Event): void {
    this.logger_.logMethodArgs?.('dispatch_', {eventType: event?.type, actionContext: this.actionContext_});

    if (event != null && this.actionContext_!.modifiers.has('prevent')) {
      event.preventDefault();
    }

    if (event != null && this.actionContext_!.modifiers.has('stop')) {
      event.stopPropagation();
    }

    let actionPayload = this.actionContext_!.actionPayload;
    if (actionPayload === '$value' && 'value' in this.element_) {
      actionPayload = (this.element_ as {value: string}).value;
    }

    internalSignal_.dispatch({actionId: this.actionContext_!.actionId, actionPayload});
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
