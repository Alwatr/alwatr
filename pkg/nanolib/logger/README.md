# Alwatr Logger

**A lightweight, flexible, and colorful console logging library for TypeScript and modern JavaScript.**

`@alwatr/logger` is designed to enhance the debugging experience by providing a structured, colorful, and highly customizable logging utility. It helps you organize log messages with custom scopes, control verbosity for different environments, and easily trace application flow from method calls to incidents and errors.

[](https://www.google.com/search?q=https://www.npmjs.com/package/%40alwatr/logger)
[](https://www.google.com/search?q=https://www.npmjs.com/package/%40alwatr/nanolib)
[](https://www.google.com/search?q=alwatr+logger)
[](https://www.google.com/search?q=alwatr+nanolib)
[](https://www.google.com/search?q=alwatr)

## Features

- **Accurate Call Site Reporting:** The browser's developer console correctly displays the file and line number where the logger is called in **your code**, not from within the logger's internal source. This makes debugging intuitive and directs you straight to the relevant line in your own codebase.
- **Customizable Scopes:** Organize log messages using scopes for easy filtering and debugging. Each logger instance gets a unique, persistent color.
- **Colorful Output:** Visually distinguish different log levels and scopes with vibrant, automatically assigned colors, optimized for both browser and terminal environments.
- **Debug/Development Mode:** Automatically enables detailed logging in development environments and disables it in production to optimize performance. Can be manually overridden.
- **Structured Logging Methods:** Provides a rich set of methods (`logMethod`, `logMethodArgs`, `incident`, `accident`, `error`, etc.) to log different types of events in a structured way.
- **Tiny Footprint:** Minimal overhead, keeping your project lean and efficient. It's a zero-dependency library.
- **Cross-Platform:** Works seamlessly in both Node.js and browser environments.

---

## Installation

```bash
npm install @alwatr/logger
```

or using yarn:

```bash
yarn add @alwatr/logger
```

---

## Usage

### Basic Usage

First, create a logger instance with a unique scope. This scope will prefix all messages logged by this instance.

```typescript
import {createLogger} from '@alwatr/logger';

// Create a logger with a specific scope
const logger = createLogger('my-app_main');

function greet(name: string) {
  // Log the method call with its arguments
  logger.logMethodArgs?.('greet', {name});

  if (!name) {
    // Log an unexpected incident (a warning)
    logger.accident('greet', 'name_is_empty', 'Guest name was not provided.');
    return;
  }

  console.log(`Hello, ${name}!`);
}

greet('Ali');
greet('');
```

### Advanced Usage Examples

Here is a demonstration of various logging methods available.

```typescript
import {createLogger} from '@alwatr/logger';

const logger = createLogger('api-service');

// 1. Banner: For important announcements
logger.banner('API Service Initialized - v2.0');

// 2. Log Property: Track state changes
let userState = {loggedIn: false};
logger.logProperty?.('userState', userState);
userState.loggedIn = true;
logger.logProperty?.('userState', userState);

// 3. Log Method & Arguments: Trace function calls
function fetchData(url: string, options: Record<string, any>) {
  logger.logMethodArgs?.('fetchData', {url, options});

  // 4. Incident: Log expected, non-critical events
  if (options.retries > 0) {
    logger.incident?.('fetchData', 'retry_attempt', `Retrying... attempt ${options.retries}`);
  }

  // 5. Error: Log critical errors
  try {
    throw new Error('Network request failed');
  } catch (err) {
    logger.error('fetchData', 'network_failure', err, {url});
  }
}

fetchData('/api/data', {retries: 1});
```

---

## API Reference

The `createLogger` function returns a logger instance with the following methods. Methods marked with `?` (optional chaining) are only available when `debugMode` is `true`.

- **`debugMode: boolean`**
  Indicates if debug mode is active.

- **`banner(message: string)`**
  Logs a large, prominent banner message. Useful for versioning or startup messages.

- **`logProperty?(propertyName: string, value: unknown)`**
  Logs a property name and its value. Ideal for tracking state.

- **`logMethod?(methodName: string)`**
  Logs the entry into a function or method.

- **`logMethodArgs?(methodName: string, args: unknown)`**
  Logs a method call along with its arguments.

- **`logMethodFull?(methodName: string, args: unknown, result: unknown)`**
  Logs a method call with its arguments and the returned result.

- **`logStep?(methodName: string, stepName: string, props?: unknown)`**
  Logs specific steps within a method, useful for tracking progress in complex functions.

- **`incident?(methodName:string, code: string, ...args: unknown[])`**
  Logs an expected event or incident (informational). This uses `console.log` and is styled to be noticeable but not alarming.
  _Example: A user cancels a request._

- **`accident(methodName: string, code: string, ...args: unknown[])`**
  Logs an unexpected incident or a handled error (warning) using `console.warn`.
  _Example: A file was not found, but the application can recover._

- **`error(methodName: string, code: string, ...args: unknown[])`**
  Logs a critical, unexpected error using `console.error`.
  _Example: A database connection fails._

- **`logOther?(...args: unknown[])`**
  A general-purpose logger with the standard scope styling.

- **`time?(label: string)`** / **`timeEnd?(label: string)`**
  Starts and ends a timer to measure performance. The label is automatically prefixed with the logger's scope.

---

## Best Practices

1. **Use Meaningful Scopes:**
   Choose descriptive scopes to easily identify the source of logs. A good practice is to use the module or component path, e.g., `app_http-client`, `ui:user-form`.

2. **Log Arguments and Results in Development:**
   Use `logMethodArgs` and `logMethodFull` generously during development. Since they are stripped in production builds, they won't impact performance.

3. **Distinguish Between `incident`, `accident`, and `error`:**
   - **`incident`**: For events that are part of the normal application flow but are worth noting (e.g., cache miss, user abort).
   - **`accident`**: For handled errors or unexpected situations where the app can recover (e.g., failed API call with a retry mechanism).
   - **`error`**: For critical failures that disrupt functionality and require immediate attention.

4. **Keep Production Logs Clean:**
   Rely on `accident` and `error` for production logs. These are always active and highlight important issues without the noise of debug messages.

---

## Enabling Debug Mode

Debug logs are enabled by default if `NODE_ENV` is `development`. You can manually control it as follows:

### Browser

1. Open your browser's developer tools.
2. Go to the "Application" tab.
3. Under "Local Storage," add a new key `ALWATR_DEBUG` with the value `1`.
4. Reload the page.

Alternatively, run this in the console:

```javascript
window.localStorage.setItem('ALWATR_DEBUG', '1');
```

> **Note:** Ensure the browser console's log level is set to include "Verbose" or "All" to see debug messages.

### Node.js

Set the `DEBUG` environment variable to `1` when running your application:

```bash
DEBUG=1 node index.js
```

---

## Contributing

Contributions are welcome\! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the [MPL-2.0 License](https://www.google.com/search?q=LICENSE).

---

<br>
<br>
<div dir="rtl">

# Alwatr Logger (راهنمای فارسی)

**یک کتابخانه لاگ (گزارش‌گیری) سبک، انعطاف‌پذیر و رنگارنگ برای کنسول، مخصوص تایپ‌اسکریپت و جاوااسکریپت مدرن.**

کتابخانه `@alwatr/logger` برای بهبود تجربه دیباگ کردن طراحی شده است. این ابزار با فراهم کردن یک سیستم لاگ‌گیری ساختاریافته، رنگی و کاملاً قابل تنظیم به شما کمک می‌کند تا پیام‌های لاگ را با استفاده از حوزه‌های (scopes) سفارشی سازماندهی کنید، سطح جزئیات لاگ‌ها را برای محیط‌های مختلف کنترل کرده و جریان اجرای برنامه را از فراخوانی متدها گرفته تا رخدادها و خطاها به راحتی ردیابی کنید.

## ویژگی‌ها

- **گزارش دقیق محل فراخوانی:** کنسول توسعه‌دهندگان مرورگر (DevTools)، آدرس فایل و شماره خطی که لاگر در **کد شما** فراخوانی شده است را به درستی نمایش می‌دهد و نه فایل‌های داخلی خود کتابخانه را. این ویژگی دیباگ کردن را بسیار مستقیم و آسان می‌کند و شما را مستقیماً به خط مورد نظر در کد خودتان هدایت می‌کند.
- **حوزه‌های قابل تنظیم (Customizable Scopes):** پیام‌های لاگ را با استفاده از حوزه‌ها سازماندهی کنید تا فیلتر کردن و دیباگ کردن آسان‌تر شود. هر نمونه از لاگر یک رنگ منحصر به فرد و ثابت دریافت می‌کند.
- **خروجی رنگی:** سطوح مختلف لاگ و حوزه‌ها را با رنگ‌های زنده و اختصاصی از یکدیگر متمایز کنید. این رنگ‌ها برای هر دو محیط مرورگر و ترمینال بهینه‌سازی شده‌اند.
- **حالت توسعه/دیباگ (Debug/Development Mode):** به طور خودکار لاگ‌های دقیق را در محیط توسعه فعال کرده و در محیط پروداکشن برای بهینه‌سازی عملکرد، غیرفعال می‌کند. این رفتار قابل تغییر است.
- **متدهای لاگ‌گیری ساختاریافته:** مجموعه‌ای غنی از متدها (`logMethod`, `logMethodArgs`, `incident`, `accident`, `error` و غیره) برای ثبت انواع مختلف رویدادها به صورت ساختاریافته فراهم می‌کند.
- **حجم بسیار کم (Tiny Footprint):** سربار بسیار کمی دارد و پروژه شما را سبک و کارآمد نگه می‌دارد. این کتابخانه هیچ وابستگی خارجی ندارد.
- **چندسکویی (Cross-Platform):** به صورت یکپارچه در محیط‌های Node.js و مرورگر کار می‌کند.

[](https://www.google.com/search?q=https://www.npmjs.com/package/%40alwatr/logger)
[](https://www.google.com/search?q=https://www.npmjs.com/package/%40alwatr/nanolib)
[](https://www.google.com/search?q=alwatr+logger)
[](https://www.google.com/search?q=alwatr+nanolib)
[](https://www.google.com/search?q=alwatr)

---

## نصب و راه‌اندازی

```bash
npm install @alwatr/logger
```

یا با استفاده از yarn:

```bash
yarn add @alwatr/logger
```

---

## نحوه استفاده

### استفاده پایه

ابتدا، یک نمونه لاگر با یک حوزه (scope) منحصر به فرد ایجاد کنید. این حوزه به ابتدای تمام پیام‌هایی که توسط این نمونه ثبت می‌شوند، اضافه خواهد شد.

```typescript
import {createLogger} from '@alwatr/logger';

// ساخت یک لاگر با یک حوزه مشخص
const logger = createLogger('my-app_main');

function greet(name: string) {
  // لاگ کردن فراخوانی متد به همراه آرگومان‌های آن
  logger.logMethodArgs?.('greet', {name});

  if (!name) {
    // ثبت یک رخداد غیرمنتظره (یک هشدار)
    logger.accident('greet', 'name_is_empty', 'Guest name was not provided.');
    return;
  }

  console.log(`Hello, ${name}!`);
}

greet('Ali');
greet('');
```

### مثال‌های پیشرفته

در اینجا نمونه‌ای از متدهای مختلف لاگ‌گیری موجود نمایش داده شده است.

```typescript
import {createLogger} from '@alwatr/logger';

const logger = createLogger('api-service');

// ۱. بنر (Banner): برای اطلاعیه‌های مهم
logger.banner('API Service Initialized - v2.0');

// ۲. لاگ پراپرتی (Log Property): برای ردیابی تغییرات state
let userState = {loggedIn: false};
logger.logProperty?.('userState', userState);
userState.loggedIn = true;
logger.logProperty?.('userState', userState);

// ۳. لاگ متد و آرگومان‌ها: برای ردیابی فراخوانی توابع
function fetchData(url: string, options: Record<string, any>) {
  logger.logMethodArgs?.('fetchData', {url, options});

  // ۴. رخداد (Incident): برای ثبت رویدادهای قابل انتظار و غیربحرانی
  if (options.retries > 0) {
    logger.incident?.('fetchData', 'retry_attempt', `Retrying... attempt ${options.retries}`);
  }

  // ۵. خطا (Error): برای ثبت خطاهای بحرانی
  try {
    throw new Error('Network request failed');
  } catch (err) {
    logger.error('fetchData', 'network_failure', err, {url});
  }
}

fetchData('/api/data', {retries: 1});
```

---

## مستندات API

تابع `createLogger` یک نمونه لاگر با متدهای زیر برمی‌گرداند. متدهایی که با `?` (optional chaining) مشخص شده‌اند، تنها زمانی در دسترس هستند که `debugMode` فعال باشد.

- **`debugMode: boolean`**
  نشان می‌دهد که آیا حالت دیباگ فعال است یا خیر.

- **`banner(message: string)`**
  یک پیام بزرگ و برجسته را لاگ می‌کند. برای نمایش نسخه یا پیام‌های زمان راه‌اندازی مفید است.

- **`logProperty?(propertyName: string, value: unknown)`**
  نام یک پراپرتی و مقدار آن را لاگ می‌کند. برای ردیابی state ایده‌آل است.

- **`logMethod?(methodName: string)`**
  ورود به یک تابع یا متد را لاگ می‌کند.

- **`logMethodArgs?(methodName: string, args: unknown)`**
  فراخوانی یک متد را به همراه آرگومان‌های آن لاگ می‌کند.

- **`logMethodFull?(methodName: string, args: unknown, result: unknown)`**
  فراخوانی یک متد را به همراه آرگومان‌ها و مقدار بازگشتی آن لاگ می‌کند.

- **`logStep?(methodName: string, stepName: string, props?: unknown)`**
  مراحل خاصی را در یک متد لاگ می‌کند که برای ردیابی پیشرفت در توابع پیچیده مفید است.

- **`incident?(methodName:string, code: string, ...args: unknown[])`**
  یک رویداد یا رخداد قابل انتظار (اطلاعاتی) را لاگ می‌کند. این متد از `console.log` استفاده می‌کند و استایل آن به گونه‌ای است که قابل توجه باشد اما نگران‌کننده نباشد.
  _مثال: کاربر یک درخواست را لغو می‌کند._

- **`accident(methodName: string, code: string, ...args: unknown[])`**
  یک رخداد غیرمنتظره یا یک خطای مدیریت‌شده (هشدار) را با استفاده از `console.warn` لاگ می‌کند.
  _مثال: یک فایل پیدا نمی‌شود، اما برنامه می‌تواند به کار خود ادامه دهد._

- **`error(methodName: string, code: string, ...args: unknown[])`**
  یک خطای بحرانی و غیرمنتظره را با استفاده از `console.error` لاگ می‌کند.
  _مثال: اتصال به پایگاه داده با شکست مواجه می‌شود._

- **`logOther?(...args: unknown[])`**
  یک لاگر عمومی با استایل استاندارد حوزه (scope).

- **`time?(label: string)`** / **`timeEnd?(label: string)`**
  یک تایمر را برای اندازه‌گیری عملکرد شروع و پایان می‌دهد. حوزه لاگر به صورت خودکار به ابتدای `label` اضافه می‌شود.

---

## بهترین شیوه‌ها (Best Practices)

۱. **از حوزه‌های (Scopes) معنادار استفاده کنید:**
حوزه‌های توصیفی انتخاب کنید تا منبع لاگ‌ها به راحتی قابل شناسایی باشد. یک روش خوب، استفاده از مسیر ماژول یا کامپوننت است، مانند: `app_http-client` یا `ui_user-form`.

۲. **در محیط توسعه، آرگومان‌ها و نتایج را لاگ کنید:**
در طول توسعه، به طور گسترده از `logMethodArgs` و `logMethodFull` استفاده کنید. از آنجایی که این لاگ‌ها در بیلد پروداکشن حذف می‌شوند، تأثیری بر عملکرد نخواهند داشت.

۳. **بین `incident`، `accident` و `error` تمایز قائل شوید:**
\- **`incident`**: برای رویدادهایی که بخشی از جریان عادی برنامه هستند اما ارزش ثبت شدن دارند (مانند cache miss یا لغو درخواست توسط کاربر).
\- **`accident`**: برای خطاهای مدیریت‌شده یا شرایط غیرمنتظره‌ای که برنامه می‌تواند از آن‌ها بازیابی شود (مانند فراخوانی ناموفق API با مکانیزم تلاش مجدد).
\- **`error`**: برای شکست‌های بحرانی که عملکرد را مختل کرده و نیاز به توجه فوری دارند.

۴. **لاگ‌های پروداکشن را تمیز نگه دارید:**
برای لاگ‌های پروداکشن به `accident` و `error` تکیه کنید. این متدها همیشه فعال هستند و مسائل مهم را بدون نویز پیام‌های دیباگ برجسته می‌کنند.

---

## فعال‌سازی حالت دیباگ

لاگ‌های دیباگ به طور پیش‌فرض در صورتی که `NODE_ENV` برابر با `development` باشد، فعال هستند. شما می‌توانید آن را به صورت دستی کنترل کنید:

### مرورگر

۱. ابزارهای توسعه‌دهنده (developer tools) مرورگر خود را باز کنید.
۲. به تب "Application" بروید.
۳. در بخش "Local Storage"، یک کلید جدید با نام `ALWATR_DEBUG` و مقدار `1` اضافه کنید.
۴. صفحه را مجدداً بارگیری کنید.

همچنین می‌توانید این کد را در کنسول اجرا کنید:

```javascript
window.localStorage.setItem('ALWATR_DEBUG', '1');
```

> **نکته:** اطمینان حاصل کنید که سطح لاگ کنسول مرورگر شما برای نمایش پیام‌های "Verbose" یا "All" تنظیم شده باشد.

### Node.js

متغیر محیطی `DEBUG` را هنگام اجرای برنامه خود برابر `1` قرار دهید:

```bash
DEBUG=1 node index.js
```

---

## مشارکت

از مشارکت شما استقبال می‌کنیم\! لطفاً قبل از ارسال pull request، [راهنمای مشارکت](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) ما را مطالعه کنید.

## مجوز (License)

این پروژه تحت مجوز [MPL-2.0 License](https://www.google.com/search?q=LICENSE) منتشر شده است.

</div>
