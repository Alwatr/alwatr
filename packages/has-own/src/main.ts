/**
 * Determines whether an object has a property with the specified name.
 * @param {object} obj An object.
 * @param {PropertyKey} prop A property name.
 * @returns {boolean} True if the property exists, otherwise false.
 */
export const hasOwn = Object.hasOwn ?? /* @__PURE__ */ Object.call.bind(Object.prototype.hasOwnProperty);
