import {createLogger} from '@alwatr/logger';
import {createChannelSignal} from '@alwatr/signal';
import type {SubscribeResult} from '@alwatr/signal';
import type {VoidFunc} from '@alwatr/type-helper';

import type {
  Action,
  ActionDescriptor,
  ActionRecord,
  DispatchParam,
  ModifierHandler,
  PayloadResolver,
  ActionConfig,
  SubscribeOptions,
} from './type.js';

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
  static readonly DEFAULT_DELEGATED_EVENTS: readonly string[] = [
    // mouse events
    'click',
    // form events
    'submit',
    'input',
    'change',
    // dialog events
    'cancel',
    // player events
    // 'loadedmetadata',
    // 'play',
    // 'pause',
    // 'timeupdate',
    // 'ratechange',
    // 'ended',
    // 'error',
  ];

  private readonly logger__ = createLogger('action_service');

  /**
   * Internal ChannelSignal used for routing dispatched actions.
   * @private
   */
  private readonly internalChannel__ = createChannelSignal<Record<string, Action>>({name: 'action_service'});

  /**
   * Registry mapping custom modifiers to their handlers.
   * @private
   */
  private readonly modifierRegistry__ = new Map<string, ModifierHandler>();

  /**
   * Registry mapping custom payload resolvers to their functions.
   * @private
   */
  private readonly payloadRegistry__ = new Map<string, PayloadResolver>();

  /**
   * Cache of parsed action descriptors to prevent redundant regex evaluation.
   * @private
   */
  private readonly descriptorCache__ = new Map<string, ActionDescriptor | null>();

  /**
   * Tracked event types currently delegated to `document`.
   * @private
   */
  private readonly delegatedEventTypes__ = new Set<string>();

  constructor() {
    DEV_MODE && this.logger__.logMethod?.('constructor');
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
  on<K extends keyof ActionRecord>(
    type: K | K[],
    handler: (action: Action<K>) => void,
    options?: SubscribeOptions<K>,
  ): SubscribeResult {
    DEV_MODE && this.logger__.logMethodArgs?.('on', {type});

    const filter = options?.filter;
    const finalHandler =
      filter ?
        (action: Action<K>) => {
          if (filter(action)) {
            handler(action);
          }
        }
      : handler;

    if (Array.isArray(type)) {
      const typeList = type as K[];
      const unsubscribeList: VoidFunc[] = [];
      for (const type_ of typeList) {
        unsubscribeList.push(this.internalChannel__.on(type_, finalHandler as (action: Action) => void).unsubscribe);
      }
      return {
        unsubscribe: () => {
          DEV_MODE && this.logger__.logMethod?.('unsubscribe');
          for (const unsubscribe of unsubscribeList) {
            unsubscribe();
          }
          unsubscribeList.length = 0;
        },
      };
    }
    // else single type
    return this.internalChannel__.on(type, finalHandler as (action: Action) => void);
  }

  /**
   * Subscribes to multiple actions at once using a dictionary map.
   *
   * @param listeners - A map of action types to their respective handlers.
   * @param options - Standard subscription options.
   * @returns A single SubscribeResult to unsubscribe all registered listeners.
   *
   * @example
   * ```ts
   * const sub = actionService.subscribeAll({
   *   ui_open_drawer: (action) => { ... },
   *   ui_close_drawer: () => { ... }
   * });
   *
   * sub.unsubscribe();
   * ```
   */
  subscribeAll<T extends keyof ActionRecord>(
    listeners: {
      readonly [K in T]: (action: Action<K>) => void;
    },
    options?: SubscribeOptions<T>,
  ): SubscribeResult {
    DEV_MODE && this.logger__.logMethodArgs?.('subscribeAll', Object.keys(listeners));
    const keys = Object.keys(listeners) as T[];
    const unsubscribeList = new Array<VoidFunc>(keys.length);

    for (let index = 0; index < keys.length; index++) {
      const actionId = keys[index];
      const handler = listeners[actionId];
      unsubscribeList[index] = this.on(
        actionId,
        handler as (action: Action) => void,
        options as SubscribeOptions<T>,
      ).unsubscribe;
    }

    return {
      unsubscribe: () => {
        DEV_MODE && this.logger__.logMethod?.('unsubscribeAll');
        for (let index = 0; index < unsubscribeList.length; index++) {
          unsubscribeList[index]();
        }
        unsubscribeList.length = 0;
      },
    };
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
    DEV_MODE && this.logger__.logMethodArgs?.('dispatch', action);
    this.internalChannel__.dispatch(action.type, action as Action<K>);
  }

  /**
   * Creates a zero-argument function that dispatches the given action when called.
   * Useful for decoupling action dispatches and using them directly as event handlers or FSM effects.
   *
   * @template K - A key of ActionRecord.
   * @param action - The action object containing `type` and `payload` to dispatch.
   * @returns A zero-argument function that dispatches the action.
   *
   * @example
   * ```ts
   * const startLoading = actionService.createDispatcher({
   *   type: 'app_loading_start',
   *   payload: {ownerId: 'my-service'},
   * });
   *
   * // Later
   * startLoading(); // dispatches 'app_loading_start'
   * ```
   */
  createDispatcher<K extends keyof ActionRecord>(action: DispatchParam<K>): () => void {
    DEV_MODE && this.logger__.logMethodArgs?.('createDispatcher', action);
    return () => this.dispatch(action);
  }

  /**
   * Utility for defining strongly-typed actions with clean DX.
   * Validates that all defined action configurations conform to `ActionRecord` types.
   *
   * @template T - The type of the actions map.
   * @param actions - The actions map.
   * @returns The actions map.
   *
   * @example
   * ```ts
   * const actions = actionService.defineActions({
   *   startLoading: {
   *     type: 'app_loading_start',
   *     payload: {ownerId: 'my-service'}
   *   }
   * });
   * ```
   */
  defineActions<T extends Record<string, ActionConfig>>(actions: T): T {
    DEV_MODE && this.logger__.logMethodArgs?.('defineActions', actions);
    return actions;
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
    DEV_MODE && this.logger__.logMethodArgs?.('registerModifier', {name});
    if (this.modifierRegistry__.has(name)) {
      DEV_MODE && this.logger__.accident('registerModifier', 'modifier_already_registered', {name});
      return;
    }
    this.modifierRegistry__.set(name, handler);
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
    DEV_MODE && this.logger__.logMethodArgs?.('registerPayloadResolver', {name});
    if (this.payloadRegistry__.has(name)) {
      DEV_MODE && this.logger__.accident('registerPayloadResolver', 'payload_resolver_already_registered', {name});
      return;
    }
    this.payloadRegistry__.set(name, resolver);
  }

  /**
   * Registers global event delegation listeners on `document`.
   *
   * @param eventTypes - List of event types to delegate. Defaults to ActionService.DEFAULT_DELEGATED_EVENTS.
   *
   * @example
   * ```ts
   * actionService.setupDelegation();
   * ```
   */
  setupDelegation(eventTypes: readonly string[] = ActionService.DEFAULT_DELEGATED_EVENTS): void {
    DEV_MODE && this.logger__.logMethodArgs?.('setupDelegation', {eventTypes});
    if (typeof document === 'undefined') {
      DEV_MODE && this.logger__.incident?.('setupDelegation', 'document_not_found');
      return;
    }

    for (let index = 0; index < eventTypes.length; index++) {
      const eventType = eventTypes[index];
      if (this.delegatedEventTypes__.has(eventType)) continue;
      this.delegatedEventTypes__.add(eventType);
      document.addEventListener(eventType, this.handleDelegatedEvent__, {capture: true});
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
    DEV_MODE && this.logger__.logMethod?.('teardownDelegation');
    if (typeof document === 'undefined') {
      return;
    }
    for (const eventType of this.delegatedEventTypes__) {
      document.removeEventListener(eventType, this.handleDelegatedEvent__, {capture: true});
    }
    this.delegatedEventTypes__.clear();
    this.descriptorCache__.clear();
  }

  /**
   * Parses attribute values into action descriptor, utilizing the internal cache.
   * @private
   */
  private parseDescriptor__(attributeValue: string): ActionDescriptor | null {
    DEV_MODE && this.logger__.logMethodArgs?.('parseDescriptor__', {attributeValue});

    const cached = this.descriptorCache__.get(attributeValue);
    if (cached !== undefined) return cached;

    const match = attributeValue.match(syntaxRegex);
    if (!match) {
      DEV_MODE && this.logger__.accident('parseDescriptor__', 'invalid_syntax', {attributeValue});
      this.descriptorCache__.set(attributeValue, null);
      return null;
    }

    const actionId = match[1]!;
    const payload = match[2];
    const modifierString = match[3];
    const modifiers = modifierString ? new Set(modifierString.split(',').filter(Boolean)) : new Set<string>();

    const descriptor: ActionDescriptor = {modifiers, actionId, payload};
    this.descriptorCache__.set(attributeValue, descriptor);
    return descriptor;
  }

  /**
   * Global event delegation handler.
   * @private
   */
  private handleDelegatedEvent__ = (event: Event): void => {
    const eventType = event.type;
    DEV_MODE && this.logger__.logMethodArgs?.('handleDelegatedEvent__', {eventType});

    const target = event.target as Element | null;
    if (!target) return;

    const actionAttrib = `on-${eventType}`;
    const actionElement = target.closest?.(`[${actionAttrib}]`);
    if (!actionElement) return;

    const attributeValue = actionElement.getAttribute?.(actionAttrib)?.trim();
    if (!attributeValue) {
      DEV_MODE && this.logger__.accident('handleDelegatedEvent__', 'empty_attribute', {eventType, actionElement});
      return;
    }

    if (!(actionElement instanceof HTMLElement)) {
      DEV_MODE
        && this.logger__.accident('handleDelegatedEvent__', 'target_not_html_element', {eventType, actionElement});
      return;
    }

    const descriptor = this.parseDescriptor__(attributeValue);
    if (!descriptor) return;

    DEV_MODE && this.logger__.logMethodArgs?.('handleDelegatedEvent__.action', {eventType, descriptor});

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
      const handler = this.modifierRegistry__.get(modifier);
      if (!handler) {
        DEV_MODE
          && this.logger__.accident('handleDelegatedEvent__', 'unknown_modifier', {
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
        DEV_MODE
          && this.logger__.accident('handleDelegatedEvent__', 'modifier_execution_failed', {
            modifier,
            error,
          });
        return;
      }
    }

    if (descriptor.payload) {
      const resolver = this.payloadRegistry__.get(descriptor.payload);
      if (resolver) {
        try {
          (action as {payload: unknown}).payload = resolver(event, actionElement);
        } catch (error) {
          DEV_MODE
            && this.logger__.accident('handleDelegatedEvent__', 'payload_resolver_failed', {
              resolver: descriptor.payload,
              error,
            });
          return;
        }
      }
    } else {
      (action as {payload: unknown}).payload = undefined;
    }

    this.internalChannel__.dispatch(action.type, action);
  };

  /**
   * Registers default modifiers and resolvers.
   * @private
   */
  private registerDefaultModifiersAndResolvers__(): void {
    DEV_MODE && this.logger__.logMethod?.('registerDefaultModifiersAndResolvers__');

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

    this.registerModifier('stop', (event) => {
      event.stopPropagation();
      return true;
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

    this.registerPayloadResolver('$dataset', (_event, element) => {
      return {...(element as HTMLElement).dataset};
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
