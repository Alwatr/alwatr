## Nanotron

**Your Lightweight, High-Performance Micro/Nano Service Framework**

Nanotron is designed for building blazingly fast and efficient microservices and APIs. Its minimalist approach and focus on performance make it ideal for resource-constrained environments and scenarios where every millisecond counts.

## Key Features

- **Lightweight:** Minimal dependencies and a small footprint ensure optimal performance.
- **High-Performance:** Optimized for speed and efficiency in handling requests.
- **Microservice-Friendly:** Perfect for building and managing microservices architectures.
- **Intuitive API:** Simple and easy-to-use API for defining routes and handling requests.
- **TypeScript Support:** Built with TypeScript for enhanced type safety and developer experience.

## Installation

```bash
npm install @alwatr/nanotron
```

## Getting Started

```js
import {NanotronApiServer} from '@alwatr/nanotron';

const apiServer = new NanotronApiServer({
  host: '0.0.0.0',
  port: 80,
  prefix: '/api/',
});

apiServer.defineRoute({
  method: 'GET',
  url: '/hello',
  handler() {
    this.serverResponse.replyJson({
      ok: true,
      message: 'Hello :)',
    });
  },
});

apiServer.defineRoute({
  method: 'POST',
  url: '/echo-body',
  async handler() {
    const body = await this.getBodyRaw();
    this.serverResponse.replyJson({
      ok: true,
      data: body.toString(),
    });
  },
});
```

## Sponsors

The following companies, organizations, and individuals support Nanotron ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
