# Requirements Document

## Introduction

این فیچر سه lifecycle hook اختیاری به کلاس `DirectiveBase` در پکیج `@alwatr/directive` اضافه می‌کند:

- **`lazyInit_()`**: دقیقاً یک بار، اولین باری که element وارد viewport شود اجرا می‌شود.
- **`onVisible_()`**: هر بار که element وارد viewport شود اجرا می‌شود.
- **`onHidden_()`**: هر بار که element از viewport خارج شود اجرا می‌شود.

همچنین `init_()` به optional تبدیل شده تا directive هایی که فقط از `@on` decorator یا visibility hook استفاده می‌کنند نیازی به تعریف آن نداشته باشند.

هر سه hook با `IntersectionObserver` پیاده‌سازی می‌شوند و در صورت عدم پشتیبانی مرورگر، fallback مناسب دارند. این قابلیت‌ها برای lazy loading، impression tracking، animation restart و pause/resume طراحی شده‌اند.

---

## Glossary

- **DirectiveBase**: کلاس پایه در پکیج `@alwatr/directive` که تمام directive های سفارشی از آن ارث‌بری می‌کنند.
- **Directive**: یک کلاس که رفتار سفارشی را به یک HTML element متصل می‌کند.
- **lazyInit\_**: lifecycle hook اختیاری که دقیقاً یک بار پس از ورود اول element به viewport اجرا می‌شود.
- **onVisible\_**: lifecycle hook اختیاری که هر بار پس از ورود element به viewport اجرا می‌شود.
- **onHidden\_**: lifecycle hook اختیاری که هر بار پس از خروج element از viewport اجرا می‌شود.
- **triggerLazyInit\_**: متد private که منطق راه‌اندازی one-shot lazy execution را مدیریت می‌کند.
- **triggerVisibilityObserver\_**: متد private که یک `IntersectionObserver` مشترک برای `onVisible_` و `onHidden_` می‌سازد.
- **IntersectionObserver**: Web API استاندارد برای تشخیص ورود/خروج element به viewport.
- **destroyHookList\_\_**: لیست داخلی در `DirectiveBase` که cleanup callback ها را نگه می‌دارد و هنگام `destroy()` اجرا می‌شوند.
- **Viewport**: ناحیه قابل مشاهده مرورگر.
- **Fallback**: مکانیزم جایگزین در صورت عدم پشتیبانی مرورگر از API اصلی.
- **Awaitable**: نوعی که می‌تواند مقدار مستقیم یا Promise باشد (`T | Promise<T>`).

---

## Requirements

### Requirement 1: تعریف lifecycle hook های اختیاری

**User Story:** As a directive developer, I want to define optional `lazyInit_`, `onVisible_`, and `onHidden_` hooks in my directive class, so that I can execute logic at the right time relative to element visibility.

#### Acceptance Criteria

1. THE DirectiveBase SHALL support an optional protected method `init_()` with return type `Awaitable<void>`.
2. THE DirectiveBase SHALL support an optional protected method `lazyInit_()` with return type `Awaitable<void>`.
3. THE DirectiveBase SHALL support an optional protected method `onVisible_()` with return type `Awaitable<void>`.
4. THE DirectiveBase SHALL support an optional protected method `onHidden_()` with return type `Awaitable<void>`.
5. WHEN a subclass does not define `lazyInit_`, THE DirectiveBase SHALL not call `triggerLazyInit_()`.
6. WHEN a subclass defines neither `onVisible_` nor `onHidden_`, THE DirectiveBase SHALL not call `triggerVisibilityObserver_()`.

---

### Requirement 2: اجرای hookها پس از `init_()`

**User Story:** As a directive developer, I want all visibility hooks to always run after `init_()` completes, so that my logic can safely depend on the initial setup.

#### Acceptance Criteria

1. WHEN `lazyInit_` is defined, THE DirectiveBase SHALL call `triggerLazyInit_()` only after `init_()` has completed.
2. WHEN `onVisible_` or `onHidden_` is defined, THE DirectiveBase SHALL call `triggerVisibilityObserver_()` only after `init_()` has completed.
3. THE DirectiveBase SHALL call all trigger methods after `delay.nextMacrotask()` has resolved.

---

### Requirement 3: اجرای دقیقاً یک‌باره `lazyInit_`

**User Story:** As a directive developer, I want `lazyInit_` to run exactly once when the element first enters the viewport, so that expensive operations like data fetching are not repeated.

#### Acceptance Criteria

1. WHEN the element enters the viewport for the first time, THE DirectiveBase SHALL call `lazyInit_()` exactly once.
2. WHEN `lazyInit_()` has already been called, THE DirectiveBase SHALL not call it again even if the element re-enters the viewport.
3. WHEN `IntersectionObserver` is available and `lazyInit_` is defined, THE triggerLazyInit\_ SHALL create a one-shot `IntersectionObserver` that disconnects immediately after the first intersection.

---

### Requirement 4: اجرای تکرارشونده `onVisible_` و `onHidden_`

