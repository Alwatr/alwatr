# Alwatr Storage Client - `@alwatr/storage-client`

Elegant micro client for storage server written in tiny TypeScript ES module.

## Example usage

```ts
import {AlwatrStorageClient} from '@alwatr/storage-client';
import type {DocumentObject} from '@alwatr/storage-client';

interface User extends DocumentObject {
  email: string;
  token?: string;
}

const db = new AlwatrStorageClient<User>({
  name: 'user-list',
  host: 'http://127.0.0.1:80',
  token: 'alwatr_110_313',
  timeout: 2_000,
});

await db.set({
  id: 'alimd',
  _updatedBy: 'demo',
  email: 'ali@mihandoost.com',
});

await db.set({
  id: 'fmd',
  _updatedBy: 'demo',
  email: 'Fatemeh@mihandoost.com',
  token: Math.random().toString(36).substring(2, 15),
});

console.log("has 'alimd': %o", await db.has('alimd'));
console.log('keys: %o', await db.keys());
console.log('getAll: %o', await db.getAll());
console.log('delete: %o', await db.delete('alimd'));
try {
  await db.delete('abcd');
} catch (err) {
  console.log('delete 404: %o', (err as Error).message);
}
```

## API

### `config.name: string`

Storage name (like database name).

### `config.host: string`

Storage server host name (URL).

### `config.token: string`

Storage server token (like database password).

### `config.timeout?: number`

A timeout in ms for the fetch request.

### `config.debug?: boolean`

Debug output logs.

### `get(documentId: string): Promise<DocumentType>`

Get a document object by id.

- **documentId**: The id of the document object.

Example:

```ts
try {
  const user = await userStorage.get('user-1');
  console.dir(item);
} catch (err) {
  if ((err as Error)?.message === 'document_not_found') {
    console.log('user_5000 id not found!');
  } else {
    console.err((err as Error)?.message ?? err);
  }
}
```

### `has(documentId: string): Promise<boolean>`

Check document exists by id.

- **documentId**: The id of the document object.

Example:

```ts
const userExist = await userStorage.has('user-1');
if (!userExist) console.log('user_not_found');
```

### `set(documentObject: DocumentType, fastInstance?: boolean): DocumentType`

Insert/update a document object in the storage.

- **documentObject**: The document object to insert/update contain `id`.

Example:

```ts
userStorage.set({
  id: 'user-1',
  foo: 'bar',
});
```

### `delete(documentId: string): Promise<void>`

Delete a document object from the storage.

Example:

```ts
userStorage.delete('user-1');
```

### `getAll(): Promise<Record<string, DocumentType>>`

Dump all storage data.

Example:

```ts
const userStorage = await userStorage.getAll();
```
