# @alwatr/font

Best practices of using persian/arabic web fonts for progressive web applications (The Right Way).

## How to use

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <link rel="preconnect" href="https://cdn.jsdelivr.net" />
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@alwatr/font@1.2.3/font.min.css" fetchpriority="high" />

    <link
      rel="preload"
      href="https://cdn.jsdelivr.net/npm/@alwatr/font@1.2.3/vazirmatn/vazirmatn[wght].woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />

    <style>
      body {
        font-family: var(--font-vazirmatn), var(--font-system);
      }
    </style>
  </head>
  <body>
    <h1>بِسْمِ اللهِ الرَّحْمنِ الرَّحِیمِ</h1>
    <h2>به نام خداوند بخشنده مهربان</h2>
  </body>
</html>
```
