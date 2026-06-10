import {createLogger} from '@alwatr/logger';
import {createChannelSignal} from '@alwatr/signal';
import type {SubscribeResult} from '@alwatr/signal';
import type {Awaitable, VoidFunc} from '@alwatr/type-helper';

import type {Action, ActionDescriptor, ActionRecord, DispatchParam, ModifierHandler, PayloadResolver} from './type.js';

/**
 * Regex parser for the `on-<eventType>` attribute syntax.
 * Syntax: `actionId[:payload][; modifier1,modifier2,...]`
 */
const syntaxRegex = /^(ui_[a-z0-9_-]+)(?::([^;]+))?(?:;\s*([a-z0-9_,-]+))?$/;

/**
 * Service to manage declarative DOM actions, programmatic dispatch,
 * modifiers, payload resolvers, and global event delegation.
 *
 * @example
 * ```ts
 * import {ActionService} from '@alwatr/action';
 *
 * const customActionService = new ActionService();
 * ```
 */
export class ActionService {
  /**
   * Default DOM event types that cover the vast majority of interactive elements.
   */
  static readonly DEFAULT_DELEGATED_EVENTS: readonly string[] = ['click', 'submit', 'input', 'change'];

  protected readonly logger_ = createLogger('action-service');

  /**
   * Internal ChannelSignal used for routing dispatched actions.
   * @protected
   */
  protected readonly internalChannel_ = createChannelSignal<Record<string, Action>>({name: 'action-service'});

  /**
   * Registry mapping custom modifiers to their handlers.
   * @protected
   */
  protected readonly modifierRegistry_ = new Map<string, ModifierHandler>();

  /**
   * Registry mapping custom payload resolvers to their functions.
   * @protected
   */
  protected readonly payloadRegistry_ = new Map<string, PayloadResolver>();

  /**
   * Cache of parsed action descriptors to prevent redundant regex evaluation.
   * @protected
   */
  protected readonly descriptorCache_ = new Map<string, ActionDescriptor | null>();

  /**
   * Tracked event types currently delegated to `document.body`.
   * @protected
   */
  protected readonly delegatedEventTypes_ = new Set<string>();

  /**
   * Bound delegation handler for add/removeEventListener.
   * @private
   */
  private readonly handleDelegatedEventBound__ = this.handleDelegatedEvent_.bind(this);

  constructor() {
    DEV_MODE && this.logger_.logMethod?.('constructor');
    this.registerDefaultModifiersAndResolvers__();
  }

  /**
   * Subscribes to a named action dispatched anywhere in the application.
   *
   * @template K - A key of ActionRecord.
   * @param type    - Action type or array of action types to subscribe to.
   * @param handler - Callback invoked with the full Action object.
   * @returns SubscribeResult containing an `unsubscribe` method.
   *
   * @example
   * ```ts
   * // Subscribe to a single action
   * const sub1 = actionService.on('ui_open_drawer', (action) => {
   *   console.log(action.payload);
   * });
   *
   * // Subscribe to multiple action types
   * const sub2 = actionService.on(['ui_open_drawer', 'ui_close_drawer'], (action) => {
   *   console.log(action.type, action.payload);
   * });
   * ```
   */
  on<K extends keyof ActionRecord>(type: K | K[], handler: (action: Action<K>) => Awaitable<void>): SubscribeResult {
    DEV_MODE && this.logger_.logMethodArgs?.('on', {type});
    if (Array.isArray(type)) {
      const typeList = type as K[];
      const unsubscribeList: VoidFunc[] = [];
      for (const type_ of typeList) {
        unsubscribeList.push(
          this.internalChannel_.on(type_, handler as (action: Action) => Awaitable<void>).unsubscribe,
        );
      }
      return {
        unsubscribe: () => {
          DEV_MODE && this.logger_.logMethod?.('unsubscribe');
          for (const unsubscribe of unsubscribeList) {
            unsubscribe();
          }
          unsubscribeList.length = 0;
        },
      };
    }
    return this.internalChannel_.on(type, handler as (action: Action) => Awaitable<void>);
  }

