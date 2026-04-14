# Implementation Plan: lazy-init-directive

## Overview

افزودن دو lifecycle hook اختیاری `lazyInit_` و `onVisible_` به کلاس `DirectiveBase` در فایل `pkg/nanolib/directive/src/directive-class.ts`. پیاده‌سازی با `IntersectionObserver` انجام می‌شود و fallback chain مناسب برای محیط‌های بدون پشتیبانی دارد.

## Tasks

- [x] 1. اضافه کردن تعریف نوع hook های اختیاری به `DirectiveBase`
  - در `directive-class.ts`، دو متد optional protected اضافه کن:
    - `protected lazyInit_?(): Awaitable<void>`
    - `protected onVisible_?(): Awaitable<void>`
  - این متدها abstract نیستند — فقط optional signature هستند
  - _Requirements: 1.1, 1.2_

- [x] 2. پیاده‌سازی `triggerLazyInit_` و اتصال آن به constructor
  - [x] 2.1 پیاده‌سازی متد private `triggerLazyInit_()`
    - اگر `IntersectionObserver` موجود بود: یک one-shot observer بساز که پس از اولین intersection، `observer.disconnect()` را صدا بزند و سپس `lazyInit_()` را اجرا کند
    - اگر `requestIdleCallback` موجود بود: از آن برای schedule کردن `lazyInit_()` استفاده کن
    - در غیر این صورت: از `setTimeout(() => ..., 100)` استفاده کن
    - در هر شاخه‌ای که از `IntersectionObserver` استفاده می‌شود، `observer.disconnect` را در `destroyHookList__` ثبت کن (از `addDestroyHook` استفاده کن)
    - خطاهای داخل `lazyInit_()` را با `this.logger_.error('triggerLazyInit_', 'error_in_lazy_init', err)` لاگ کن
    - _Requirements: 3.1, 3.2, 3.3, 5.1, 5.2, 5.3, 7.1, 7.3, 8.1, 8.3_
  - [x] 2.2 اتصال `triggerLazyInit_` به constructor
    - در IIFE موجود در constructor، پس از `await this.init_()` بررسی کن: `if (typeof this.lazyInit_ === 'function')`
    - در صورت صحت، `this.triggerLazyInit_()` را فراخوانی کن
    - _Requirements: 1.3, 2.1, 2.3_

- [x] 3. پیاده‌سازی `triggerOnVisible_` و اتصال آن به constructor
  - [x] 3.1 پیاده‌سازی متد private `triggerOnVisible_()`
    - اگر `IntersectionObserver` موجود بود: یک persistent observer بساز که هر بار `isIntersecting` بود `onVisible_()` را اجرا کند
    - `observer.disconnect` را در `destroyHookList__` ثبت کن (از `addDestroyHook` استفاده کن)
    - اگر `IntersectionObserver` موجود نبود: یک بار فوری `onVisible_()` را اجرا کن
    - خطاهای داخل `onVisible_()` را با `this.logger_.error('triggerOnVisible_', 'error_in_on_visible', err)` لاگ کن
    - _Requirements: 4.1, 4.2, 4.3, 6.1, 6.2, 7.2, 7.4, 8.2, 8.4_
  - [x] 3.2 اتصال `triggerOnVisible_` به constructor
    - در همان IIFE، پس از `await this.init_()` بررسی کن: `if (typeof this.onVisible_ === 'function')`
    - در صورت صحت، `this.triggerOnVisible_()` را فراخوانی کن
    - _Requirements: 1.4, 2.2, 2.3_

- [x] 4. Checkpoint — اطمینان از backward compatibility
  - بررسی کن که directive هایی که هیچ‌کدام از hookها را تعریف نکرده‌اند (مثل `TestDirective` در `util-decorators.test.ts`) بدون تغییر رفتار کار می‌کنند
  - بررسی کن که هیچ `IntersectionObserver` یا `destroyHookList__` entry اضافه‌ای ایجاد نمی‌شود
  - تست‌های موجود را اجرا کن: `bun test` در `pkg/nanolib/directive`
  - _Requirements: 9.1, 9.2, 9.3_

