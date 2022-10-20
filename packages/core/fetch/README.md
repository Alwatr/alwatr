# @alwatr/fetch

Enhanced fetch API with the timeout, helper methods, and types written in tiny TypeScript, ES module.

## Options

`Options` inherited from the `RequestInit`. you can watch all documents of the parameters RequestInit in [`fetch init parameters`](https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters)

Options have two other parameters:

- `bodyObject`: a JSON object that converts to string and put on the body.

## Example usage

```js
import {getJson} from 'https://esm.run/@alwatr/fetch';

const productList = await getJson('/api/products', {timeout: 5_000});
```
