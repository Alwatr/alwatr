/**
 * @alwatr/loom — JSX dev runtime.
 *
 * The compiler imports from here in development (`"jsx": "react-jsxdev"`).
 * `jsxDEV` receives extra debug arguments which we simply ignore.
 */
export { jsx, jsx as jsxDEV, jsxs, Fragment } from "./jsx-runtime.js";
export type { JSX } from "./jsx-runtime.js";
