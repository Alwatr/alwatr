# Requirements Document

## Introduction

این فیچر دو lifecycle hook اختیاری به کلاس `DirectiveBase` در پکیج `@alwatr/directive` اضافه می‌کند:

- **`lazyInit_()`**: دقیقاً یک بار، اولین باری که element وارد viewport شود اجرا می‌شود.
- **`onVisible_()`**: هر بار که element وارد viewport شود اجرا می‌شود.

هر دو hook با `IntersectionObserver` پیاده‌سازی می‌شوند و در صورت عدم پشتیبانی مرورگر، fallback مناسب دارند. این قابلیت‌ها برای lazy loading، impression tracking و animation restart طراحی شده‌اند.

---

## Glossary

- **DirectiveBase**: کلاس پایه در پکیج `@alwatr/directive` که تمام directive های سفارشی از آن ارث‌بری می‌کنند.
- **Directive**: یک کلاس که رفتار سفارشی را به یک HTML element متصل می‌کند.
- **lazyInit\_**: lifecycle hook اختیاری که دقیقاً یک بار پس از ورود اول element به viewport اجرا می‌شود.
- **onVisible\_**: lifecycle hook اختیاری که هر بار پس از ورود element به viewport اجرا می‌شود.
- **triggerLazyInit\_**: متد private که منطق راه‌اندازی one-shot lazy execution را مدیریت می‌کند.
- **triggerOnVisible\_**: متد private که منطق persistent visibility tracking را مدیریت می‌کند.
- **IntersectionObserver**: Web API استاندارد برای تشخیص ورود/خروج element به viewport.
- **destroyHookList\_\_**: لیست داخلی در `DirectiveBase` که cleanup callback ها را نگه می‌دارد و هنگام `destroy()` اجرا می‌شوند.
- **Viewport**: ناحیه قابل مشاهده مرورگر.
- **Fallback**: مکانیزم جایگزین در صورت عدم پشتیبانی مرورگر از API اصلی.
- **Awaitable**: نوعی که می‌تواند مقدار مستقیم یا Promise باشد (`T | Promise<T>`).

---

## Requirements

### Requirement 1: تعریف lifecycle hook های اختیاری

**User Story:** As a directive developer, I want to define optional `lazyInit_` and `onVisible_` hooks in my directive class, so that I can execute logic at the right time relative to element visibility.

#### Acceptance Criteria

1. THE DirectiveBase SHALL support an optional protected method `lazyInit_()` with return type `Awaitable<void>`.
2. THE DirectiveBase SHALL support an optional protected method `onVisible_()` with return type `Awaitable<void>`.
3. WHEN a subclass does not define `lazyInit_`, THE DirectiveBase SHALL not call `triggerLazyInit_()`.
4. WHEN a subclass does not define `onVisible_`, THE DirectiveBase SHALL not call `triggerOnVisible_()`.

---

### Requirement 2: اجرای `lazyInit_` پس از `init_()`

**User Story:** As a directive developer, I want `lazyInit_` to always run after `init_()` completes, so that my lazy initialization logic can safely depend on the initial setup.

#### Acceptance Criteria

1. WHEN `lazyInit_` is defined, THE DirectiveBase SHALL call `triggerLazyInit_()` only after `init_()` has completed.
2. WHEN `onVisible_` is defined, THE DirectiveBase SHALL call `triggerOnVisible_()` only after `init_()` has completed.
3. THE DirectiveBase SHALL call both `triggerLazyInit_()` and `triggerOnVisible_()` after `delay.nextMacrotask()` has resolved.

---

### Requirement 3: اجرای دقیقاً یک‌باره `lazyInit_`

**User Story:** As a directive developer, I want `lazyInit_` to run exactly once when the element first enters the viewport, so that expensive operations like data fetching are not repeated.

#### Acceptance Criteria

1. WHEN the element enters the viewport for the first time, THE DirectiveBase SHALL call `lazyInit_()` exactly once.
2. WHEN `lazyInit_()` has already been called, THE DirectiveBase SHALL not call it again even if the element re-enters the viewport.
3. WHEN `IntersectionObserver` is available and `lazyInit_` is defined, THE triggerLazyInit\_ SHALL create a one-shot `IntersectionObserver` that disconnects immediately after the first intersection.

---

### Requirement 4: اجرای تکرارشونده `onVisible_`

