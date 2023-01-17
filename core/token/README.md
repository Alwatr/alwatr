# Alwatr Token - `@alwatr/token`

Secure authentication HOTP token generator (HMAC-based One-Time Password algorithm) written in tiny TypeScript module.

## Example

```ts
import {createLogger} from '@alwatr/logger';
import {type TokenStatus, AlwatrTokenGenerator} from '@alwatr/token';

type User = {
  id: string;
  name: string;
  role: 'admin' | 'user';
  auth: string;
};

const logger = createLogger('token/demo');

const tokenGenerator = new AlwatrTokenGenerator({
  secret: 'my-very-secret-key',
  duration: '1h',
  algorithm: 'sha512',
  encoding: 'base64url',
});

const user: User = {
  id: 'alimd',
  name: 'Ali Mihandoost',
  role: 'admin',
  auth: '', // Generated in first login
};

// ------

// For example when user authenticated we send user data contain valid auth token.
function login(): User {
  user.auth = tokenGenerator.generate(`${user.id}-${user.role}`);
  logger.logMethodFull('login', {}, {user});
  return user;
}

// Now request received and we want to validate the token to ensure that the user is authenticated.
function userValidate(user: User): TokenStatus {
  const validateStatus = tokenGenerator.verify(`${user.id}-${user.role}`, user.auth);
  logger.logMethodFull('userValidate', {user}, {validateStatus});
  return validateStatus;
}

// demo
const userData = login();
userValidate(userData); // 'valid'

// one hour later
userValidate(user); // 'expired'

// one hours later
userValidate(user); // 'invalid'
```

## References

- [RFC 4226](http://tools.ietf.org/html/rfc4226). HMAC-Based One-Time Password Algorithm (HOTP)
- [RFC 6238](http://tools.ietf.org/html/rfc6238). Time-Based One-Time Password Algorithm (TOTP)
- [HMAC: Keyed-Hashing for Message Authentication](https://tools.ietf.org/html/rfc2104). (February 1997). Network Working Group.
- [HMAC and Key Derivation](https://cryptobook.nakov.com/mac-and-key-derivation/hmac-and-key-derivation). Practical Cryptography for Developers.
- [HMAC Generator/Tester Tool](https://www.freeformatter.com/hmac-generator.html). FreeFormatter.
- [How API Request Signing Works (And How to Implement HMAC in NodeJS)](https://blog.andrewhoang.me/how-api-request-signing-works-and-how-to-implement-it-in-nodejs-2/). (2016). Andrew Hoang.
- [Implement HMAC Authentication](https://support.google.com/admanager/answer/7637490?hl=en). Google Ad Manager Help.
