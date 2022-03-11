# @alwatr/fetch

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
