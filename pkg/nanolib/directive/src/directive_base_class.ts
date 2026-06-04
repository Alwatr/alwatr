/**
 * @package @alwatr/directive
 *
 * This file defines the `Directive` abstract class — the foundation for all attribute-based
 * directives. Extend it to attach declarative behaviour to DOM elements.
 */

import {queueMicrotask, requestAnimationFrame} from '@alwatr/delay';
import {createLogger} from '@alwatr/logger';
import {finalizationRegistry, queueRender} from './lib.js';
import type {ListenerCallback, Subscribable} from './type.js';

/**
 * A map to keep track of the number of instances for each directive name. This helps in generating unique indices for directives when multiple instances are present on the same page.
 */
const directiveCount = new Map<string, number>();

/**
 * Generates a unique index for each directive instance based on the directive name. This is useful for logging and debugging purposes, especially when multiple instances of the same directive are used.
 */
function generateIndexForDirective(name: string): number {
  const currentIndex = directiveCount.get(name) ?? 0;
  directiveCount.set(name, currentIndex + 1);
  return currentIndex;
}

/**
 * The abstract base class for all directives.
 *
 * Extend this class to create a new directive that can be registered with the `@directive` decorator.
 * It provides the core functionality for linking a TypeScript class to a DOM element and managing its lifecycle.
 *
 * @example
 * ```ts
 * import {Directive, directive} from '@alwatr/directive';
 *
 * @directive('my-directive')
 * export class MyDirective extends Directive {
 *   protected init_(): void {
 *     this.element_.textContent = 'Hello from MyDirective!';
 *     this.element_.addEventListener('click', () => this.log('Element clicked!'));
 *   }
 * }
 * ```
 */
export abstract class Directive {
  /**
   * The attribute name that this directive is bound to.
   */
  public readonly attributeName: string;

  /**
   * The value of the attribute.
   */
  public readonly attributeValue: string;

  /**
   * A dedicated logger instance for this directive, pre-configured with a context like `directive:[attributeName]`.
   * Use this for logging to provide clear, contextual messages.
   */
  protected readonly logger_;

  /**
   * The DOM element to which this directive instance is attached.
   * All directive logic operates on this element.
   */
  protected readonly element_: HTMLElement;

  /**
   * A list of callback functions to be executed when the directive is destroyed.
   */
  private readonly destroyHookList__: (() => void)[] = [];

  /**
   * A unique index for this directive instance, generated based on the attribute name and the number of existing instances of that name. This helps differentiate multiple instances of the same directive on the page.
   */
  public readonly index: number;

  /**
   * Optional configuration passed directly to every `IntersectionObserver` created by this directive.
   *
   * Set this in your subclass constructor (or as a class field) **before** `init_()` runs to customise
   * how the browser determines visibility for `lazyInit_()`, `onVisible_()`, and `onHidden_()`.
   *
   * All three visibility hooks share the same options object — you cannot configure them independently.
   * If left `undefined`, the browser's default `IntersectionObserver` options are used:
   * `root: null` (viewport), `rootMargin: '0px'`, `threshold: 0`.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver MDN — IntersectionObserver constructor}
   *
   * @example — Trigger 200 px before the element enters the viewport (eager pre-load)
   * ```ts
   * @directive('lazy-image')
   * class LazyImageDirective extends Directive {
   *   // Pre-load images 200 px before they scroll into view
   *   protected override intersectionOptions_: IntersectionObserverInit = {
   *     rootMargin: '200px 0px',
   *   };
   *
   *   protected override async lazyInit_(): Promise<void> {
   *     const img = this.element_.querySelector('img')!;
   *     img.src = img.dataset['src']!;
   *     await img.decode();
   *   }
   * }
   * ```
   *
   * @example — Fire `onVisible_` only when at least 50 % of the element is visible
   * ```ts
   * @directive('track-impression')
   * class ImpressionTrackerDirective extends Directive {
   *   protected override intersectionOptions_: IntersectionObserverInit = {
   *     threshold: 0.5,
   *   };
   *
   *   protected override onVisible_(): void {
   *     analytics.trackImpression(this.attributeValue);
   *   }
   * }
   * ```
   *
   * @example — Observe within a scrollable container instead of the viewport
   * ```ts
   * @directive('sticky-header')
   * class StickyHeaderDirective extends Directive {
   *   protected override intersectionOptions_: IntersectionObserverInit = {
   *     root: document.querySelector('#scroll-container'),
   *     rootMargin: '-64px 0px 0px 0px', // account for a 64 px top bar
   *     threshold: 0,
   *   };
   *
   *   protected override onHidden_(): void {
   *     this.element_.classList.add('is-sticky');
   *   }
   *
   *   protected override onVisible_(): void {
   *     this.element_.classList.remove('is-sticky');
   *   }
   * }
   * ```
   */
  protected intersectionOptions_?: IntersectionObserverInit;

