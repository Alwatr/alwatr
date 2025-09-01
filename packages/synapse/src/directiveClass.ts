import {delay} from '@alwatr/delay';
import {createLogger} from '@alwatr/logger';

/**
 * Base class for creating directives that attach behavior to DOM elements.
 * Extend this class to define custom directives.
 */
export abstract class DirectiveBase {
  /**
   * The CSS selector for the directive.
   */
  protected readonly selector_;

  /**
   * Logger instance for the directive.
   */
  protected readonly logger_;

  /**
   * The target DOM element this directive is attached to.
   */
  protected readonly element_: HTMLElement;

  /**
   * Constructor to initialize the directive with the target element.
   * @param element - The DOM element this directive is attached to.
   * @param selector - The CSS selector for the directive.
   */
  constructor(element: HTMLElement, selector: string) {
    this.logger_ = createLogger(`directive:${selector}`);
    this.logger_.logMethodArgs?.('new', {selector, element});

    this.selector_ = selector;
    this.element_ = element;

    (async () => {
      await delay.immediate();
      await this.init_();
      await this.update_();
    })();
  }

  /**
   * Called to update the directive's state or behavior.
   * Must be implemented by subclasses.
   */
  protected abstract update_(): MaybePromise<void>;

  protected init_(): MaybePromise<void> {
    this.logger_.logMethod?.('init');
  }

  protected destroy_(): MaybePromise<void> {
    this.logger_.logMethod?.('destroy');
    this.element_.remove();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).element_ = null;
  }

  /**
   * Dispatches a custom event from the target element.
   * @param eventName - The name of the event.
   * @param detail - Optional data to include in the event.
   */
  protected dispatch_(eventName: string, detail?: unknown): void {
    this.logger_.logMethodArgs?.('dispatch_', {eventName, detail});
    this.element_.dispatchEvent(new CustomEvent(eventName, {detail, bubbles: true}));
  }
}
