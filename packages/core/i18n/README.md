# @alwatr/i18n

<div align="center">

[![Published on npm](https://img.shields.io/npm/v/@alwatr/i18n.svg?logo=npm)](https://www.npmjs.com/package/@alwatr/i18n)
[![Build Status](https://github.com/AliMD/alwatr/actions/workflows/build.yaml/badge.svg?branch=next)](https://github.com/AliMD/alwatr/actions/workflows/build.yaml)
[![Lint Status](https://github.com/AliMD/alwatr/actions/workflows/lint.yaml/badge.svg?branch=next)](https://github.com/AliMD/alwatr/actions/workflows/lint.yaml)

</div>

Elegant powerful translation module (i18n/l10n) with dynamic json storage written in tiny TypeScript, ES module.

## Example usage

### Initialize

```js
import {initialI18n} from 'https://esm.run/@alwatr/i18n';
initialI18n();
```

### Localize in template string

```js
import {localize} from 'https://esm.run/@alwatr/i18n';

render() {
  return html`
    <p>${localize('Hello_World')}</p>
  `;
}
```