  private initializing__: true | undefined = true;

  constructor(element: HTMLElement, attributeName: string) {
    this.index = generateIndexForDirective(attributeName);
    const identifier = `directive:${attributeName}/${this.index}`;
    this.logger_ = createLogger(identifier);
    this.logger_.logMethodArgs?.('new', {attributeName, element});

    this.attributeName = attributeName;
    this.element_ = element;

    // Parse the initial value from the attribute
    this.attributeValue = this.element_.getAttribute(this.attributeName) ?? '';

    // Structural Edge-Case Guard: Ensure element hooks are compiled after the current microtask thread ends
    queueMicrotask(() => this.initializeLifecycle_());
  }

  /**
   * Initializes the directive's lifecycle by calling the `init_` method and setting up any necessary observers for lazy initialization and visibility tracking. This method is called after the directive instance is created and the initial attribute value is parsed.
   */
  private initializeLifecycle_(): void {
    this.logger_.logMethod?.('initializeLifecycle_');

    if (this.isDestroyed()) return;

    // Register this instance with the FinalizationRegistry for cleanup when garbage collected
    finalizationRegistry?.register(this, `${this.logger_.name}/instance`);
    finalizationRegistry?.register(this.element_, `${this.logger_.name}/element`);

    try {
      this.init_?.();
    } catch (err) {
      this.logger_.error('init_', 'error_in_init', err);
    }
    this.triggerLazyInit__();
    this.triggerVisibilityObserver__();

    delete this.initializing__;
  }

  /**
   * The initialization method that must be implemented by subclasses. This is where you should put the logic to set up the directive, such as adding event listeners or manipulating the DOM element. It is called after the directive instance is created and the initial attribute value is parsed.
   * This method can be asynchronous if needed, allowing for any setup that requires waiting (e.g., fetching data).
   */
  protected init_?(): void;

  /**
   * Optional lifecycle hook — runs **exactly once** the first time the element enters the viewport.
   * Falls back to `requestIdleCallback` or `setTimeout(100ms)` if `IntersectionObserver` is unavailable.
   *
   * Use for: lazy loading images, fetching data, heavy DOM setup.
   */
  protected lazyInit_?(): void;

  /**
   * Optional lifecycle hook — runs **every time** the element enters the viewport.
   * Falls back to a single immediate execution if `IntersectionObserver` is unavailable.
   *
   * Use for: impression tracking, restarting animations, refreshing dynamic data.
   */
  protected onVisible_?(): void;

  /**
   * Optional lifecycle hook — runs **every time** the element leaves the viewport.
   * No fallback — if `IntersectionObserver` is unavailable, this hook is never called.
   *
   * Use for: pausing animations, stopping video playback, cancelling in-progress work.
   */
  protected onHidden_?(): void;

