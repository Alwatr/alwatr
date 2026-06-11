import {createLogger} from '@alwatr/logger';

/**
 * Framework-agnostic utility class to safely extract, parse, and validate
 * embedded JSON data from `<script type="application/json">` DOM nodes.
 *
 * Designed for SSR-friendly state hydration: the server renders initial state
 * into a script tag, and the client reads it on boot without an extra HTTP round-trip.
 *
 * Follows the Single Responsibility Principle: only handles DOM extraction and JSON parsing.
 * Validation logic is externalized via the optional `validator_` parameter.
 *
 * @template T The expected shape of the parsed data.
 *
 * @example
 * ```typescript
 * import {EmbeddedDataCollector} from '@alwatr/embedded-data';
 *
 * // Simple usage without validation
 * const collector = new EmbeddedDataCollector<{userId: number}>('user-data');
 * const data = collector.collect();
 * console.log(data?.userId);
 *
 * // With type-guard validation
 * function isUserData(data: unknown): data is {userId: number} {
 *   return typeof data === 'object' && data !== null && 'userId' in data;
 * }
 * const collector = new EmbeddedDataCollector('user-data', isUserData);
 * const data = collector.collect(); // guaranteed to match type or be null
 * ```
 */
export class EmbeddedDataCollector<T> {
  /**
   * Checks whether a `<script type="application/json">` tag with the given attribute
   * exists in the DOM — without logging any errors or warnings.
   *
   * Useful for conditional hydration: check if embedded data is available before
   * creating a collector instance, avoiding unnecessary error logs when the script
   * tag is intentionally absent.
   *
   * @param attributeName The HTML attribute used to query the script tag (e.g., 'data-config').
   * @returns `true` if a matching script element exists, `false` otherwise (including SSR contexts).
   *
   * @example
   * ```typescript
   * if (EmbeddedDataCollector.exists('data-config')) {
   *   const collector = new EmbeddedDataCollector<AppConfig>('data-config');
   *   const config = collector.collect();
   * }
   * ```
   */
  static exists(attributeName: string): boolean {
    if (typeof document === 'undefined') return false;
    return document.querySelector(`script[${attributeName}]`) !== null;
  }

  protected readonly logger_ = createLogger('embedded-data-collector');

  /**
   * @param attributeName_ The HTML attribute used to query the script tag (e.g., 'app-config').
   * @param validator_ Optional type-guard function to ensure runtime type safety.
   */
  constructor(
    protected readonly attributeName_: string,
    protected readonly validator_?: (data: unknown) => data is T,
  ) {
    DEV_MODE && this.logger_.logMethodArgs?.('constructor', {attributeName: attributeName_});
  }

  /**
   * Safely retrieves the script element, guarding against SSR environments.
   *
   * Returns `null` if `document` is undefined (Node.js/Bun server context)
   * or if no matching element is found.
   */
  protected getElement_(): HTMLScriptElement | null {
    // SSR check: document might be undefined in Node.js/Bun server.
    if (typeof document === 'undefined') return null;
    return document.querySelector<HTMLScriptElement>(`script[${this.attributeName_}]`);
  }

  /**
   * Safely extracts raw JSON string from the script tag and clears the DOM node's content.
   *
   * Proactive memory management: after extraction, the script tag's `textContent` is
   * set to an empty string so the (potentially large) JSON payload can be GC'd.
   *
   * @returns The raw JSON string, or `null` if the element is missing or empty.
   */
  protected extractRawData_(): string | null {
    DEV_MODE && this.logger_.logMethod?.('extractRawData_');

    const element = this.getElement_();
    if (!element) {
      DEV_MODE && this.logger_.incident?.('extractRawData_', 'element_not_found', {attributeName: this.attributeName_});
      return null;
    }

    const rawData = element.textContent;
    if (!rawData) {
      DEV_MODE && this.logger_.accident('extractRawData_', 'element_empty', {attributeName: this.attributeName_});
      return null;
    }

    // Proactive memory management: clear the DOM node's text content.
    element.textContent = '';

    return rawData;
  }

  /**
   * Extracts, parses, and optionally validates the embedded JSON payload.
   *
   * Steps:
   * 1. Extract raw JSON string from the DOM.
   * 2. Parse the JSON.
   * 3. If a validator is provided, run it as a type-guard.
   * 4. Return the validated data or `null` on any failure.
   *
   * @returns The parsed and validated object, or `null` on failure.
   *
   * @example
   * ```typescript
   * const collector = new EmbeddedDataCollector<{count: number}>('counter-state');
   * const state = collector.collect();
   * if (state) {
   *   console.log('Counter:', state.count);
   * }
   * ```
   */
  collect(): T | null {
    DEV_MODE && this.logger_.logMethodArgs?.('collect', {attributeName: this.attributeName_});

    const rawData = this.extractRawData_();
    if (!rawData) return null;

    let parsedData: unknown;
    try {
      parsedData = JSON.parse(rawData);
    } catch (error) {
      this.logger_.error('collect', 'json_parse_failed', {attributeName: this.attributeName_, error});
      return null;
    }

    // Open/Closed Principle
    if (this.validator_ && !this.validator_(parsedData)) {
      DEV_MODE
        && this.logger_.accident('collect', 'data_validation_failed', {
          attributeName: this.attributeName_,
          data: parsedData,
        });
      return null;
    }

    return parsedData as T;
  }
}
