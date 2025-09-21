# Nitrobase

**Extremely Fast and Compact JSON-Based In-Memory Database with Nginx Integration**

Nitrobase is a blazingly fast, lightweight database built on JSON. It stores data entirely in memory for lightning-quick access, while also providing a JSON file backup for persistence. You can easily serve your data over the web using our high-performance accelerated Nginx server.

## Key Features

* **In-Memory Performance:** All data is stored in RAM, ensuring extremely fast reads and writes.
* **JSON Simplicity:** Data is stored and managed in a straightforward JSON format.
* **File Backup:** Automatic JSON file backup ensures data persistence.
* **Nginx Integration:** Seamlessly serve your data over the web using accelerated Nginx.
* **Compact Storage:** Efficient storage format minimizes disk space usage.

## Installation

```bash
npm install @alwatr/nitrobase
```

## Getting Started

### Create a Collection

```js
import { AlwatrNitrobase, Region } from '@alwatr/nitrobase';

const alwatrStore = new AlwatrNitrobase({
  rootPath: './db',
  defaultChangeDebounce: 2_000, 
});

const postsCollectionId = {
  name: 'post',
  region: Region.PerUser,
  ownerId: 'user_123',
  schemaVer: 2,
};

alwatrStore.newCollection(postsCollectionId);

const postsCollection = await alwatrStore.openCollection(postsCollectionId);

postsCollection.addItem('post1', {
  title: 'My First Post',
  content: 'This is the content of my first post.'
});
```

### Create a Document

```js
import { AlwatrNitrobase, Region } from '@alwatr/nitrobase';

const alwatrStore = new AlwatrNitrobase({
  rootPath: './db',
  defaultChangeDebounce: 2_000, 
});

const docId = {
  name: 'posts/my-first-post',
  region: Region.Authenticated,
};

alwatrStore.newDocument(docId, {
  title: 'My First Post',
  content: 'This is the content of my first post.'
});

const myPost = await alwatrStore.openDocument(docId);
```

## Demo Code

Explore the provided demo code (`collection.mjs`, `document.mjs`, `benchmark.mjs`) to see Alwatr Nitrobase in action and gain a deeper understanding of its capabilities.

## Sponsors

The following companies, organizations, and individuals support Nitrobase ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
