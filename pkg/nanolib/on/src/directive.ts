import {lazyDirective, DirectiveBase} from '@alwatr/directive';
import {modifierRegistry, payloadRegistry} from './registry.js';
import {alwatrDispatch} from './main.js';

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
    modifiers: ReadonlySet<string>;
    actionId: string;
    payload?: string;
  };

  protected override init_(): void {
    this.logger_.logMethodArgs?.('init_', {attributeValue: this.attributeValue});

    const match = this.attributeValue.trim().match(syntaxRegex);

    if (!match) {
      this.logger_.accident('init_', 'invalid_syntax', {attributeValue: this.attributeValue});
      return;
    }

    const [eventType, ...modifierList] = match[1].split('.');
    const actionId = match[2];
    const payload = match[3] as string | undefined;

    const modifiers = new Set<string>();
    for (const modifier of modifierList) {
      if (!modifierRegistry.has(modifier) && modifier !== 'once' && modifier !== 'passive') {
        this.logger_.accident('init_', 'invalid_modifier', {attributeValue: this.attributeValue, modifier});
        return;
      }
      modifiers.add(modifier);
    }

    if (modifiers.has('once') && modifiers.has('prevent')) {
      this.logger_.accident('init_', 'conflicting_modifiers_once_passive', {attributeValue: this.attributeValue});
    }

    this.actionContext_ = {
      eventType,
      modifiers,
      actionId,
      payload,
    };

    this.dispatch_ = this.dispatch_.bind(this);
    const listenerOptions: AddEventListenerOptions = {
      once: modifiers.has('once'),
      passive: modifiers.has('passive') && !modifiers.has('prevent'),
    };
    this.element_.addEventListener(eventType, this.dispatch_, listenerOptions);
    this.addDestroyHook(() => {
      this.element_.removeEventListener(eventType, this.dispatch_, listenerOptions);
    });
  }

  /**
   * Event handler that processes modifiers, resolves payload, and dispatches the action signal.
   *
   * Modifiers are processed first. If any modifier handler returns `false`, the dispatch is cancelled.
   * Then the payload is resolved using the payload registry if applicable.
   * Finally, the action signal is dispatched with the resolved payload.
   *
   * @param event The DOM event that triggered the handler.
   */
  protected dispatch_(event: Event): void {
    this.logger_.logMethodArgs?.('dispatch_', {eventType: event?.type, actionContext: this.actionContext_});

    const context = this.actionContext_!;

    // Process modifiers first. If any modifier handler returns false, cancel the dispatch.
    for (const mod of context.modifiers) {
      const handler = modifierRegistry.get(mod);
      if (handler && handler.call(this, event) === false) {
        return; // Modifier handler can cancel the dispatch by returning false
      }
    }

    // Resolve payload if specified
    let payload: unknown = context.payload;
    if (payload) {
      const resolver = payloadRegistry.get(payload as string);
      if (resolver) {
        payload = resolver.call(this, event);
      }
    }

    // Dispatch the action signal with the resolved payload
    alwatrDispatch(context.actionId, payload);
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