- [-] 5. نوشتن تست‌های unit و property برای hookها
  - [-] 5.1 نوشتن تست‌های unit برای `lazyInit_`
    - یک فایل تست جدید `directive-class.test.ts` در `pkg/nanolib/directive/src/` بساز
    - از `@happy-dom/global-registrator` برای mock کردن DOM استفاده کن
    - تست کن: وقتی `lazyInit_` تعریف نشده، `triggerLazyInit_` فراخوانی نشود
    - تست کن: وقتی `lazyInit_` تعریف شده، دقیقاً یک بار پس از `init_()` اجرا شود
    - تست کن: وقتی `lazyInit_()` خطا پرتاب کند، directive crash نکند
    - تست کن: وقتی `destroy()` قبل از intersection فراخوانی شود، `lazyInit_()` اجرا نشود
    - _Requirements: 1.3, 3.1, 3.2, 7.3, 8.1, 8.3_
  - [ ]\* 5.2 نوشتن property test برای اجرای یک‌باره `lazyInit_`
    - **Property: lazyInit single execution** — برای هر instance با `lazyInit_`، تعداد اجرا دقیقاً ۱ است
    - **Validates: Requirements 3.1, 3.2**
  - [~] 5.3 نوشتن تست‌های unit برای `onVisible_`
    - تست کن: وقتی `onVisible_` تعریف نشده، `triggerOnVisible_` فراخوانی نشود
    - تست کن: وقتی `onVisible_` تعریف شده، هر بار intersection اجرا شود
    - تست کن: وقتی `onVisible_()` خطا پرتاب کند، directive crash نکند
    - تست کن: وقتی `destroy()` فراخوانی شود، observer disconnect شود و `onVisible_()` دیگر اجرا نشود
    - _Requirements: 1.4, 4.1, 4.2, 7.4, 8.2, 8.4_
  - [ ]\* 5.4 نوشتن property test برای اجرای تکرارشونده `onVisible_`
    - **Property: onVisible repeated execution** — تعداد اجرای `onVisible_` برابر تعداد intersection های رخ‌داده است
    - **Validates: Requirements 4.1, 4.2**
  - [ ]\* 5.5 نوشتن property test برای ترتیب اجرا
    - **Property: Order guarantee** — هر دو hook همیشه پس از تکمیل `init_()` اجرا می‌شوند
    - **Validates: Requirements 2.1, 2.2, 2.3**
  - [ ]\* 5.6 نوشتن property test برای backward compatibility
    - **Property: Backward compatibility** — directive هایی که هیچ hook ندارند رفتار قبلی را حفظ می‌کنند
    - **Validates: Requirements 9.1, 9.2, 9.3**

- [~] 6. تست fallback chain
  - [~] 6.1 نوشتن تست برای fallback های `lazyInit_`
    - با mock کردن `IntersectionObserver` به `undefined`، تست کن که `requestIdleCallback` استفاده می‌شود
    - با mock کردن هر دو به `undefined`، تست کن که `setTimeout(100ms)` استفاده می‌شود
    - _Requirements: 5.1, 5.2, 5.3_
  - [~] 6.2 نوشتن تست برای fallback `onVisible_`
    - با mock کردن `IntersectionObserver` به `undefined`، تست کن که `onVisible_()` دقیقاً یک بار فوری اجرا می‌شود
    - _Requirements: 6.1, 6.2_

- [~] 7. Final checkpoint — اطمینان از پاس شدن همه تست‌ها
  - همه تست‌ها را اجرا کن: `bun test` در `pkg/nanolib/directive`
  - اطمینان حاصل کن که هیچ regression در تست‌های موجود (`util-decorators.test.ts`) وجود ندارد
  - در صورت وجود سوال یا ابهام، با کاربر مطرح کن.

## Notes

- تست‌های sub-task های ستاره‌دار (`*`) اختیاری هستند و می‌توانند برای MVP رد شوند
- هر task به requirements مشخص ارجاع دارد
- `IntersectionObserver` در `@happy-dom` پشتیبانی می‌شود — می‌توان آن را در تست‌ها mock کرد
- تمام تغییرات فقط در `directive-class.ts` و فایل تست جدید انجام می‌شوند