  /**
   * Dispatches an action to all subscribers matching `action.type`.
   *
   * @template K - A key of ActionRecord.
   * @param action - Action object containing `type` and `payload`.
   *
   * @example
   * ```ts
   * // Dispatches a typed action (payload is required)
   * actionService.dispatch({type: 'upload_complete', payload: 'file-123'});
   *
   * // Dispatches a void action (payload can be omitted)
   * actionService.dispatch({type: 'auth_expired'});
   * ```
   */
  dispatch<K extends keyof ActionRecord>(action: DispatchParam<K>): void {
    DEV_MODE && this.logger_.logMethodArgs?.('dispatch', action);
    this.internalChannel_.dispatch(action.type, action as Action<K>);
  }

  /**
   * Registers a custom modifier to enrich or filter actions before dispatch.
   *
   * @param name    - Modifier name (lowercase, alphanumeric).
   * @param handler - Function called when modifier is invoked.
   *
   * @example
   * ```ts
   * actionService.registerModifier('trace', (_event, _element, action) => {
   *   action.meta ??= {};
   *   action.meta['time'] = Date.now();
   *   return true;
   * });
   * ```
   */
  registerModifier(name: string, handler: ModifierHandler): void {
    DEV_MODE && this.logger_.logMethodArgs?.('registerModifier', {name});
    if (this.modifierRegistry_.has(name)) {
      this.logger_.accident('registerModifier', 'modifier_already_registered', {name});
      return;
    }
    this.modifierRegistry_.set(name, handler);
  }

  /**
   * Registers a custom payload resolver to map DOM state to action payload.
   *
   * @param name     - Resolver token (by convention starting with `$`).
   * @param resolver - Function yielding payload from the event and element.
   *
   * @example
   * ```ts
   * actionService.registerPayloadResolver('$data-id', (_event, element) => {
   *   return element.dataset.id;
   * });
   * ```
   */
  registerPayloadResolver(name: string, resolver: PayloadResolver): void {
    DEV_MODE && this.logger_.logMethodArgs?.('registerPayloadResolver', {name});
    if (this.payloadRegistry_.has(name)) {
      this.logger_.accident('registerPayloadResolver', 'payload_resolver_already_registered', {name});
      return;
    }
    this.payloadRegistry_.set(name, resolver);
  }

  /**
   * Registers global event delegation listeners on `document.body`.
   *
   * @param eventTypes - List of event types to delegate. Defaults to ActionService.DEFAULT_DELEGATED_EVENTS.
   *
   * @example
   * ```ts
   * actionService.setupDelegation();
   * ```
   */
  setupDelegation(eventTypes: readonly string[] = ActionService.DEFAULT_DELEGATED_EVENTS): void {
    DEV_MODE && this.logger_.logMethodArgs?.('setupDelegation', {eventTypes});
    if (typeof document === 'undefined' || !document.body) {
      DEV_MODE && this.logger_.incident?.('setupDelegation', 'document_body_not_found');
      return;
    }

    for (const eventType of eventTypes) {
      if (this.delegatedEventTypes_.has(eventType)) continue;
      this.delegatedEventTypes_.add(eventType);
      document.body.addEventListener(eventType, this.handleDelegatedEventBound__, {capture: true});
    }
  }

  /**
   * Unregisters all global event delegation listeners.
   *
   * @example
   * ```ts
   * actionService.teardownDelegation();
   * ```
   */
  teardownDelegation(): void {
    DEV_MODE && this.logger_.logMethod?.('teardownDelegation');
    if (typeof document === 'undefined' || !document.body) {
      return;
    }
    for (const eventType of this.delegatedEventTypes_) {
      document.body.removeEventListener(eventType, this.handleDelegatedEventBound__, {capture: true});
    }
    this.delegatedEventTypes_.clear();
    this.descriptorCache_.clear();
  }

  /**
   * Parses attribute values into action descriptor, utilizing the internal cache.
   * @protected
   */
  protected parseDescriptor_(attributeValue: string): ActionDescriptor | null {
    DEV_MODE && this.logger_.logMethodArgs?.('parseDescriptor_', {attributeValue});

    const cached = this.descriptorCache_.get(attributeValue);
    if (cached !== undefined) return cached;

    const match = attributeValue.match(syntaxRegex);
    if (!match) {
      this.logger_.accident('parseDescriptor_', 'invalid_syntax', {attributeValue});
      this.descriptorCache_.set(attributeValue, null);
      return null;
    }

    const actionId = match[1]!;
    const payload = match[2];
    const modifierString = match[3];
    const modifiers = modifierString ? new Set(modifierString.split(',').filter(Boolean)) : new Set<string>();

    const descriptor: ActionDescriptor = {modifiers, actionId, payload};
    this.descriptorCache_.set(attributeValue, descriptor);
    return descriptor;
  }

