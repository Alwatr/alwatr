# @alwatr/storage

Elegant micro in-memory json-like storage with disk backed, Fastest NoSQL Database written in tiny TypeScript ES module.

## Example usage

```ts
import {AlwatrStorage} from '@alwatr/storage';
import type {DocumentObject} from '@alwatr/storage';

interface User extends DocumentObject {
  fname: string;
  lname: string;
  email: string;
  token?: string;
}

const db = new AlwatrStorage<User>('user-list', 'data');

await db.readyPromise
console.log('db loaded and ready to access.');

let ali = db.get('alimd');

if (ali == null) {
  console.log('ali not found');
  ali = {
    _id: 'alimd',
    fname: 'Ali',
    lname: 'Mihandoost',
    email: 'ali@mihandoost.com',
  };
} else {
  console.log('ali found: %o', ali);
  ali.token = Math.random().toString(36).substring(2, 15);
}

db.set(ali);
```

## API

### `new AlwatrStorage<DocumentType>(name: string, pathPrefix = 'data')`

- **name**: Storage name like database table name.
- **pathPrefix**: Saved file path prefix (default is `data`).

Example:

```ts
import {AlwatrStorage, DocumentObject} from '@alwatr/storage';
interface User extends DocumentObject {...}
const db = new AlwatrStorage<User>('user-list');
await db.readyPromise
```

### `readonly name: string`

Storage name like database table name.

### `readonly readyState: boolean`

Ready state set to true when the storage is ready and readyPromise resolved.

### `readonly readyPromise`

Ready promise resolved when the storage is ready.
you can use this promise to wait for the storage to be loaded successfully and ready to use.

Example:

```ts
const db = new AlwatrStorage<User>('user-list');
await db.readyPromise
const user = db.get('user-1');
```

### `set(documentObject: DocumentType, fastInstance?: boolean)`

Insert/update a document object in the storage.

- **documentObject**: the document object to insert/update contain `_id`.
- **fastInstance**: by default it will make a copy of the document before set.  
if you set fastInstance to true, it will set the original document.  
This is dangerous but much faster and you should use it only if you know what you are doing.

Example:

```ts
db.set({
  _id: 'user-1',
  foo: 'bar',
});
```

### `get(documentId: string, fastInstance?: boolean)`

Get a document object by id.

- **documentId**: the id of the document object.
- **fastInstance**: by default will return a copy of the document, if you set fastInstance to true, it will return the original document.  
This is dangerous but much faster, you should use it only if you know what you are doing.

Example:

```ts
const user = db.get('user-1');
```

### `remove(documentId: string)`

Remove a document object from the storage.

Example:

```ts
db.remove('alimd');
```
