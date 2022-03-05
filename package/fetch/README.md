# @vatr/fetch

Enhanced fetch api with timeout, helper methods and types written in tiny TypeScript, ES module.

## Example usage

```js
import {getJson} from 'https://esm.run/@vatr/fetch';

const productList = await getJson('/api/products', {limit: 10}, {timeout: 5_000});
```
