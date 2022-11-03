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

const db = new AlwatrStorage<User>({
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
    _id: 'alimd',
    _updatedBy: 'demo',
    fname: 'Ali',
    lname: 'Mihandoost',
    email: 'ali@mihandoost.com',
  };
}
else {
  console.log('ali found: %o', ali);
  ali.token = Math.random().toString(36).substring(2, 15);
}

db.set(ali);

db.set({
  _id: 'fmd',
  _updatedBy: 'demo',
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
const db = new AlwatrStorage<User>('user-list');
await userStorage.readyPromise;
const user = userStorage.get('user-1');
```

### `keys: Array<string>`

All document ids in array.

### `length: number`

### `set(documentObject: DocumentType, fastInstance?: boolean): DocumentType`

Insert/update a document object in the storage.

- **documentObject**: The document object to insert/update contain `_id`.
- **fastInstance**: by default it will make a copy of the document before set.
  if you set fastInstance to true, it will set the original document.
  This is dangerous but much faster, you should use it only if you know what you are doing.

Example:

```ts
userStorage.set({
  _id: 'user-1',
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

### `remove(documentId: string): boolean`

Remove a document object from the storage.

Example:

```ts
userStorage.remove('user-1');
```

### `async forAll(callbackfn: (documentObject: DocumentType) => void | false | Promise<void | false>): Promise<void>`

Loop over all document objects asynchronous.

You can return false in callbackfn to break the loop.

Example:

```ts
await userStorage.forAll(async (user) => {
  await sendMessage(user._id, 'Happy new year!');
  user.sent = true; // direct change document (use with caution)!
});
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
