/** Presentation-ready primitives — anything a DOM attribute/text node can consume. */
export type BindingValue = string | number | boolean | null | undefined;

/** Handler invoked with the current value on subscribe, then on every change. */
export type BindingHandler = (value: unknown) => void;
