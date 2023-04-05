import {logger, redirect} from './core.js';

let _enabled = false;

/**
 * A navigation trigger for Alwatr Router that translated clicks on `<a>` links into navigation signal.
 *
 * Only regular clicks on in-app links are translated.
 * Only primary mouse button, no modifier keys, the target href is within the app's URL space.
 */
export const clickTrigger = {
  /**
   * Alwatr router global click handler.
   */
  _clickHandler(event: MouseEvent): void {
    logger.logMethod?.('_clickHandler');

    if (
      // ignore if the default action is prevented.
      event.defaultPrevented ||
      // ignore if the left mouse button is not pressed.
      event.button !== 0 ||
      // ignore if the meta key is pressed.
      event.metaKey ||
      // ignore if the ctrl key is pressed.
      event.ctrlKey ||
      // ignore if the shift key is pressed.
      event.shiftKey ||
      // ignore if the alt key is pressed.
      event.altKey
    ) {
      return;
    }

    // prettier-ignore
    // find the <a> element that the click is at (or within)
    const anchor = event
        .composedPath()
        .find(
            (target) => (target as HTMLElement)?.tagName?.toLowerCase() === 'a',
        ) as HTMLAnchorElement | undefined;

    if (
      // ignore if the anchor is not found.
      anchor == null ||
      // ignore if the anchor is not an <a> element.
      anchor.tagName?.toLowerCase() !== 'a' ||
      // ignore if the <a> element has a non-default target.
      (typeof anchor.target === 'string' && anchor.target !== '' && anchor.target.toLowerCase() !== '_self') ||
      // ignore if the <a> element has a download attribute.
      anchor.hasAttribute('download') ||
      // ignore if the <a> element has a rel attribute.
      anchor.getAttribute('rel') === 'external' ||
      // ignore if the <a> element has a `router-ignore` attribute.
      anchor.hasAttribute('router-ignore') ||
      // ignore the anchor protocols other than HTTP and HTTPS (mailto, ftp, ...).
      (anchor.protocol !== 'http:' && anchor.protocol !== 'https:') ||
      // ignore if the anchor points to another origin (include the port number).
      anchor.href.indexOf(window.location.origin) !== 0
    ) {
      return;
    }

    event.preventDefault();

    // ignore if the target URL is the current page(after prevent default).
    if (anchor.href === window.location.href) {
      return;
    }

    // if none of the above, convert the click into a navigation signal.
    redirect(anchor.href, true);

    // for a click event, the scroll is reset to the top position.
    if (event.type === 'click') {
      window.scrollTo(0, 0);
    }
  },

  set enable(enable: boolean) {
    logger.logProperty?.('clickTrigger.enable', enable);

    if (enable && !_enabled) {
      window.document.addEventListener('click', clickTrigger._clickHandler);
    }
    if (!enable && _enabled) {
      window.document.removeEventListener('click', clickTrigger._clickHandler);
    }
    _enabled = enable;
  },

  get enable(): boolean {
    return _enabled;
  },
};
