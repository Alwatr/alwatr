# @vatr/fetch

Enhanced fetch api with timeout, helper methods and types written in tiny TypeScript, ES module.

## Options

`Options` inherited from the `RequestInit`. you can watch all documents of the parameters RequestInit in [`fetch init parameters`](https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters)

Options have two other parameters:

- `bodyObject`: a json object that convert to string and put on the body.
- `queryParameters`: a json object that convert to url query parames

## Example usage

```js
import {getJson} from 'https://esm.run/@vatr/fetch';

const productList = await getJson('/api/products', {limit: 10}, {timeout: 5_000});
```