  /**
   * Global event delegation handler.
   * @protected
   */
  protected handleDelegatedEvent_(event: Event): void {
    const eventType = event.type;
    DEV_MODE && this.logger_.logMethodArgs?.('handleDelegatedEvent_', {eventType});

    const target = event.target as Element | null;
    if (!target) return;

    const actionAttrib = `on-${eventType}`;
    const actionElement = target.closest?.(`[${actionAttrib}]`);
    if (!actionElement) return;

    const attributeValue = actionElement.getAttribute?.(actionAttrib)?.trim();
    if (!attributeValue) {
      this.logger_.accident('handleDelegatedEvent_', 'empty_attribute', {eventType, actionElement});
      return;
    }

    if (!(actionElement instanceof HTMLElement)) {
      this.logger_.accident('handleDelegatedEvent_', 'target_not_html_element', {eventType, actionElement});
      return;
    }

    const descriptor = this.parseDescriptor_(attributeValue);
    if (!descriptor) return;

    DEV_MODE && this.logger_.logMethodArgs?.('handleDelegatedEvent_.action', {eventType, descriptor});

    if (descriptor.modifiers.has('once')) {
      actionElement.removeAttribute(actionAttrib);
    }

    const actionContext = actionElement.closest('[action-context]')?.getAttribute('action-context') ?? undefined;

    const action: Action = {
      type: descriptor.actionId as keyof ActionRecord,
      context: actionContext,
      payload: descriptor.payload as ActionRecord[keyof ActionRecord],
    };

    for (const modifier of descriptor.modifiers) {
      if (modifier === 'once') continue;
      const handler = this.modifierRegistry_.get(modifier);
      if (!handler) {
        this.logger_.accident('handleDelegatedEvent_', 'unknown_modifier', {
          eventType,
          modifier,
          attributeValue,
          descriptor,
        });
        return;
      }
      try {
        if (handler(event, actionElement, action) === false) return;
      } catch (error) {
        this.logger_.accident('handleDelegatedEvent_', 'modifier_execution_failed', {
          modifier,
          error,
        });
        return;
      }
    }

    if (descriptor.payload) {
      const resolver = this.payloadRegistry_.get(descriptor.payload);
      if (resolver) {
        try {
          (action as {payload: unknown}).payload = resolver(event, actionElement);
        } catch (error) {
          this.logger_.accident('handleDelegatedEvent_', 'payload_resolver_failed', {
            resolver: descriptor.payload,
            error,
          });
          return;
        }
      }
    } else {
      (action as {payload: unknown}).payload = undefined;
    }

    this.internalChannel_.dispatch(action.type, action);
  }

  /**
   * Registers default modifiers and resolvers.
   * @private
   */
  private registerDefaultModifiersAndResolvers__(): void {
    DEV_MODE && this.logger_.logMethod?.('registerDefaultModifiersAndResolvers__');

    // Built-in modifiers
    this.registerModifier('prevent', (event) => {
      event.preventDefault();
      return true;
    });

    this.registerModifier('validate', (_event, element) => {
      const form = element instanceof HTMLFormElement ? element : element.closest('form');
      if (!form) return false;
      return form.checkValidity();
    });

    // Built-in resolvers
    this.registerPayloadResolver('$value', (_event, element) => {
      return 'value' in element ? (element as {value: unknown}).value : null;
    });

    this.registerPayloadResolver('$formdata', (_event, element) => {
      const form = element instanceof HTMLFormElement ? element : element.closest('form');
      return form ? Object.fromEntries(new FormData(form)) : null;
    });

    this.registerPayloadResolver('$checked', (_event, element) => {
      return 'checked' in element ? (element as HTMLInputElement).checked : null;
    });
  }
}

/**
 * Singleton instance of the ActionService.
 * Ready for immediate use.
 *
 * @example
 * ```ts
 * import {actionService} from '@alwatr/action';
 *
 * actionService.setupDelegation();
 * ```
 */
export const actionService = new ActionService();
