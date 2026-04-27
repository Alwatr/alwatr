/**
 * @file delegate.ts
 *
 * Global Event Delegation engine for `@alwatr/action`.
 *
 * ## Why delegation instead of per-element listeners?
 *
 * The classic directive approach attaches one `addEventListener` per element.
 * With 100 buttons on a page, that means 100 listener registrations at boot
 * time — O(N) initialization cost, O(N) memory for listener references, and
 * zero support for elements added after bootstrap.
 *
 * This module implements the global delegation pattern:
 * - A single listener per event type is attached to `document.body` with
 *   `capture: true` (so it fires even for non-bubbling events).
 * - When an event fires, the handler walks up the DOM from `event.target`
 *   using `closest()` to find the nearest element with an `on-<eventType>`
 *   attribute (e.g. `on-click`, `on-submit`).
 * - The nearest `[action-context]` ancestor is also resolved and attached to
 *   the `Action` object as `context` — enabling the same action type to be
 *   scoped to different UI regions.
 * - Modifiers run with access to the mutable `Action` object so they can
 *   enrich `meta` before the action reaches subscribers.
 * - `dispatchAction` is called with the fully assembled `Action` object.
 *
 * ## Complexity
 *
 * | Metric          | Per-element listeners | Global delegation |
 * | --------------- | --------------------- | ----------------- |
 * | Boot time       | O(N elements)         | O(1) — 1 loop     |
 * | Memory          | O(N listeners)        | O(1) — 1 handler  |
 * | Dynamic content | Requires re-bootstrap | Works out-of-box  |
 * | `once` modifier | Native option         | Manual tracking   |
 *
 * ## Trade-offs vs. the directive approach
 *
 * - `passive` is not supported as a per-element option (all delegated listeners
 *   are non-passive so that `prevent` can call `preventDefault()`).
 * - `stop` stops further bubbling but the delegation handler has already
 *   captured the event at `body` level — it does not prevent other delegation
 *   handlers from running on the same element.
 * - `once` is emulated by removing the attribute after first fire.
 */

import {internalChannel_, logger_} from './lib.js';
import {modifierRegistry, payloadRegistry} from './registry.js';
import type {Action} from './action.js';
import type {ActionRecord} from './action-record.js';

// ─── Syntax Parser ────────────────────────────────────────────────────────────

/**
 * Parses the `on-<eventType>` attribute value into its segments.
 *
 * Syntax: `actionId[:payload][; modifier1,modifier2,…]`
 *
 * The event type is encoded in the **attribute name** itself (`on-click`,
 * `on-submit`, etc.) rather than inside the value. This makes the HTML more
 * readable and aligns with native event attribute conventions.
 *
 * | Capture group | Matches                                | Example                |
 * | ------------- | -------------------------------------- | ---------------------- |
 * | 1             | Action identifier                      | `open_drawer`          |
 * | 2             | Optional payload token or literal      | `main_menu` / `$value` |
 * | 3             | Optional comma-separated modifier list | `prevent,validate`     |
 *
 * @example
 * ```
 * 'close_drawer'
 *   → actionId='close_drawer', payload=undefined, modifiers={}
 *
 * 'open_drawer:main_menu'
 *   → actionId='open_drawer', payload='main_menu', modifiers={}
 *
 * 'my_submit_handler:$formdata; prevent,validate'
 *   → actionId='my_submit_handler', payload='$formdata', modifiers={'prevent','validate'}
 * ```
 */
const syntaxRegex = /^([a-z0-9_:-]+)(?::([^;]+))?(?:;\s*([a-z0-9_,-]+))?$/;

// ─── Parsed Action Descriptor ─────────────────────────────────────────────────

/**
 * Parsed and cached representation of a single `on-<eventType>` attribute value.
 *
 * Does not store `eventType` — the caller always has it from `event.type`,
 * and the attribute name already encodes it (e.g. `on-click`), so storing it
 * here would be redundant. This also keeps the cache key simple: just the raw
 * attribute value string, with no composite key needed.
 */
interface ActionDescriptor {
  /** Set of active modifier names (e.g. `{'prevent', 'once'}`). */
  readonly modifiers: ReadonlySet<string>;
  /** The action identifier dispatched to `onAction` subscribers. */
  readonly actionId: string;
  /** Raw payload token from the attribute (literal string or $-resolver key). */
  readonly payload: string | undefined;
}

/**
 * Cache for parsed `on-<eventType>` attribute values.
 *
 * Attribute strings are typically repeated across many elements (e.g. every
 * "add to cart" button shares the same `on-click` value). Caching the parsed
 * descriptor avoids redundant regex work on every event.
 *
 * The cache key is the raw attribute value string. No composite key with
 * event type is needed because the attribute name already encodes the event
 * type — `on-click="open_drawer"` and `on-submit="open_drawer"` are two
 * separate attributes with the same value string, but they are read from
 * different attribute names and never collide in this cache.
 *
 * @internal
 */
