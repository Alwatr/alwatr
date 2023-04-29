import type {DurationString} from '@alwatr/math';
import type {CryptoAlgorithm, CryptoEncoding} from '@alwatr/type';

export type TokenStatus = 'valid' | 'invalid' | 'expired';

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

export type UserFactoryConfig = TokenGeneratorConfig
