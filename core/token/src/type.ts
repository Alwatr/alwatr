import type {DurationString} from '@alwatr/type';

export type DigestAlgorithm = 'md5' | 'sha1' | 'sha224' | 'sha256' | 'sha384' | 'sha512';

export type TokenStatus = 'valid' | 'invalid' | 'expired';

export type TokenGeneratorConfig = {
  /**
   * Secret string data to generate token.
   */
  secret: string;

  /**
   * Token expiration time.
   */
  duration: DurationString;

  /**
   * OpenSSl digest algorithm.
   */
  algorithm: DigestAlgorithm;

  /**
   * Encoding of token.
   */
  encoding: 'base64' | 'base64url' | 'hex' | 'binary';
};
