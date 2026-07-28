/**
 * @alwatr/loom — JSX dev runtime.
 *
 * The compiler imports from here in development (`"jsx": "react-jsxdev"`).
 * `jsxDEV` receives extra debug arguments which we simply ignore.
 */

import {jsx} from './jsx-runtime.js';
export * from './jsx-runtime.js';
export const jsxDEV = jsx;
export type * from './jsx-runtime.js';
