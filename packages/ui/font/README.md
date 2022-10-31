# @alwatr/font

Best practices of using persian/arabic web fonts for progressive web applications (The Right Way).

## How to use

### Vazirmatn

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <link rel="preconnect" href="https://cdn.jsdelivr.net" />
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@alwatr/font@0.19.0/vazirmatn.min.css" fetchpriority="high" />

    <link
      rel="preload"
      href="https://cdn.jsdelivr.net/npm/@alwatr/font@0.19.0/vazirmatn/vazirmatn[wght].woff2"
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

### Vazirmatn Round Dot

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <link rel="preconnect" href="https://cdn.jsdelivr.net" />
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@alwatr/font@0.19.0/vazirmatn-roundot.min.css" fetchpriority="high" />

    <link
      rel="preload"
      href="https://cdn.jsdelivr.net/npm/@alwatr/font@0.19.0/vazirmatn/vazirmatn-roundot[wght].woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />

    <style>
      body {
        font-family: var(--font-vazirmatn-roundot), var(--font-system);
      }
    </style>
  </head>
  <body>
    <h1>بِسْمِ اللهِ الرَّحْمنِ الرَّحِیمِ</h1>
    <h2>به نام خداوند بخشنده مهربان</h2>
  </body>
</html>
```

### Sahel

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <link rel="preconnect" href="https://cdn.jsdelivr.net" />
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@alwatr/font@0.19.0/sahel.min.css" fetchpriority="high" />

    <link
      rel="preload"
      href="https://cdn.jsdelivr.net/npm/@alwatr/font@0.19.0/sahel/sahel[wght].woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />

    <style>
      body {
        font-family: var(--font-sahel), var(--font-system);
      }
    </style>
  </head>
  <body>
    <h1>بِسْمِ اللهِ الرَّحْمنِ الرَّحِیمِ</h1>
    <h2>به نام خداوند بخشنده مهربان</h2>
  </body>
</html>
```

[Demo](https://jsbin.com/zucajut/1/edit?html,output)