**User Story:** As a directive developer, I want `onVisible_` to run every time the element enters the viewport, so that I can track impressions or restart animations on each appearance.

#### Acceptance Criteria

1. WHEN the element enters the viewport, THE DirectiveBase SHALL call `onVisible_()`.
2. WHEN the element enters the viewport multiple times, THE DirectiveBase SHALL call `onVisible_()` each time.
3. WHEN `IntersectionObserver` is available and `onVisible_` is defined, THE triggerOnVisible\_ SHALL create a persistent `IntersectionObserver` that remains active until `destroy()` is called.

---

### Requirement 5: Fallback chain برای `lazyInit_`

**User Story:** As a directive developer, I want `lazyInit_` to work even in environments without `IntersectionObserver`, so that my directive functions correctly across all supported browsers.

#### Acceptance Criteria

1. WHEN `IntersectionObserver` is not available and `requestIdleCallback` is available, THE triggerLazyInit* SHALL schedule `lazyInit*()`via`requestIdleCallback`.
2. WHEN neither `IntersectionObserver` nor `requestIdleCallback` is available, THE triggerLazyInit* SHALL schedule `lazyInit*()`via`setTimeout` with a 100ms delay.
3. WHEN `IntersectionObserver` is available, THE triggerLazyInit\_ SHALL use `IntersectionObserver` and SHALL NOT use `requestIdleCallback` or `setTimeout`.

---

### Requirement 6: Fallback برای `onVisible_`

**User Story:** As a directive developer, I want `onVisible_` to execute at least once even in environments without `IntersectionObserver`, so that critical visibility logic is not silently skipped.

#### Acceptance Criteria

1. WHEN `IntersectionObserver` is not available and `onVisible_` is defined, THE triggerOnVisible* SHALL call `onVisible*()` exactly once immediately.
2. WHEN `IntersectionObserver` is available, THE triggerOnVisible* SHALL use `IntersectionObserver` and SHALL NOT call `onVisible*()` immediately without an intersection event.

---

### Requirement 7: Cleanup و جلوگیری از memory leak

**User Story:** As a directive developer, I want all observers to be properly cleaned up when the directive is destroyed, so that there are no memory leaks or stale callbacks.

#### Acceptance Criteria

1. WHEN `IntersectionObserver` is used for `lazyInit_`, THE triggerLazyInit\_ SHALL register the observer's `disconnect` method in `destroyHookList__`.
2. WHEN `IntersectionObserver` is used for `onVisible_`, THE triggerOnVisible\_ SHALL register the observer's `disconnect` method in `destroyHookList__`.
3. WHEN `destroy()` is called before the element enters the viewport, THE DirectiveBase SHALL disconnect the `lazyInit_` observer without calling `lazyInit_()`.
4. WHEN `destroy()` is called, THE DirectiveBase SHALL disconnect the `onVisible_` observer and SHALL NOT call `onVisible_()` after destruction.

---

### Requirement 8: Error isolation در hookها

**User Story:** As a directive developer, I want errors thrown inside `lazyInit_` or `onVisible_` to be caught and logged without crashing the directive, so that a bug in one hook does not break the entire directive or other directives.

#### Acceptance Criteria

1. WHEN `lazyInit_()` throws an error, THE DirectiveBase SHALL log the error using `logger_.error` with the method name and error key.
2. WHEN `onVisible_()` throws an error, THE DirectiveBase SHALL log the error using `logger_.error` with the method name and error key.
3. WHEN an error occurs in `lazyInit_()`, THE DirectiveBase SHALL continue normal operation without re-throwing the exception.
4. WHEN an error occurs in `onVisible_()`, THE DirectiveBase SHALL continue normal operation without re-throwing the exception.

---

### Requirement 9: Backward compatibility

**User Story:** As an existing directive developer, I want directives that don't define `lazyInit_` or `onVisible_` to behave exactly as before, so that adopting this feature is non-breaking.

#### Acceptance Criteria

1. WHEN a directive subclass defines neither `lazyInit_` nor `onVisible_`, THE DirectiveBase SHALL behave identically to its previous implementation.
2. THE DirectiveBase SHALL not create any `IntersectionObserver` instance when neither `lazyInit_` nor `onVisible_` is defined.
3. THE DirectiveBase SHALL not register any additional entries in `destroyHookList__` when neither hook is defined.
