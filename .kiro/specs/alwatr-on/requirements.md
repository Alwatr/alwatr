# Requirements: `@alwatr/on`

## Functional Requirements

### 1. Attribute Syntax Parsing

- **1.1** The directive MUST parse `alwatr-on` attribute values matching the pattern `event->actionId` or `event->actionId:payload`.
- **1.2** If the attribute value does not match the regex `/^([a-z]+)->([a-z0-9-]+)(?::(.+))?$/`, the directive MUST log an accident and perform no further action.

### 2. DOM Event Listening

- **2.1** For any valid `eventType` other than `init`, the directive MUST call `element_.addEventListener(eventType, dispatch_)` during `init_()`.
- **2.2** The directive MUST register a destroy hook that calls `element_.removeEventListener(eventType, dispatch_)` to prevent memory leaks.

### 3. One-Shot `init` Event

- **3.1** When `eventType === 'init'`, the directive MUST dispatch the action immediately without registering a DOM listener.
- **3.2** After dispatching, the directive MUST call `destroy()` so it is cleaned up immediately.

### 4. Action Payload Resolution

- **4.1** If no payload segment is present in the attribute, `actionPayload` MUST be `''`.
- **4.2** If the payload segment is the literal string `$value` and the element has a `.value` property, `actionPayload` MUST be `element_.value` at dispatch time.
- **4.3** If the payload segment is any other string, `actionPayload` MUST be that literal string.

### 5. Signal Dispatch

- **5.1** On every valid DOM event, the directive MUST call `eventSignal_.dispatch({actionId, actionPayload})`.
- **5.2** `event.preventDefault()` MUST be called when a DOM `Event` object is passed to `dispatch_()`.

### 6. `alwatrOn` Subscription Helper

- **6.1** `alwatrOn(actionId, handler)` MUST subscribe to `eventSignal_` and invoke `handler(payload.actionPayload)` only when `payload.actionId === actionId`.
- **6.2** `alwatrOn` MUST return a `SubscribeResult` object with an `unsubscribe()` method.
- **6.3** After `unsubscribe()` is called, `handler` MUST NOT be invoked for subsequent dispatches.

## Non-Functional Requirements

- **7.1** The package MUST be published as an ESM module (`"type": "module"`).
- **7.2** The package MUST follow the same `package.json`, `tsconfig.json`, and build script conventions as other packages in `pkg/nanolib/`.
- **7.3** The package name MUST be `@alwatr/on`.
- **7.4** The shared `eventSignal_` instance MUST be module-level (singleton per module load).
