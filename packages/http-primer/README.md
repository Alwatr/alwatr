# HTTP Primer

Essential HTTP utilities for TypeScript, including types for HTTP methods, status codes, and headers.

## Installation

```bash
npm install @alwatr/http-primer
```

## Usage

### HTTP Methods

```typescript
import {HttpMethods} from '@alwatr/http-primer';

const method = HttpMethods.GET;
```

### HTTP Status Codes

```typescript
import {HttpStatusCodes} from '@alwatr/http-primer';

const statusCode = HttpStatusCodes.Success_200_OK;
```

### HTTP Headers

```typescript
import {HttpRequestHeaders, HttpResponseHeaders} from '@alwatr/http-primer';

const requestHeaders: HttpRequestHeaders = {
  accept: 'application/json',
  authorization: 'Bearer my-token',
};

const responseHeaders: HttpResponseHeaders = {
  'content-type': 'application/json',
  'content-length': 1234,
};
```

### MIME Types

```typescript
import {MimeTypes} from '@alwatr/http-essentials';

const contentType = MimeTypes.JSON; // 'application/json'
```

## Sponsors

The following companies, organizations, and individuals support Nanolib ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