  /**
   * Handles one-shot lazy execution with environment-aware fallbacks.
   * Uses IntersectionObserver when available, falls back to requestIdleCallback or setTimeout(100ms).
   */
  private triggerLazyInit__(): void {
    if (!this.lazyInit_) return;
    this.logger_.logMethod?.('triggerLazyInit__');

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          try {
            if (this.lazyInit_ && !this.isDestroyed()) {
              this.lazyInit_();
            }
          } catch (err) {
            this.logger_.error('triggerLazyInit_', 'error_in_lazy_init', err);
          }
        }
      }, this.intersectionOptions_);
      observer.observe(this.element_);
      this.addDestroyHook(() => observer.disconnect());
    } else {
      requestAnimationFrame(() => {
        try {
          if (this.lazyInit_ && !this.isDestroyed()) {
            this.lazyInit_();
          }
        } catch (err) {
          this.logger_.error('triggerLazyInit_', 'error_in_lazy_init', err);
        }
      });
    }
  }

  private triggerVisibilityObserver__(): void {
    if (!this.onVisible_ && !this.onHidden_) return;
    this.logger_.logMethod?.('triggerVisibilityObserver__');

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        if (this.isDestroyed()) return;
        const entry = entries[0];
        if (entry.isIntersecting) {
          try {
            if (this.onVisible_ && !this.isDestroyed()) {
              this.onVisible_();
            }
          } catch (err) {
            this.logger_.error('triggerVisibilityObserver_', 'error_in_on_visible', err);
          }
        } else {
          try {
            if (this.onHidden_ && !this.isDestroyed()) {
              this.onHidden_();
            }
          } catch (err) {
            this.logger_.error('triggerVisibilityObserver_', 'error_in_on_hidden', err);
          }
        }
      }, this.intersectionOptions_);
      observer.observe(this.element_);
      this.addDestroyHook(() => observer.disconnect());
    } else {
      requestAnimationFrame(() => {
        try {
          if (this.onVisible_ && !this.isDestroyed()) {
            this.onVisible_();
          }
        } catch (err) {
          this.logger_.error('triggerVisibilityObserver_', 'error_in_on_visible', err);
        }
      });
    }
  }

  /**
   * Dispatches a custom event from the target element.
   *
   * This is a convenience method for firing events that can be listened to by other parts of the application.
   * The event bubbles up through the DOM.
   *
   * @param eventName The name of the custom event.
   * @param detail Optional data to include in the event's `detail` property.
   *
   * @example
   * ```ts
   * this.dispatch('user-action', {action: 'save', id: 123});
   * ```
   */
  public dispatch(eventName: string, detail?: unknown): void {
    this.logger_.logMethodArgs?.('dispatch', {eventName, detail});
    this.element_.dispatchEvent(new CustomEvent(eventName, {detail, bubbles: true}));
  }

  /**
   * Registers a task to be executed when the directive is destroyed.
   * Follows the `on[Event]` pattern, similar to `onClick`.
   * Useful for cleaning up resources, such as unsubscribing from signals or removing global event listeners.
   *
   * @param task The cleanup task to register.
   *
   * @example
   * ```ts
   * this.onDestroy(
   *   signal.subscribe(() => this.log('signal changed')).unsubscribe
   * );
   * ```
   */
  public addDestroyHook(task: (this: this) => void): void {
    this.logger_.logMethod?.('addDestroyHook');
    this.destroyHookList__.push(task);
  }

  /**
   * Cleans up the directive's resources.
   *
   * This method removes the element from the DOM and nullifies the internal reference to it,
   * helping with garbage collection. It can be extended by subclasses to perform additional cleanup,
   * such as removing event listeners.
   */
  public destroy(): void {
    this.logger_.logMethod?.('destroy');
    if (this.isDestroyed()) return;

    // Execute all registered cleanup tasks
    if (this.destroyHookList__.length > 0) {
      for (let i = 0; i < this.destroyHookList__.length; i++) {
        try {
          this.destroyHookList__[i].call(this);
        } catch (err) {
          this.logger_.error('destroy', 'error_in_destroy_callback', err);
        }
      }
      this.destroyHookList__.length = 0; // clear the list after executing all tasks
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).element_ = null;
  }

  /**
   * Checks if the directive has been destroyed.
   */
  public isDestroyed(): boolean {
    return this.element_ === null;
  }

  /**
   * Automatically destroys the directive if its associated element is no longer connected to the DOM.
   *
   * This method can be called periodically (e.g., in a `MutationObserver` or a cleanup loop) to ensure that
   * directives are properly cleaned up when their elements are removed from the DOM.
   *
   * **Note:** This method does not automatically run; you must call it as needed to check for disconnected elements.
   */
  public autoDestroy(): boolean {
    this.logger_.logMethod?.('autoDestroy');
    if (this.element_?.isConnected === false) {
      void this.destroy();
      return true;
    }
    return false;
  }

  /**
   * Registers an event listener on a specified element (or the directive's root element by default) and ensures that it is automatically removed when the directive is destroyed.
   */
  protected on_<K extends keyof HTMLElementEventMap>(
    eventType: K,
    listener: (this: this, event: HTMLElementEventMap[K]) => void,
    element?: HTMLElement | string | null,
    options?: AddEventListenerOptions | boolean,
  ): void;
  /**
   * Registers an event listener on a specified element (or the directive's root element by default) and ensures that it is automatically removed when the directive is destroyed.
   */
  protected on_(
    eventType: string,
    listener: (this: this, event: Event) => void,
    element?: HTMLElement | string | null,
    options?: AddEventListenerOptions | boolean,
  ): void;

  protected on_(
    eventType: string,
    listener: (this: this, event: Event) => void,
    element: HTMLElement | string | null = this.element_,
    options?: AddEventListenerOptions | boolean,
  ): void {
    if (typeof element === 'string') {
      element = this.element_.querySelector<HTMLElement>(element);
    }
    if (element == null) {
      this.logger_.accident('on', 'target_not_found', {target: element});
      return;
    }

    const boundListener = listener.bind(this);
    element.addEventListener(eventType, boundListener as EventListener, options);
    this.addDestroyHook(() => element.removeEventListener(eventType, boundListener as EventListener, options));
  }

  /**
   * Schedules a batched re-render for the next macrotask.
   *
   * Calling this method multiple times within the same macrotask cycle is safe — only one
   * `update_()` + `updated_()` pair will be executed. Subsequent calls while an update is
   * already pending are silently ignored.
   *
   * **You rarely need to call this directly.** The two idiomatic triggers are:
   * - A `@state`-decorated accessor — calls `requestUpdate()` automatically on every `set`.
   * - A `StateSignal` subscription — call `requestUpdate()` inside the callback.
   *
   * @example — Triggered automatically by `@state` (most common)
   * ```ts
   * // Setting a @state accessor schedules the update — no manual call needed.
   * this.count_ = newValue;
   * ```
   *
   * @example — Triggered manually from a `StateSignal` subscription
   * ```ts
   * protected override init_(): void {
   *   const sub = cartSignal.subscribe(() => this.requestUpdate());
   *   this.addDestroyHook(() => sub.unsubscribe());
   * }
   * ```
   *
   * @example — Triggered manually after mutating non-`@state` internal state
   * ```ts
   * protected override init_(): void {
   *   this.on_('click', () => {
   *     this.count_++;
   *     this.requestUpdate();
   *   });
   * }
   * ```
   */
  public requestUpdate(): void {
    this.logger_.logMethod?.('requestUpdate');
    queueRender(this);
  }

  /**
   * Performs the update cycle by calling `update_()` and then `updated_()`.
   * This method is responsible for executing the update logic in a batched manner, ensuring that multiple calls to `requestUpdate()` within the same macrotask result in only one execution of `update_()` and `updated_()`.
   */
  public performUpdate_(): void {
    this.logger_.logMethod?.('performUpdate_');
    if (this.isDestroyed()) return;
    if (this.initializing__) {
      // reschedule for after initialization completes
      queueRender(this);
      return;
    }

    if (this.shouldUpdate_?.() === false) {
      this.logger_.incident?.('performUpdate_', 'update_aborted_by_should_update');
      return;
    }

    try {
      this.update_?.();
    } catch (err) {
      this.logger_.error('performUpdate_', 'error_in_update', err);
    }

    try {
      this.updated_?.();
    } catch (err) {
      this.logger_.error('performUpdate_', 'error_in_updated', err);
    }
  }

  /**
   * Guards the update cycle — called by `performUpdate__()` just before `update_()` runs.
   *
   * Override this method to implement conditional rendering logic. The return value controls
   * whether the current update cycle proceeds:
   *
   * - Return `false` (strict boolean) → cycle is **aborted**: `update_()` and `updated_()` are
   *   **not** called. The `disableUpdate_` flag is also cleared, so a future `requestUpdate()`
   *   will schedule a new cycle normally.
   * - Return `true`, `undefined`, or `void` → cycle **proceeds** as normal.
   *
   * The base implementation returns `void` (i.e., always proceeds).
   *
   * **Placement in the update cycle:**
   * ```
   * requestUpdate()
   *   └─ (next macrotask)
   *        ├─ shouldUpdate_()   ← return false to abort here
   *        ├─ update_()         ← DOM mutations / lit-html render()
   *        └─ updated_()        ← post-render hook
   * ```
   *
   * @returns `false` to abort the cycle, or `true` / `void` to allow it.
   *
   * @example — Skip render while a loading flag is set
   * ```ts
   * @directive('data-table')
   * class DataTableDirective extends LitDirective {
   *   private loading_ = true;
   *
   *   protected override shouldUpdate_(): boolean | void {
   *     // Do not render until data has been fetched
   *     if (this.loading_) return false;
   *   }
   *
   *   protected override async lazyInit_(): Promise<void> {
   *     this.rows_ = await fetchRows();
   *     this.loading_ = false;
   *     this.requestUpdate();
   *   }
   *
   *   protected override render_() {
   *     return html`${this.rows_.map((r) => html`<tr><td>${r.name}</td></tr>`)}`;
   *   }
   * }
   * ```
   *
   * @example — Abort update when the element is hidden (e.g. inside an inactive tab)
   * ```ts
   * protected override shouldUpdate_(): boolean | void {
   *   if (this.element_.closest('[hidden]')) return false;
   * }
   * ```
   */
  protected shouldUpdate_?(): boolean;

  /**
   * Called during each scheduled update cycle, immediately before `updated_()`.
   *
   * Override this method to perform DOM mutations or re-renders in response to state changes.
   * The base implementation is a no-op — subclasses such as `LitDirective` override it to call
   * `lit-html`'s `render()`.
   *
   * This method is always called synchronously within the macrotask scheduled by `requestUpdate()`.
   * Do **not** call `requestUpdate()` from inside `update_()` — it will be ignored because the
   * pending flag is still set at that point.
   */
  protected update_?(): void;

  /**
   * Called immediately after `update_()` completes in each update cycle.
   *
   * Override this method to run post-render logic — e.g. measuring DOM dimensions, focusing an
   * element, or dispatching a `CustomEvent` to notify the outside world that the view has changed.
   *
   * The base implementation is a no-op.
   *
   * @example
   * ```ts
   * protected override updated_(): void {
   *   // Scroll the newly rendered content into view after each update
   *   this.element_.querySelector('.active-item')?.scrollIntoView({behavior: 'smooth'});
   * }
   * ```
   */
  protected updated_?(): void;

  /**
   * Subscribes to a signal and automatically unsubscribes when the directive is destroyed.
   *
   * This is the idiomatic way to react to shared application state inside a directive. It eliminates
   * the boilerplate of manually calling `addDestroyHook(() => sub.unsubscribe())` after every
   * `signal.subscribe(...)` call.
   *
   * @param signal - The read-only signal to subscribe to.
   * @param callback - The listener invoked on every signal emission.
   * @param options - Optional subscription options forwarded to `signal.subscribe()`.
   *
   * @example
   * ```ts
   * @state()
   * private count_ = 0;
   *
   * protected override init_(): void {
   *   this.subscribe_(cartSignal, (cart) => {
   *     this.count_ = cart.items.length;
   *   });
   * }
   * ```
   */
  protected subscribe_<T, O>(signal: Subscribable<T, O>, callback: ListenerCallback<T>, options?: O): void {
    this.addDestroyHook(signal.subscribe(callback, options).unsubscribe);
  }
}
