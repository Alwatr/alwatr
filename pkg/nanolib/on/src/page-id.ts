import {DirectiveBase, lazyDirective} from '@alwatr/directive';
import {alwatrDispatch} from './method';

/**
 * A directive that dispatches a 'page-ready' signal with the specified page ID when initialized.
 * Activated by the `page-id` HTML attribute. The attribute value is treated as the page ID.
 */
export class PageIdDirective extends DirectiveBase {
  protected override init_(): void {
    const pageId = this.attributeValue.trim();
    this.logger_.logMethodArgs?.('init_', {pageId});

    if (!pageId) {
      this.logger_.accident('init_', 'empty_page_id');
      return;
    }

    alwatrDispatch('page-ready', pageId);
    this.destroy();
  }
}

/**
 * Registers the `page-id` directive, which dispatches a 'page-ready' signal with the specified page ID when initialized.
 * Activated by the `page-id` HTML attribute. The attribute value is treated as the page ID.
 *
 * @example
 *
 * ```html
 * <!-- Dispatches 'page-ready' with payload 'home' when this element is initialized -->
 * <body page-id="home"></body>
 * ```
 *
 * ```ts
 * import {registerPageIdDirective} from '@alwatr/on';
 * registerPageIdDirective();
 * // Listen for the 'page-ready' signal
 * import {alwatrOn} from '@alwatr/on';
 * alwatrOn('page-ready', (pageId) => {
 *   console.log('Page is ready:', pageId);
 * });
 * ```
 */
export const registerPageIdDirective = lazyDirective('page-id', PageIdDirective);
