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
 * This module implements the **Qwik-inspired global delegation** pattern:
 * - A single listener per event type is attached to `document.body` with
 *   `capture: true` (so it fires even for non-bubbling events).
 * - When an event fires, the handler walks up the DOM from `event.target`
 *   using `closest()` to find the nearest element with an `on-action`
 *   attribute whose event type matches.
 * - Modifiers and payload resolvers run in the same pipeline as before.
 * - `dispatchAction` is called with the resolved payload.
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
 * - `once` is emulated by delete attribute elements after first fire.
 */

import {internalChannel_, logger_} from './lib.js';
import {modifierRegistry, payloadRegistry} from './registry.js';

// ─── Syntax Parser ────────────────────────────────────────────────────────────

/**
 * Parses the `on-action` attribute value into its three segments.
 *
 * Full syntax: `eventType[.modifier…]->actionId[:payload]`
 *
 * | Capture group | Matches                                     | Example              |
 * | ------------- | ------------------------------------------- | -------------------- |
 * | 1             | Event type + optional dot-chained modifiers | `click.prevent.once` |
 * | 2             | Action identifier                           | `open-drawer`        |
 * | 3             | Optional payload token or literal           | `main` / `$value`    |
 *
 * @example
 * ```
 * 'click.prevent.once->open-drawer:main' → ['click.prevent.once', 'open-drawer', 'main']
 * 'input->search-query:$value'           → ['input',              'search-query', '$value']
 * 'submit.prevent->submit-form'          → ['submit.prevent',     'submit-form',  undefined]
 * ```
 */
const syntaxRegex = /^([a-z0-9.-]+)->([a-z0-9-]+)(?::(.+))?$/;

// ─── Parsed Action Descriptor ─────────────────────────────────────────────────

/**
 * Parsed and cached representation of a single `on-action` attribute value.
 *
 * Caching avoids re-parsing the same attribute string on every event fire.
 * The cache is keyed by the raw attribute string so identical values share
 * the same descriptor object.
 */
interface ActionDescriptor {
  /** The DOM event type to listen for (e.g. `'click'`, `'input'`). */
  readonly eventType: string;
  /** Set of active modifier names (e.g. `{'prevent', 'once'}`). */
  readonly modifiers: ReadonlySet<string>;
  /** The action identifier dispatched to `onAction` subscribers. */
  readonly actionId: string;
  /** Raw payload token from the attribute (literal string or `$`-resolver key). */
  readonly payload: string | undefined;
}

/**
 * LRU-style cache for parsed `on-action` attribute values.
 *
 * Attribute strings are typically repeated across many elements (e.g. every
 * "add to cart" button shares the same `on-action` value). Caching the parsed
 * descriptor avoids redundant regex work on every event.
 *
 * Using a plain `Map` here is intentional — attribute strings are short-lived
 * keys and the map size is bounded by the number of distinct `on-action` values
 * in the page, which is typically small.
 *
 * @internal
 */
const descriptorCache__ = new Map<string, ActionDescriptor | null>();

/**
 * Parses an `on-action` attribute value into an `ActionDescriptor`.
 *
 * Returns `null` when the syntax is invalid. Results are cached by the raw
 * attribute string so repeated calls for the same value are O(1).
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

  const [eventType, ...modifierList] = match[1].split('.');
  if (!eventType) {
    logger_.accident('parseDescriptor__', 'missing_event_type', {attributeValue});
    descriptorCache__.set(attributeValue, null);
    return null;
  }

  const modifiers = new Set(modifierList);
  const actionId = match[2];
  const payload: string | undefined = match[3];

  const descriptor: ActionDescriptor = {
    eventType,
    modifiers,
    actionId,
    payload,
  };

  descriptorCache__.set(attributeValue, descriptor);
  return descriptor;
}

// ─── Core Delegation Handler ──────────────────────────────────────────────────

const onActionAttrib__ = 'on-action';
/**
 * Central event handler attached to `document.body` for every delegated event type.
 *
 * Execution flow for each incoming event:
 * 1. Walk up from `event.target` to find the nearest element with an
 *    `on-action` attribute whose event type matches the current event.
 * 2. Parse (or retrieve from cache) the `ActionDescriptor` for that attribute.
 * 3. Run each modifier in order; if any returns `false`, abort.
 * 4. Resolve the payload token (literal or `$`-resolver).
 * 5. Call `dispatchAction(actionId, payload)`.
 *
 * @internal
 */
function handleDelegatedEvent__(event: Event): void {
  const eventType = event.type;
  logger_.logMethodArgs?.('handleDelegatedEvent__', {eventType});

  // Walk up the DOM to find the closest element with a matching on-action attribute.
  // We use `closest` on the composedPath target to support Shadow DOM correctly.
  const target = event.target as Element | null;
  if (!target) return;

  // Find the nearest ancestor (or self) that has an on-action attribute
  const actionElement = target.closest?.(`[${onActionAttrib__}^=${eventType}]`);
  if (!actionElement) return;

  const attributeValue = actionElement.getAttribute?.(onActionAttrib__)?.trim();
  if (!attributeValue) {
    logger_.accident('handleDelegatedEvent__', 'empty_attribute', {eventType, attributeValue, actionElement});
    return;
  }

  if (!(actionElement instanceof HTMLElement)) {
    logger_.accident('handleDelegatedEvent__', 'target_not_html_element', {eventType, attributeValue, actionElement});
    return;
  }

  const descriptor = parseDescriptor__(attributeValue);
  if (!descriptor) {
    logger_.accident('handleDelegatedEvent__', 'invalid_attribute', {eventType, attributeValue, actionElement});
    return;
  }

  if (descriptor.eventType !== eventType) return;

  logger_.logMethodArgs?.('handleDelegatedEvent__.action', descriptor);

  // Step 1: handle once modifier
  if (descriptor.modifiers.has('once')) {
    actionElement.removeAttribute(onActionAttrib__); // remove on-action to prevent repeat the action
    descriptorCache__.delete(attributeValue); // free memory for once
  }

  // Step 2: run modifiers
  for (const modifier of descriptor.modifiers) {
    if (modifier === 'once') continue; // handled separately
    const handler = modifierRegistry.get(modifier);
    if (!handler) {
      logger_.accident('handleDelegatedEvent__', 'unknown_modifier', {modifier, attributeValue});
      return; // unknown modifier — abort to avoid silent misbehaviour
    }
    if (handler(event, actionElement) === false) return;
  }

  // Step 3: resolve payload
  let payload: unknown = descriptor.payload;
  if (payload) {
    const resolver = payloadRegistry.get(payload as string);
    if (resolver) payload = resolver(event, actionElement);
  }

  // Step 4: dispatch
  internalChannel_.dispatch(descriptor.actionId, payload);
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
 * Registers global event delegation for `on-action` attributes.
 *
 * Attaches a single `capture`-phase listener on `document.body` for each
 * event type in `eventTypes`. All `on-action` processing — modifier execution,
 * payload resolution, and `dispatchAction` — happens inside that one handler.
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
 * @param eventTypes - Event types to delegate. Defaults to `DEFAULT_DELEGATED_EVENTS`.
 *
 * @example — minimal bootstrap
 * ```ts
 * import {setupActionDelegation, onAction} from '@alwatr/action';
 *
 * // One call activates the entire page.
 * setupActionDelegation();
 *
 * onAction('open-drawer', (panel) => openDrawer(panel));
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
