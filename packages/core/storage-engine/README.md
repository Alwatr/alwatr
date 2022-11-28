# Alwatr Storage Engine - `@alwatr/storage-engine`

Elegant micro in-memory json-like storage with disk backed, Fastest NoSQL Database written in tiny TypeScript ES module.

## Example usage

```ts
import {AlwatrStorageEngine} from '@alwatr/storage-engine';

import type {AlwatrDocumentObject} from '@alwatr/storage-engine';

interface User extends AlwatrDocumentObject {
  fname: string;
  lname: string;
  email: string;
  token?: string;
}

const db = new AlwatrStorageEngine<User>({
  name: 'user-list',
  path: 'db',
  saveBeautiful: true,
  debug: true,
});

console.log('db loaded and ready to access.');

let ali = db.get('alimd');

if (ali == null) {
  console.log('ali not found');
  ali = {
    id: 'alimd',
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
  id: 'fmd',
  fname: 'Fatemeh',
  lname: 'Mihandoost',
  email: 'Fatemeh@mihandoost.com',
  token: Math.random().toString(36).substring(2, 15),
});
```

## API

### `readonly name: string`

Storage name like database table name.

### `readonly storagePath: string`

Storage file full path.

### `readonly saveDebounce: number`

Save debounce timeout for minimal disk iops usage.

### `readonly saveBeautiful: boolean`

Write pretty formatted JSON file.

Example:

```ts
const db = new AlwatrStorageEngine<User>('user-list');
await userStorage.readyPromise;
const user = userStorage.get('user-1');
```

### `keys: Array<string>`

All document ids in array.

### `length: number`

### `set(documentObject: DocumentType, fastInstance?: boolean): DocumentType`

Insert/update a document object in the storage.

- **documentObject**: The document object to insert/update contain `id`.
- **fastInstance**: by default it will make a copy of the document before set.
  if you set fastInstance to true, it will set the original document.
  This is dangerous but much faster, you should use it only if you know what you are doing.

Example:

```ts
userStorage.set({
  id: 'user-1',
  foo: 'bar',
});
```

### `get(documentId: string, fastInstance?: boolean): DocumentType | null`

Get a document object by id.

- **documentId**: The id of the document object.
- **fastInstance**: by default it will return a copy of the document.
  if you set fastInstance to true, it will return the original document.
  This is dangerous but much faster, you should use it only if you know what you are doing.

Example:

```ts
const user = userStorage.get('user-1');
```

### `has(documentId: string): boolean`

Check documentId exist in the storage or not.

Example:

```ts
if (!useruserStorage.has('user-1')) throw new Error('user not found');
```

### `delete(documentId: string): boolean`

Delete a document object from the storage.

Example:

```ts
userStorage.delete('user-1');
```

### `*allObject()`

Loop over all document objects.

Example:

```ts
for(const user of userStorage.allObject()) {
  await sendMessage(user.id, 'Happy new year!');
  user.sent = true; // direct change document (use with caution)!
}
```

### `save(): void`

Save the storage to disk.

### `forceSave(): void`

Save the storage to disk without any debounce.

### `unload(): void`

Unload storage data and free ram usage (auto saved before unload).

Example:

```ts
userStorage.unload();
delete userStorage;
```
