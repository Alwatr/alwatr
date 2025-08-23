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
  protected readonly logger;

  /**
   * The target DOM element this directive is attached to.
   */
  protected readonly element_: HTMLElement;

  /**
   * Whether the element is connected to the DOM.
   */
  protected isConnected_ = false;

  /**
   * Constructor to initialize the directive with the target element.
   * @param element - The DOM element this directive is attached to.
   * @param selector - The CSS selector for the directive.
   */
  constructor(element: HTMLElement, selector: string) {
    this.selector_ = selector;
    this.logger = createLogger(`directive:${this.selector_}`);
    this.logger.logMethodArgs?.('new', {selector, element});
    this.element_ = element;
  }

  /**
   * Called when the element is connected to the DOM tree.
   * You can override this method to perform setup tasks, such as adding event listeners.
   */
  protected connected_(): void {
    this.logger.logMethod?.('connected_');
    this.isConnected_ = true;
    this.update_();
  }

  /**
   * Called when the element disconnects from the DOM.
   *
   * You can override this method to perform cleanup tasks, such as removing event listeners
   * that were added in {@link connected_}.
   */
  protected disconnected_(): void {
    this.logger.logMethod?.('disconnected_');
    this.isConnected_ = false;
  }

  /**
   * Called to update the directive's state or behavior.
   * Must be implemented by subclasses.
   */
  protected abstract update_(): void;

  /**
   * Dispatches a custom event from the target element.
   * @param eventName - The name of the event.
   * @param detail - Optional data to include in the event.
   */
  protected dispatch_(eventName: string, detail?: unknown): void {
    this.logger.logMethodArgs?.('dispatch_', {eventName, detail});
    this.element_.dispatchEvent(new CustomEvent(eventName, {detail, bubbles: true}));
  }
}
