/**
 * Presentation-ready primitive values that can be consumed directly by DOM attributes,
 * text nodes, or form input elements.
 *
 * Types:
 * - `string`: Rendered as plain text or attribute values.
 * - `number`: Coerced to string for display or value mapping.
 * - `boolean`: Used as attribute presence flags (e.g., `disabled`, `checked`, `hidden`).
 * - `null` / `undefined`: Causes the attribute to be removed or textContent to be emptied.
 */
export type BindingValue = string | number | boolean | null | undefined;

/**
 * Subscription callback function invoked whenever a view model's state changes.
 *
 * @param value The new state record of the view model, matching the property map.
 */
export type BindingHandler = (value: unknown) => void;
