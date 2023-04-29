import type {DurationString} from '@alwatr/math';

export type CryptoAlgorithm = 'md5' | 'sha1' | 'sha224' | 'sha256' | 'sha384' | 'sha512';
export type CryptoEncoding = 'base64' | 'base64url' | 'hex' | 'binary';

export type TokenStatus = 'valid' | 'invalid' | 'expired';
export type HashStatus = 'valid' | 'invalid';


export interface TokenGeneratorConfig {
  /**
   * Secret string data to generate token.
   */
  secret: string;

  /**
   * Token expiration time.
   *
   * `null` mean without expiration time
   */
  duration: DurationString | null;

  /**
   * OpenSSl digest algorithm.
   */
  algorithm: CryptoAlgorithm;

  /**
   * Encoding of token.
   */
  encoding: CryptoEncoding;
}

export interface HashGeneratorConfig {
  /**
   * OpenSSl digest algorithm.
   */
  algorithm: CryptoAlgorithm;

  /**
   * Encoding of hash.
   */
  encoding: CryptoEncoding;

  /**
   * CRC hash max length.
   */
  crcLength?: number;
}

export interface UserFactoryConfig {
  tokenConfig: TokenGeneratorConfig;
  hashConfig: HashGeneratorConfig;
}
