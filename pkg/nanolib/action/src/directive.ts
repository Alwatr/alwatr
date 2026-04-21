import {lazyDirective, DirectiveBase} from '@alwatr/directive';
import {modifierRegistry, payloadRegistry} from './registry.js';
import {dispatchAction} from './method.js';

// ─── Attribute Syntax Parser ──────────────────────────────────────────────────

/**
 * Regex that parses the `on-action` attribute value into its three segments.
 *
 * Full syntax: `eventType[.modifier…]->actionId[:payload]`
 *
 * | Capture group | Matches                                     | Example                  |
 * | ------------- | ------------------------------------------- | ------------------------ |
 * | 1             | Event type + optional dot-chained modifiers | `click.prevent.once`     |
 * | 2             | Action identifier                           | `open-drawer`            |
 * | 3             | Optional payload token or literal           | `main` / `$value`        |
 *
 * @example
 * ```
 * 'click.prevent.once->open-drawer:main' → ['click.prevent.once', 'open-drawer', 'main']
 * 'input->search-query:$value'           → ['input',              'search-query', '$value']
 * 'init->page-loaded'                    → ['init',               'page-loaded',  undefined]
 * ```
 */
const syntaxRegex = /^([a-z0-9.-]+)->([a-z0-9-]+)(?::(.+))?$/;

// ─── Directive Class ──────────────────────────────────────────────────────────

/**
 * Directive that bridges a DOM event to a typed action signal.
 *
 * Activated automatically by the `on-action` HTML attribute when
 * `registerActionDirective()` has been called before `bootstrapDirectives()`.
 * You rarely need to reference this class directly.
 *
 * **Attribute syntax**
 * ```
 * on-action="eventType[.modifier…]->actionId[:payload]"
 * ```
 *
 * - `eventType` — any DOM event name, or the special token `init` for a
 *   one-shot dispatch that fires immediately on bootstrap.
 * - `modifier` — dot-chained tokens processed before dispatch
 *   (`prevent`, `stop`, `validate`, `once`, `passive`, or custom).
 * - `actionId` — the identifier passed to `onAction` subscribers.
 * - `payload` — an optional literal string or a `$`-prefixed resolver token
 *   (e.g. `$value`, `$formdata`, or custom).
 *
 * @example
 * ```html
 * <!-- Dispatches 'open-drawer' with payload 'settings' on click -->
 * <button on-action="click->open-drawer:settings">Settings</button>
 *
 * <!-- Dispatches 'search-query' with the live input value on every keystroke -->
 * <input on-action="input->search-query:$value" />
 *
 * <!-- Prevents default, validates, then dispatches 'submit-form' with all field values -->
 * <form on-action="submit.prevent.validate->submit-form:$formdata" novalidate>…</form>
 *
 * <!-- Dispatches 'page-loaded' exactly once, immediately on bootstrap -->
 * <div on-action="init->page-loaded"></div>
 * ```
 */
export class AlwatrActionDirective extends DirectiveBase {
  /**
   * Parsed and validated representation of the `on-action` attribute value.
   *
   * Set during `init_()` after the attribute is successfully parsed against
   * `syntaxRegex`. Remains `undefined` when the attribute value is invalid,
   * which prevents `dispatch_` from running.
   */
  protected actionContext_?: {
    /** The DOM event type to listen for (e.g. `'click'`, `'input'`). */
    eventType: string;
    /** Set of active modifier names (e.g. `{'prevent', 'once'}`). */
    modifiers: ReadonlySet<string>;
    /** The action identifier dispatched to `onAction` subscribers. */
    actionId: string;
    /** Raw payload token from the attribute (literal string or `$`-resolver key). */
    payload?: string;
  };

  /**
   * Parses the `on-action` attribute, validates modifiers, and attaches the
   * DOM event listener.
   *
   * Called once by `DirectiveBase` after one macrotask following element
   * discovery. If the attribute value is malformed or references an unknown
   * modifier, an accident is logged and the directive becomes a no-op.
   *
   * For the special `init` event type the action is dispatched immediately
   * and the directive self-destructs — no persistent listener is registered.
   */
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

