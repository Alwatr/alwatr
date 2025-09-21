# Crypto

A robust generator of secure authentication HOTP tokens, employing the HMAC-based One-Time Password algorithm, accompanied by a suite of cryptographic utilities, all encapsulated within a compact TypeScript module.

**This package includes:**

1. [AlwatrHashGenerator](./src/hash.ts): Secure **self-validate** hash generator.
2. [AlwatrTokenGenerator](./src/token.ts): Secure authentication HOTP token generator (HMAC-based One-Time Password algorithm).
3. [AlwatrUserGenerator](./src/user.ts): User factory for generating self-validate user-id and user-token.
4. [PreConfiguration](./src/pre-config.ts): Pre-configuration object for the hash/token generators.

## References

- [RFC 4226](http://tools.ietf.org/html/rfc4226). HMAC-Based One-Time Password Algorithm (HOTP)
- [RFC 6238](http://tools.ietf.org/html/rfc6238). Time-Based One-Time Password Algorithm (TOTP)
- [HMAC: Keyed-Hashing for Message Authentication](https://tools.ietf.org/html/rfc2104). (February 1997). Network Working Group.
- [HMAC and Key Derivation](https://cryptobook.nakov.com/mac-and-key-derivation/hmac-and-key-derivation). Practical Cryptography for Developers.
- [HMAC Generator/Tester Tool](https://www.freeformatter.com/hmac-generator.html). FreeFormatter.
- [How API Request Signing Works (And How to Implement HMAC in NodeJS)](https://blog.andrewhoang.me/how-api-request-signing-works-and-how-to-implement-it-in-nodejs-2/). (2016). Andrew Hoang.
- [Implement HMAC Authentication](https://support.google.com/admanager/answer/7637490?hl=en). Google Ad Manager Help.

## Sponsors

The following companies, organizations, and individuals support Nanotron ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

[![Exir Studio](https://avatars.githubusercontent.com/u/181194967?s=200&v=4)](https://exirstudio.com)

### Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

