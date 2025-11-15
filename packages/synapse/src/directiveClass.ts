/**
 * @package @alwatr/synapse
 *
 * This file defines the `DirectiveBase` class, which is the foundation for creating custom directives
 * in the Alwatr Synapse library. Directives are used to attach behavior and logic to DOM elements
 * declaratively.
 */

import {delay} from '@alwatr/delay';
import {createLogger} from '@alwatr/logger';

/**
 * The abstract base class for all directives.
 *
 * Extend this class to create a new directive that can be registered with the `@directive` decorator.
 * It provides the core functionality for linking a TypeScript class to a DOM element and managing its lifecycle.
 *
 * @example
 * ```ts
 * import {DirectiveBase, directive} from '@alwatr/synapse';
 *
 * @directive('[my-directive]')
 * export class MyDirective extends DirectiveBase {
 *   protected override init_(): void {
 *     super.init_(); // فراخوانی متد والد برای حفظ سازگاری با نسخه‌های قبل ضروری است
 *     this.element_.textContent = 'Hello from MyDirective!';
 *     this.element_.addEventListener('click', () => this.log('Element clicked!'));
 *   }
 * }
 * ```
 */
export abstract class DirectiveBase {
  /**
   * The CSS selector that this directive is associated with.
   * This is the selector string provided to the `@directive` decorator.
   */
  protected readonly selector_;

  /**
   * A dedicated logger instance for this directive, pre-configured with a context like `directive:[selector]`.
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
  private readonly cleanupTaskList_: NoopFunction[] = [];

  /**
   * Initializes the directive. This constructor is called by the Synapse bootstrap process and should not be
   * overridden in subclasses.
   *
   * It sets up the logger, element, and selector, and then schedules the `init_` and `update_` lifecycle methods
   * to run in the next microtask.
   *
   * @param element The DOM element to which this directive is attached.
   * @param selector The CSS selector that matched this directive.
   */
  constructor(element: HTMLElement, selector: string) {
    this.logger_ = createLogger(`directive:${selector}`);
    this.logger_.logMethodArgs?.('new', {selector, element});

    this.selector_ = selector;
    this.element_ = element;

    (async () => {
      await delay.nextMicrotask();
      await this.init_();
    })();
  }

  /**
   * Called once automatically after the directive is initialized.
   *
   * This method serves as the main entry point for your directive's logic,
   * such as modifying the element or setting up event listeners.
   *
   * **Note:** Do not call this method directly. It is designed to be called only once by the framework.
   */
  protected init_(): Awaitable<void> {
    this.logger_.logMethod?.('init_');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).update_?.(); // backward compatibility
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
   * this.dispatch_('user-action', {action: 'save', id: 123});
   * ```
   */
  protected dispatch_(eventName: string, detail?: unknown): void {
    this.logger_.logMethodArgs?.('dispatch_', {eventName, detail});
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
  protected onDestroy(task: Func): void {
    this.logger_.logMethod?.('onDestroy');
    this.cleanupTaskList_.push(task);
  }

  /**
   * Cleans up the directive's resources.
   *
   * This method removes the element from the DOM and nullifies the internal reference to it,
   * helping with garbage collection. It can be extended by subclasses to perform additional cleanup,
   * such as removing event listeners.
   */
  protected destroy_(): Awaitable<void> {
    this.logger_.logMethod?.('destroy_');

    // Execute all registered cleanup tasks
    if (this.cleanupTaskList_.length > 0) {
      for (const onDestroy of this.cleanupTaskList_) {
        try {
          onDestroy();
        }
        catch (err) {
          this.logger_.error('destroy_', 'error_in_destroy_callback', err);
        }
      }

      this.cleanupTaskList_.length = 0; // clear the list after executing all tasks
    }

    this.element_.remove();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).element_ = null;
  }
}
