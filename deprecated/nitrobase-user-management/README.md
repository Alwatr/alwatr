# Nitrobase User Management

User management module for Nitrobase, providing user creation, authentication, and data management capabilities.

## Installation

```bash
npm install @alwatr/nitrobase
```

## Usage

```typescript
import {AlwatrNitrobase, NitrobaseUserManagement, type NewUser} from '@alwatr/nitrobase';

// Define your user data structure
interface MyUserData {
  name: string;
  email: string;
  // ... other properties
}

// Initialize Nitrobase
const nitrobase = new AlwatrNitrobase({
  // ... your nitrobase configuration
});

// Initialize User Management
await NitrobaseUserManagement.initialize(nitrobase);

const userManagement = new NitrobaseUserManagement<MyUserData>(nitrobase);

// Create a new user
const newUser: NewUser<MyUserData> = {
  userId: 'user123',
  userToken: 'some_secure_token',
  data: {
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
};

await userManagement.newUser(newUser);

// Check if a user exists
const userExists = await userManagement.hasUser('user123');
console.log('User exists:', userExists); // Output: User exists: true

// Get user data
const userData = await userManagement.getUserData('user123');
console.log('User data:', userData); // Output: User data: { name: 'John Doe', email: 'john.doe@example.com' }

// Verify user token
const isValidToken = await userManagement.verifyUserToken('user123', 'some_secure_token');
console.log('Is valid token:', isValidToken); // Output: Is valid token: true

// Save user data (after modifications)
userData.email = 'john.updated@example.com'
userManagement.save('user123') // Background save
userManagement.saveImmediate('user123') // Immediate save (blocking)


// Get all user IDs
const userIds = await userManagement.userIds();
for await (const userId of userIds) {
  console.log('User ID:', userId);
}

// Get user directory
const userDir = await userManagement.getUserDirectory('user123');
console.log('User directory:', userDir);
```

## API

### `NitrobaseUserManagement`

- **`static initialize(nitrobase: AlwatrNitrobase): Promise<void>`:** Initializes the user management module. Must be called before creating a `NitrobaseUserManagement` instance.
- **`newUser(user: NewUser<TUser>): Promise<void>`:** Creates a new user with the provided data and token.  Sets up necessary storage and metadata.
- **`hasUser(userId: string): Promise<boolean>`:** Checks if a user with the given ID exists.
- **`getUserData(userId: string): Promise<TUser>`:** Retrieves the data associated with the given user ID.
- **`getUserMeta(userId: string): Promise<Readonly<StoreFileMeta>>`:** Retrieves metadata about the user's stored information.
- **`verifyUserToken(userId: string, token: string): Promise<boolean>`:** Verifies the provided token against the stored token for the user.
- **`save(userId: string): void`:** Saves any changes to the user's data. This operation is non-blocking.
- **`saveImmediate(userId: string): void`:** Immediately saves changes to the user's data.  This operation is blocking.
- **`userIds(): Promise<Generator<string, void, void>>`:** Returns an asynchronous generator that yields all user IDs.
- **`getUserDirectory(userId: string): Promise<string>`:** Retrieves the file system directory associated with the user.

## Types

- **`NewUser<TUser extends JsonObject>`:**  Represents the data required to create a new user. Includes user ID, token, and user-specific data.

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
