# @alwatr/font

Simple useful Arabic/Persian fonts package for web developers.

## How to use

### Use CSS

Copy the code as the first element in the `<head>` of your HTML document.

```css
<link rel="preload" href="https://cdn.jsdelivr.net/npm/@alwatr/font/font.css" as="style" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@alwatr/font/font.css">
```

use `font-family` in your css file

if you want load any font before page load you should follow way:

```html
<link rel="preload" href="font-url" as="font" type="font/woff" crossorigin />
```
