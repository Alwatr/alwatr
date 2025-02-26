/**
 * Represents a cryptographic algorithm.
 * Supported algorithms include: 'md5', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512'.
 */
export type CryptoAlgorithm = 'md5' | 'sha1' | 'sha224' | 'sha256' | 'sha384' | 'sha512';

/**
 * Represents the encoding options for cryptographic operations.
 * The encoding can be one of the following: 'base64', 'base64url', 'hex', or 'binary'.
 */
export type CryptoEncoding = 'base64' | 'base64url' | 'hex' | 'ascii' | 'utf8' | 'binary';
