# @alwatr/fetch

<div align="center">

[![Published on npm](https://img.shields.io/npm/v/@alwatr/fetch.svg?logo=npm)](https://www.npmjs.com/package/@alwatr/fetch)
[![Build Status](https://github.com/AliMD/alwatr/actions/workflows/build.yaml/badge.svg?branch=next)](https://github.com/AliMD/alwatr/actions/workflows/build.yaml)
[![Lint Status](https://github.com/AliMD/alwatr/actions/workflows/lint.yaml/badge.svg?branch=next)](https://github.com/AliMD/alwatr/actions/workflows/lint.yaml)

</div>

Enhanced fetch API with the timeout, helper methods, and types written in tiny TypeScript, ES module.

## Options

`Options` inherited from the `RequestInit`. you can watch all documents of the parameters RequestInit in [`fetch init parameters`](https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters)

Options have two other parameters:

- `bodyObject`: a JSON object that converts to string and put on the body.
- `queryParameters`: a JSON object that converts to URL query params

## Example usage

```js
import {getJson} from 'https://esm.run/@alwatr/fetch';

const productList = await getJson('/api/products', {limit: 10}, {timeout: 5_000});
```