const descriptorCache__ = new Map<string, ActionDescriptor | null>();

/**
 * Parses an `on-<eventType>` attribute value into an `ActionDescriptor`.
 *
 * Returns `null` when the syntax is invalid. Results are cached by the raw
 * attribute value string so repeated calls for the same value are O(1).
 *
 * @internal
 */
function parseDescriptor__(attributeValue: string): ActionDescriptor | null {
  logger_.logMethodArgs?.('parseDescriptor__', {attributeValue});

  const cached = descriptorCache__.get(attributeValue);
  // Explicit `undefined` check: `null` means "already parsed and invalid".
  if (cached !== undefined) return cached;

  const match = attributeValue.match(syntaxRegex);
  if (!match) {
    logger_.accident('parseDescriptor__', 'invalid_syntax', {attributeValue});
    descriptorCache__.set(attributeValue, null);
    return null;
  }

  const actionId = match[1];
  const payload: string | undefined = match[2];
  // match[3] is the raw modifier list string, e.g. "prevent,validate"
  const modifierString = match[3];
  const modifiers: Set<string> = modifierString ? new Set(modifierString.split(',').filter(Boolean)) : new Set();
  const descriptor: ActionDescriptor = {modifiers, actionId, payload};

  descriptorCache__.set(attributeValue, descriptor);
  return descriptor;
}

// ─── Core Delegation Handler ──────────────────────────────────────────────────

/**
 * Central event handler attached to `document.body` for every delegated event type.
 *
 * Execution flow for each incoming event:
 * 1. Walk up from `event.target` to find the nearest element with an
 *    `on-<eventType>` attribute (e.g. `on-click`, `on-submit`).
 * 2. Parse (or retrieve from cache) the `ActionDescriptor` for that attribute.
 * 3. Resolve `context` from the nearest `[action-context]` ancestor.
 * 4. Build a mutable `Action` object with `type`, `payload` (raw), and `context`.
 * 5. Run each modifier in order with access to the mutable `Action`; if any
 *    returns `false`, abort.
 * 6. Resolve the payload token (literal or $-resolver) and assign to `action.payload`.
 * 7. Call `dispatchAction(action)` with the fully assembled object.
 *
 * @internal
 */
function handleDelegatedEvent__(event: Event): void {
  const eventType = event.type;
  logger_.logMethodArgs?.('handleDelegatedEvent__', {eventType});

  const target = event.target as Element | null;
  if (!target) return;

  // Attribute name encodes the event type: on-click, on-submit, etc.
  const actionAttrib = `on-${eventType}`;

  // Walk up the DOM to find the closest element with the matching on-<eventType> attribute.
  const actionElement = target.closest?.(`[${actionAttrib}]`);
  if (!actionElement) return;

  const attributeValue = actionElement.getAttribute?.(actionAttrib)?.trim();
  if (!attributeValue) {
    logger_.accident('handleDelegatedEvent__', 'empty_attribute', {eventType, actionElement});
    return;
  }

  if (!(actionElement instanceof HTMLElement)) {
    logger_.accident('handleDelegatedEvent__', 'target_not_html_element', {eventType, actionElement});
    return;
  }

  const descriptor = parseDescriptor__(attributeValue);
  if (!descriptor) return;

  logger_.logMethodArgs?.('handleDelegatedEvent__.action', {eventType, descriptor});

  // Step 1: handle `once` modifier — remove attribute before running other modifiers
  // so that even if a modifier aborts, the element will not fire again.
  if (descriptor.modifiers.has('once')) {
    actionElement.removeAttribute(actionAttrib);
  }

  // Step 2: resolve `context` from the nearest [action-context] ancestor.
  // Walk up from the action element itself (inclusive) to find the context scope.
  // This allows the action element itself to carry action-context if needed.
  const actionContext = actionElement.closest('[action-context]')?.getAttribute('action-context') ?? undefined;

  // Step 3: build the mutable Action object.
  // `payload` starts as the raw token string; it will be resolved in step 5.
  // Modifiers in step 4 may mutate `meta` to attach cross-cutting data.
  const action: Action = {
    type: descriptor.actionId as keyof ActionRecord,
    context: actionContext,
    // Payload is temporarily set to the raw token; resolved below after modifiers run.
    payload: descriptor.payload as ActionRecord[keyof ActionRecord],
  };

  // Step 4: run modifiers — each receives the mutable action so it can enrich meta.
  for (const modifier of descriptor.modifiers) {
    if (modifier === 'once') continue; // handled above
    const handler = modifierRegistry.get(modifier);
    if (!handler) {
      logger_.accident('handleDelegatedEvent__', 'unknown_modifier', {eventType, modifier, attributeValue, descriptor});
      return; // unknown modifier — abort to avoid silent misbehavior
    }
    if (handler(event, actionElement, action) === false) return;
  }

  // Step 5: resolve payload — replace raw token with the actual value.
  // If the raw token starts with '$', look it up in the payload resolver registry.
  // Otherwise treat it as a literal string payload.
  if (descriptor.payload) {
    const resolver = payloadRegistry.get(descriptor.payload);
    if (resolver) {
      // Cast needed: payload is typed as ActionRecord[K] but we're building generically.
      (action as {payload: unknown}).payload = resolver(event, actionElement);
    }
    // else: keep the literal string already set on action.payload
  } else {
    // No payload token in the attribute — set to undefined.
    (action as {payload: unknown}).payload = undefined;
  }

  // Step 6: dispatch the fully assembled Action object.
  internalChannel_.dispatch(action.type, action);
}