**User Story:** As a directive developer, I want `onVisible_` to run every time the element enters the viewport and `onHidden_` to run every time it leaves, so that I can track impressions, restart animations, or pause/resume work on each visibility change.

#### Acceptance Criteria

1. WHEN the element enters the viewport, THE DirectiveBase SHALL call `onVisible_()` if defined.
2. WHEN the element enters the viewport multiple times, THE DirectiveBase SHALL call `onVisible_()` each time.
3. WHEN the element leaves the viewport, THE DirectiveBase SHALL call `onHidden_()` if defined.
4. WHEN the element leaves the viewport multiple times, THE DirectiveBase SHALL call `onHidden_()` each time.
5. WHEN `IntersectionObserver` is available and either `onVisible_` or `onHidden_` is defined, THE triggerVisibilityObserver\_ SHALL create a single persistent `IntersectionObserver` shared by both hooks, that remains active until `destroy()` is called.

---

### Requirement 5: Fallback chain برای `lazyInit_`

**User Story:** As a directive developer, I want `lazyInit_` to work even in environments without `IntersectionObserver`, so that my directive functions correctly across all supported browsers.

#### Acceptance Criteria

1. WHEN `IntersectionObserver` is not available and `requestIdleCallback` is available, THE triggerLazyInit* SHALL schedule `lazyInit*()`via`requestIdleCallback`.
2. WHEN neither `IntersectionObserver` nor `requestIdleCallback` is available, THE triggerLazyInit* SHALL schedule `lazyInit*()`via`setTimeout` with a 100ms delay.
3. WHEN `IntersectionObserver` is available, THE triggerLazyInit\_ SHALL use `IntersectionObserver` and SHALL NOT use `requestIdleCallback` or `setTimeout`.

---

### Requirement 6: Fallback برای `onVisible_` و `onHidden_`

**User Story:** As a directive developer, I want `onVisible_` to execute at least once even in environments without `IntersectionObserver`, so that critical visibility logic is not silently skipped. I accept that `onHidden_` has no meaningful fallback.

#### Acceptance Criteria

1. WHEN `IntersectionObserver` is not available and `onVisible_` is defined, THE triggerVisibilityObserver\_ SHALL schedule `onVisible_()` exactly once via `setTimeout` with a 100ms delay.
2. WHEN `IntersectionObserver` is not available and `onHidden_` is defined, THE triggerVisibilityObserver\_ SHALL NOT call `onHidden_()` — no fallback exists.
3. WHEN `IntersectionObserver` is available, THE triggerVisibilityObserver\_ SHALL use `IntersectionObserver` and SHALL NOT call either hook immediately without an intersection event.

---

### Requirement 7: Cleanup و جلوگیری از memory leak

**User Story:** As a directive developer, I want all observers to be properly cleaned up when the directive is destroyed, so that there are no memory leaks or stale callbacks.

#### Acceptance Criteria

1. WHEN `IntersectionObserver` is used for `lazyInit_`, THE triggerLazyInit\_ SHALL register the observer's `disconnect` method in `destroyHookList__`.
2. WHEN `IntersectionObserver` is used for `onVisible_` or `onHidden_`, THE triggerVisibilityObserver\_ SHALL register the shared observer's `disconnect` method once in `destroyHookList__`.
3. WHEN `destroy()` is called before the element enters the viewport, THE DirectiveBase SHALL disconnect the `lazyInit_` observer without calling `lazyInit_()`.
4. WHEN `destroy()` is called, THE DirectiveBase SHALL disconnect the visibility observer and SHALL NOT call `onVisible_()` or `onHidden_()` after destruction.

---

### Requirement 8: Error isolation در hookها

**User Story:** As a directive developer, I want errors thrown inside any hook to be caught and logged without crashing the directive, so that a bug in one hook does not break the entire directive or other directives.

#### Acceptance Criteria

1. WHEN `lazyInit_()` throws an error, THE DirectiveBase SHALL log the error using `logger_.error` with the method name and error key.
2. WHEN `onVisible_()` throws an error, THE DirectiveBase SHALL log the error using `logger_.error` with the method name and error key.
3. WHEN `onHidden_()` throws an error, THE DirectiveBase SHALL log the error using `logger_.error` with the method name and error key.
4. WHEN an error occurs in any hook, THE DirectiveBase SHALL continue normal operation without re-throwing the exception.

---

### Requirement 9: Backward compatibility

**User Story:** As an existing directive developer, I want directives that don't define any visibility hooks to behave exactly as before, so that adopting this feature is non-breaking.

#### Acceptance Criteria

1. WHEN a directive subclass defines none of `lazyInit_`, `onVisible_`, or `onHidden_`, THE DirectiveBase SHALL behave identically to its previous implementation.
2. THE DirectiveBase SHALL not create any `IntersectionObserver` instance when none of the visibility hooks are defined.
3. THE DirectiveBase SHALL not register any additional entries in `destroyHookList__` when none of the visibility hooks are defined.
