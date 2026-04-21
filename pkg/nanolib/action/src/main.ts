/**
 * @alwatr/action — Declarative DOM action-dispatch for Unidirectional Data Flow.
 *
 * Public API surface:
 * - `onAction` / `dispatchAction` — subscribe to and dispatch named actions
 * - `registerActionDirective` — opt-in to `on-action` HTML attribute support
 * - `registerPageIdDirective` — opt-in to `page-id` HTML attribute support
 * - `registerModifier` / `registerPayloadResolver` — extend the directive syntax
 * - `ActionDirective` / `PageIdDirective` — directive classes (advanced use)
 * - `ActionSignalPayload` — payload type carried by the internal signal
 */
export * from './method.js';
export * from './directive.js';
export * from './page-id.js';
export type {ActionSignalPayload} from './lib.js';
