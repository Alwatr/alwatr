/**
 * Determines whether an object has a property with the specified name.
 * @param obj An object.
 * @param prop A property name.
 */
export const hasOwn = Object.hasOwn ?? /* @__PURE__ */ Object.call.bind(Object.prototype.hasOwnProperty);
