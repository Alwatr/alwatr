# Alwatr Local Storage Provider

A modern, simple, and robust solution for managing versioned JSON objects in the browser's `localStorage`. This package provides a clean, class-based API with a factory function to ensure your application's data persistence is safe, maintainable, and future-proof.

It's designed to handle data structure migrations automatically, preventing issues when your application updates and the shape of your stored data changes.

[](https://www.google.com/search?q=https://www.npmjs.com/package/%40alwatr/local-storage)
[](https://www.google.com/search?q=https://www.npmjs.com/package/%40alwatr/nanolib)
[](https://www.google.com/search?q=alwatr+local+storage)
[](https://www.google.com/search?q=alwatr+nanolib)
[](https://www.google.com/search?q=alwatr)

## Core Concepts

This library is built upon a few simple but powerful concepts:

1. **Provider Pattern**: Instead of using static functions, you create an _instance_ of a `LocalStorageProvider` for each unique data item you want to manage. This instance is configured once with a name, schemaVersion, and default value, and then used to interact with that specific item.

2. **Versioning & Automatic Migration**: When you initialize a provider with a new `schemaVersion` number, it automatically removes all older versions of that data from `localStorage`. This prevents conflicts and ensures the application is working with the correct data structure.

3. **Facade Factory Function**: The `createLocalStorageProvider` function acts as a clean entry point (Facade) to the library. This simplifies the API and decouples your code from the internal class implementation, making future library upgrades safer and easier.

4. **Static Existence Check**: The static method `LocalStorageProvider.has()` allows you to check if data exists _before_ creating a provider instance. This is highly efficient for scenarios where you only need to know if the data is present, without needing the data itself or a default value.

## Installation

```bash
# Using yarn
yarn add @alwatr/local-storage

# Using npm
npm install @alwatr/local-storage
```

## API and Usage

### 1\. Creating a Storage Provider

The recommended way to get started is by using the `createLocalStorageProvider` factory function. It encapsulates the instantiation logic and provides a clean API.

```typescript
import {createLocalStorageProvider} from '@alwatr/local-storage';

// Define the shape of your data
interface UserSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  lastLogin: number | null;
}

// Create a provider for user settings
const userSettingsProvider = createLocalStorageProvider<UserSettings>({
  name: 'user-settings',
  schemaVersion: 1,
  defaultValue: {
    theme: 'light',
    notifications: true,
    lastLogin: null,
  },
});
```

### 2\. Writing Data

Use the `.write()` method on the provider instance to save data. The value will be automatically serialized to a JSON string.

```typescript
userSettingsProvider.write({
  theme: 'dark',
  notifications: false,
  lastLogin: Date.now(),
});
```

### 3\. Reading Data

Use the `.read()` method to retrieve the data.

- If a value exists in `localStorage` and is valid JSON, it will be parsed and returned.
- If no value exists or if the stored value is corrupted (invalid JSON), the `defaultValue` will be written to `localStorage` and then returned. This guarantees you always receive a value of the correct type.

<!-- end list -->

```typescript
const currentSettings = userSettingsProvider.read();
console.log(currentSettings.theme); // "dark"
```

### 4\. Checking for Data Existence (The Recommended Way)

This is a critical feature for many applications. Before rendering a component or creating a full provider instance, you might need to check if the user has already saved data. Use the static `LocalStorageProvider.has()` method for this.

This method is highly efficient as it **does not** require a `defaultValue` and does not create a class instance.

```typescript
import {LocalStorageProvider} from '@alwatr/local-storage';

const formMeta = {name: 'user-survey-form', schemaVersion: 1};

if (LocalStorageProvider.has(formMeta)) {
  // The user has already filled out the form.
  // Show a "Thank you" message instead of the form.
  showThankYouMessage();
} else {
  // No data found, so render the form.
  renderSurveyForm();
}
```

### 5\. Removing Data

To completely remove the item from `localStorage`, use the `.remove()` method.

```typescript
userSettingsProvider.remove();
```

## Best Practices

- **Always use the `createLocalStorageProvider` factory function.** It provides a stable API that protects your code from internal library changes.
- **Prefer `LocalStorageProvider.has()` for existence checks.** It's the most performant and cleanest way to check for data without the overhead of creating an instance and providing a `defaultValue`.
- **Increment the `schemaVersion` number** whenever you make a breaking change to your data structure. The library will handle the cleanup of old data automatically.

---

## Sponsors

The following companies, organizations, and individuals support flux ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

---

<br>
<br>
<div dir="rtl">

# Alwatr Local Storage Provider (راهنمای فارسی)

یک راهکار مدرن، ساده و قدرتمند برای مدیریت آبجکت‌های JSON نسخه‌بندی شده در `localStorage` مرورگر. این پکیج یک API تمیز و مبتنی بر کلاس به همراه یک تابع سازنده (Factory Function) ارائه می‌دهد تا اطمینان حاصل شود که پایداری داده‌های اپلیکیشن شما امن، قابل نگهداری و آماده برای آینده است.

این کتابخانه طوری طراحی شده است که مهاجرت (migration) ساختار داده را به صورت خودکار مدیریت کند و از بروز مشکل در هنگام به‌روزرسانی اپلیکیشن و تغییر شکل داده‌های ذخیره شده جلوگیری نماید.

[](https://www.google.com/search?q=https://www.npmjs.com/package/%40alwatr/local-storage)
[](https://www.google.com/search?q=https://www.npmjs.com/package/%40alwatr/local-storage)
[](https://www.google.com/search?q=alwatr+local+storage)
[](https://www.google.com/search?q=alwatr)

## مفاهیم اصلی

این کتابخانه بر پایه چند مفهوم ساده اما قدرتمند بنا شده است:

1. **الگوی Provider (ارائه‌دهنده)**: به جای استفاده از توابع استاتیک، شما برای هر آیتم داده‌ای که می‌خواهید مدیریت کنید، یک _نمونه (instance)_ از `LocalStorageProvider` می‌سازید. این نمونه یک بار با `name`, `schemaVersion` و `defaultValue` پیکربندی شده و سپس برای تعامل با آن آیتم خاص استفاده می‌شود.

2. **نسخه‌بندی و مهاجرت خودکار**: هنگامی که شما یک Provider را با شماره `schemaVersion` جدیدی مقداردهی اولیه می‌کنید، این کتابخانه به طور خودکار تمام نسخه‌های قدیمی‌تر آن داده را از `localStorage` حذف می‌کند. این کار از تداخل جلوگیری کرده و تضمین می‌کند که اپلیکیشن همیشه با ساختار داده صحیح کار می‌کند.

3. **تابع سازنده Facade**: تابع `createLocalStorageProvider` به عنوان یک نقطه ورود تمیز (Facade) به کتابخانه عمل می‌کند. این کار API را ساده کرده و کد شما را از پیاده‌سازی داخلی کلاس‌ها جدا (decouple) می‌سازد، که باعث می‌شود ارتقاء کتابخانه در آینده امن‌تر و آسان‌تر باشد.

4. **بررسی استاتیک وجود داده**: متد استاتیک `LocalStorageProvider.has()` به شما اجازه می‌دهد وجود داده را _قبل_ از ساختن یک نمونه از Provider بررسی کنید. این روش برای سناریوهایی که فقط نیاز دارید بدانید داده‌ای وجود دارد یا نه (بدون نیاز به خود داده یا مقدار پیش‌فرض) بسیار کارآمد است.

## نصب

```bash
# با استفاده از yarn
yarn add @alwatr/local-storage

# با استفاده از npm
npm install @alwatr/local-storage
```

## API و راهنمای استفاده

### ۱. ساختن یک Storage Provider

بهترین روش برای شروع، استفاده از تابع سازنده `createLocalStorageProvider` است. این تابع منطق ساخت نمونه را کپسوله کرده و یک API تمیز ارائه می‌دهد.

```typescript
import {createLocalStorageProvider} from '@alwatr/local-storage';

// ساختار داده خود را تعریف کنید
interface UserSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  lastLogin: number | null;
}

// یک provider برای تنظیمات کاربر بسازید
const userSettingsProvider = createLocalStorageProvider<UserSettings>({
  name: 'user-settings',
  schemaVersion: 1,
  defaultValue: {
    theme: 'light',
    notifications: true,
    lastLogin: null,
  },
});
```

### ۲. نوشتن داده (Write)

از متد `.write()` روی نمونه Provider برای ذخیره داده استفاده کنید. مقدار داده به صورت خودکار به رشته JSON تبدیل می‌شود.

```typescript
userSettingsProvider.write({
  theme: 'dark',
  notifications: false,
  lastLogin: Date.now(),
});
```

### ۳. خواندن داده (Read)

از متد `.read()` برای بازیابی داده استفاده کنید.

- اگر مقداری در `localStorage` وجود داشته باشد و JSON معتبر باشد، آن مقدار parse شده و برگردانده می‌شود.
- اگر مقداری وجود نداشته باشد یا مقدار ذخیره شده خراب باشد (JSON نامعتبر)، `defaultValue` در `localStorage` نوشته شده و سپس برگردانده می‌شود. این تضمین می‌کند که شما همیشه یک مقدار با نوع صحیح دریافت می‌کنید.

<!-- end list -->

```typescript
const currentSettings = userSettingsProvider.read();
console.log(currentSettings.theme); // "dark"
```

### ۴. بررسی وجود داده (روش پیشنهادی)

این یک قابلیت حیاتی برای بسیاری از اپلیکیشن‌ها است. قبل از رندر کردن یک کامپوننت یا ساختن یک نمونه کامل از Provider، ممکن است لازم باشد بررسی کنید که آیا کاربر قبلاً داده‌ای ذخیره کرده است یا خیر. برای این کار از متد استاتیک `LocalStorageProvider.has()` استفاده کنید.

این متد بسیار کارآمد است زیرا **نیازی** به `defaultValue` ندارد و یک نمونه از کلاس نمی‌سازد.

```typescript
import {LocalStorageProvider} from '@alwatr/local-storage';

const formMeta = {name: 'user-survey-form', schemaVersion: 1};

if (LocalStorageProvider.has(formMeta)) {
  // داده وجود دارد. کاربر قبلاً فرم را پر کرده است.
  // به جای فرم، یک پیام تشکر نمایش دهید.
  showThankYouMessage();
} else {
  // داده‌ای یافت نشد، بنابراین فرم را نمایش دهید.
  renderSurveyForm();
}
```

### ۵. حذف داده (Remove)

برای حذف کامل یک آیتم از `localStorage`، از متد `.remove()` استفاده کنید.

```typescript
userSettingsProvider.remove();
```

## بهترین روش‌ها (Best Practices)

- **همیشه از تابع سازنده `createLocalStorageProvider` استفاده کنید.** این تابع یک API پایدار فراهم می‌کند که کد شما را در برابر تغییرات داخلی کتابخانه محافظت می‌کند.
- **برای بررسی وجود داده، `LocalStorageProvider.has()` را ترجیح دهید.** این کارآمدترین و تمیزترین روش برای بررسی وجود داده بدون سربار ساختن یک نمونه و تعریف `defaultValue` است.
- **هر زمان که یک تغییر ساختاری در داده‌های خود ایجاد کردید که با نسخه‌های قبلی ناسازگار است، شماره `schemaVersion` را افزایش دهید.** کتابخانه پاک‌سازی داده‌های قدیمی را به صورت خودکار انجام خواهد داد.

## حامیان (Sponsors)

شرکت‌ها، سازمان‌ها و افراد زیر از نگهداری و توسعه مداوم flux حمایت می‌کنند. با تبدیل شدن به یک حامی، لوگوی خود را در README و وب‌سایت ما قرار دهید.

## مشارکت (Contributing)

از مشارکت‌ها استقبال می‌شود! لطفاً قبل از ارسال pull request، [راهنمای مشارکت ما](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) را مطالعه کنید.

</div>
