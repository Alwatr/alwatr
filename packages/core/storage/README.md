# @alwatr/storage

Elegant micro in-memory json-like storage with disk backed, Faster NoSQL Database written in tiny TypeScript ES module.

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

const db = new AlwatrStorage<User>('user-list', 'temp');

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
db.set({
  _id: 'fmd',
  fname: 'Fatemeh',
  lname: 'Mihandoost',
  email: 'Fatemeh@mihandoost.com',
  token: Math.random().toString(36).substring(2, 15),
});
```

## API

### `AlwatrStorage<T>(name: string, pathPrefix = 'data')`

Create document database.

Example:

```ts
import {AlwatrStorage} from '@alwatr/storage';

interface User extends DocumentObject {
  name: string;
  email?: string;
}

const db = new AlwatrStorage<User>('user-list');

await db.readyPromise
```

### `db.readyPromise`

Initialize database.

Example:

```ts
db.readyPromise.then(() => {
  // db initialized!
});

// or

await db.readyPromise
// db initialized!
```

### `db.get(documentId: string, fastInstance?: boolean)`

Get a document object by id.

- **documentId** the id of the document object.
- **fastInstance** by default will return a copy of the document if you set fastInstance to true, it will return the original document. This is dangerous but much faster and you should use it only if you know what you are doing.

Example:

```ts
let ali = db.get('alimd');
```

### `db.set(documentObject: DocumentType, fastInstance?: boolean)`

Insert/update a document object in the storage.

- **documentObject** the document object to insert/update contain `_id`.
- **fastInstance** by default it will make a copy of the document before set. if you set fastInstance to true, it will set the original document. This is dangerous but much faster and you should use it only if you know what you are doing.

Example:

```ts
const ali: User = {
  _id: 'alimd',
  name: 'Ali Mihandoost',
  email: 'ali@mihandoost.com',
};

db.set(ali);
```

### `remove(documentId: string)`

Remove a document object from the storage.

Example:

```ts
db.remove('alimd');
```
