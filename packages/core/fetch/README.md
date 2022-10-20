# @alwatr/fetch

Enhanced fetch API with the timeout, helper methods, and types written in tiny TypeScript, ES module.

## Options

`Options` inherited from the `RequestInit`. you can watch all documents of the parameters RequestInit in [`fetch init parameters`](https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters)

Options have four other parameters:

- `bodyJson`: a JSON object that converts to string and put on the body.
- `queryParameters`: a JSON object that converts to URL query params.
- `timeout`: A timeout for the fetch request.
- `retry` If fetch response not acceptable or timed out, it will retry the request

## Example usage

```ts
import {getJson} from 'https://esm.run/@alwatr/fetch';

interface ProductInterface {
  _id: string;
  name: string;
  description: string;
  image: string;
}

const productList = await getJson<Record<string, ProductInterface>>('/api/products', {
  queryParameters: {limit: 10},
  timeout: 15_000,
  retry: 5,
});
```

## API

### `fetch(url: string, options: FetchOptions = {})`

It's a wrapper around the browser's `fetch` function that adds retry pattern with timeout

```ts
await fetch(url, {timeout: 5_000, bodyJson: {a: 1, b: 2}});
```

### `getJson(url: string, options: FetchOptions = {})`

It fetches a JSON file from a URL, and returns the JSON data

```ts
await getJson('/api/products', {queryParameters: {limit: 10}, timeout: 5_000});
```

### `postJson(url: string, bodyJson: Record<string | number, unknown>, options?: FetchOptions)`

It takes a URL, a JSON object, and an optional FetchOptions object, and returns a Promise of a Response object

```ts
await postJson(url, {first_name: 'foo', last_name: 'bar'});
```
