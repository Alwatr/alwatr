import type {HashGeneratorConfig} from './hash.js';
import type {TokenGeneratorConfig} from './token.js';

/**
 * Alwatr hash generator recommended configuration for making random self-validate **user-id**.
 */
export const userIdGeneratorRecommendedConfig: HashGeneratorConfig = /* #__PURE__ */ {
  prefix: 'u',
  algorithm: 'sha1',
  encoding: 'base64url',
  crcLength: 4,
};

/**
 * Hash generator recommended configuration for making random self-validate **device-id**.
 */
export const deviceIdGeneratorRecommendedConfig: HashGeneratorConfig = /* #__PURE__ */ {
  ...userIdGeneratorRecommendedConfig,
  prefix: 'd',
};

/**
 * Hash generator pre configuration for making random self-validate **secrets**.
 */
export const secretGeneratorRecommendedConfig: HashGeneratorConfig = /* #__PURE__ */ {
  prefix: 's',
  algorithm: 'sha384',
  encoding: 'base64url',
  crcLength: 4,
};

/**
 * Token generator recommended configuration for making secure self-validate **user-token**.
 */
export const userTokenGeneratorRecommendedConfig: Omit<TokenGeneratorConfig, 'secret' | 'duration'> = /* #__PURE__ */ {
  prefix: 't',
  algorithm: 'sha224',
  encoding: 'base64url',
};