// ─── Setup ────────────────────────────────────────────────────────────────────

/**
 * The set of event types currently delegated to `document.body`.
 *
 * Tracked so that `setupActionDelegation` is idempotent — calling it multiple
 * times with the same event types does not register duplicate listeners.
 *
 * @internal
 */
const delegatedEventTypes__ = new Set<string>();

/**
 * Default DOM event types that cover the vast majority of interactive elements.
 *
 * - `click` — buttons, links, checkboxes, custom interactive elements
 * - `submit` — form submission
 * - `input` — live text input, range sliders
 * - `change` — select boxes, checkboxes, radio buttons (fires on commit)
 *
 * Pass additional types to `setupActionDelegation` when your app uses other
 * events (e.g. `'keydown'`, `'pointerup'`).
 */
export const DEFAULT_DELEGATED_EVENTS: readonly string[] = ['click', 'submit', 'input', 'change'];

/**
 * Registers global event delegation for `on-<eventType>` attributes.
 *
 * Attaches a single `capture`-phase listener on `document.body` for each
 * event type in `eventTypes`. All processing — context resolution, modifier
 * execution, payload resolution, and `dispatchAction` — happens inside that
 * one handler.
 *
 * **Call this once at application bootstrap**, before any user interaction.
 * Subsequent calls with the same event types are no-ops (idempotent).
 *
 * ### Why `capture: true`?
 *
 * Capture-phase listeners fire before bubble-phase listeners and also catch
 * events that do not bubble (e.g. `focus`, `blur`). This ensures the delegation
 * handler always runs, even when a child element calls `stopPropagation()`.
 *
 * ### Dynamic content
 *
 * Because the listener lives on `document.body`, any element added to the DOM
 * after this call — via `innerHTML`, `lit-html`, a framework renderer, or
 * server-sent HTML — is automatically covered. No re-bootstrap is needed.
 *
 * ### Context scoping
 *
 * Wrap a group of elements in a `[action-context]` container to scope their
 * actions. The delegation handler automatically resolves the nearest ancestor
 * and attaches its value to `action.context`:
 *
 * ```html
 * <section action-context="product-list">
 *   <button on-click="add_to_cart:42">Add</button>
 * </section>
 * ```
 *
 * ```ts
 * onAction('add_to_cart', (action) => {
 *   console.log(action.context); // 'product-list'
 * });
 * ```
 *
 * @param eventTypes - Event types to delegate. Defaults to `DEFAULT_DELEGATED_EVENTS`.
 *
 * @example — minimal bootstrap
 * ```ts
 * import {setupActionDelegation, onAction} from '@alwatr/action';
 *
 * // One call activates the entire page.
 * setupActionDelegation();
 *
 * onAction('open_drawer', (action) => openDrawer(action.payload));
 * ```
 *
 * @example — with extra event types
 * ```ts
 * import {setupActionDelegation, DEFAULT_DELEGATED_EVENTS} from '@alwatr/action';
 *
 * setupActionDelegation([...DEFAULT_DELEGATED_EVENTS, 'keydown', 'pointerup']);
 * ```
 */
export function setupActionDelegation(eventTypes: readonly string[] = DEFAULT_DELEGATED_EVENTS): void {
  logger_.logMethodArgs?.('setupActionDelegation', {eventTypes});

  for (const eventType of eventTypes) {
    if (delegatedEventTypes__.has(eventType)) continue; // already registered — skip
    delegatedEventTypes__.add(eventType);
    // capture: true — fires before bubble-phase listeners and catches non-bubbling events.
    document.body.addEventListener(eventType, handleDelegatedEvent__, {capture: true});
  }
}

/**
 * Removes all global delegation listeners registered by `setupActionDelegation`.
 *
 * Useful in test environments where each test needs a clean slate, or in
 * micro-frontend setups where a sub-app is unmounted.
 *
 * After calling this, `setupActionDelegation` can be called again to re-register.
 */
export function teardownActionDelegation(): void {
  logger_.logMethod?.('teardownActionDelegation');
  for (const eventType of delegatedEventTypes__) {
    document.body.removeEventListener(eventType, handleDelegatedEvent__, {capture: true});
  }
  delegatedEventTypes__.clear();
  descriptorCache__.clear();
}