    if (!eventType) {
      this.logger_.accident('init_', 'invalid_syntax', {attributeValue: this.attributeValue});
      return;
    }

    // Validate every modifier token against the registry (built-in native
    // options 'once' and 'passive' are handled separately by the listener).
    const modifiers = new Set<string>();
    for (const modifier of modifierList) {
      if (!modifierRegistry.has(modifier) && modifier !== 'once' && modifier !== 'passive') {
        this.logger_.accident('init_', 'invalid_modifier', {attributeValue: this.attributeValue, modifier});
        return;
      }
      modifiers.add(modifier);
    }

    // 'prevent' and 'passive' are mutually exclusive: a passive listener cannot
    // call preventDefault(). Log an accident but continue — 'passive' wins.
    if (modifiers.has('prevent') && modifiers.has('passive')) {
      this.logger_.accident('init_', 'conflicting_modifiers_prevent_passive', {attributeValue: this.attributeValue});
    }

    // Special case: 'init' is not a real DOM event — dispatch once and clean up.
    if (eventType === 'init') {
      dispatchAction(actionId, payload);
      this.destroy();
      return;
    }

    this.actionContext_ = {eventType, modifiers, actionId, payload};

    // Bind once so the same function reference is used for both add and remove.
    this.dispatch_ = this.dispatch_.bind(this);
    const listenerOptions: AddEventListenerOptions = {
      once: modifiers.has('once'),
      // 'passive' is only meaningful when 'prevent' is absent.
      passive: modifiers.has('passive') && !modifiers.has('prevent'),
    };

    this.element_.addEventListener(eventType, this.dispatch_, listenerOptions);
    // Register cleanup so the listener is removed when the directive is destroyed
    // (e.g. when the element is removed from the DOM via autoDestructDirectives).
    this.addDestroyHook(() => {
      this.element_.removeEventListener(eventType, this.dispatch_, listenerOptions);
    });
  }

  /**
   * DOM event handler: runs modifiers, resolves the payload, and dispatches
   * the action signal.
   *
   * Execution order:
   * 1. Each modifier in `actionContext_.modifiers` is called in insertion order.
   *    If any returns `false` the method returns early — no action is dispatched.
   * 2. The raw payload token is looked up in `payloadRegistry`. If a resolver
   *    is found it is called and its return value replaces the token.
   * 3. `dispatchAction` is called with the resolved payload.
   *
   * @param event - The DOM event that triggered this handler.
   */
  protected dispatch_(event: Event): void {
    this.logger_.logMethodArgs?.('dispatch_', {eventType: event.type, actionId: this.actionContext_?.actionId});

    const context = this.actionContext_!;

    // Step 1 — run modifiers; any returning false cancels the dispatch.
    for (const mod of context.modifiers) {
      const handler = modifierRegistry.get(mod);
      if (handler && handler.call(this, event) === false) return;
    }

    // Step 2 — resolve dynamic payload tokens (e.g. '$value', '$formdata').
    let payload: unknown = context.payload;
    if (payload) {
      const resolver = payloadRegistry.get(payload as string);
      if (resolver) payload = resolver.call(this, event);
    }

    // Step 3 — dispatch the action to all onAction subscribers.
    dispatchAction(context.actionId, payload);
  }
}

// ─── Lazy Registration ────────────────────────────────────────────────────────

/**
 * Registers `AlwatrActionDirective` under the `on-action` attribute name.
 *
 * This is a **lazy** registration: calling this function is the only way to
 * opt-in to `on-action` support. If it is never called, the entire directive
 * module (including `AlwatrActionDirective`) is tree-shaken from the bundle.
 *
 * Call it once, before `bootstrapDirectives()`, at your application entry point.
 *
 * @example
 * ```ts
 * import {registerActionDirective} from '@alwatr/action';
 * import {bootstrapDirectives} from '@alwatr/directive';
 *
 * registerActionDirective();
 * bootstrapDirectives();
 * ```
 */
export const registerActionDirective = lazyDirective('on-action', AlwatrActionDirective);
