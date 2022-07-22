# @alwatr/storage

Elegant micro in-memory json-like storage with disk backed, Faster NoSQL Database written in tiny TypeScript ES module.

## Example usage

```ts
import {AlwatrStorage} from 'https://esm.run/@alwatr/storage';
import type {DocumentObject} from 'https://esm.run/@alwatr/storage';

interface User extends DocumentObject {
  name: string;
  email?: string;
}

const db = new AlwatrStorage<User>('user-list');

const ali: User = {
  _id: 'alimd',
  name: 'Ali Mihandoost',
  email: 'ali@mihandoost.com',
};

db.set(ali);
let user = db.get('alimd');
console.log(user)
```

# API

### AlwatrStorage<T>(name: string, pathPrefix = 'data')

Create document database.

```ts
import {AlwatrStorage} from 'https://esm.run/@alwatr/storage';

interface User extends DocumentObject {
  name: string;
  email?: string;
}

const db = new AlwatrStorage<User>('user-list');
```

### db.ready()

Initialize database.

```ts
db.ready.then(() => {
   // now db initialized!
})

// or

await db.ready()
// now db initialized!
```

### db.get(documentId: string, fastInstance?: boolean)

Get a document object by id.

- **documentId** is id of the document object.
- **fastInstance** by default will return a copy of the document if you set fastInstance to true, it will return the original document. This is dangerous but much faster and you should use it only if you know what you are doing.

```ts
let ali = db.get('alimd');
```

### db.set(documentObject: DocumentType, fastInstance?: boolean)

Insert/update a document object in the storage.

- **documentObject** is the document object to insert/update contain `_id`.
- **fastInstance** by default it will make a copy of the document before set. if you set fastInstance to true, it will set the original document. This is dangerous but much faster and you should use it only if you know what you are doing.

```ts
const ali: User = {
  _id: 'alimd',
  name: 'Ali Mihandoost',
  email: 'ali@mihandoost.com',
};

db.set(ali);
```

### remove(documentId: string)

Remove a document object from the storage.

- **documentId** is id of the document object.

```ts
db.remove('alimd')
```