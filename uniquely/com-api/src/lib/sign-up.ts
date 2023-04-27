import {random} from '@alwatr/math';

import {tokenGenerator} from './token.js';

export const generateUserToken = (userId: string, lpe: number): string => {
  return tokenGenerator.generate(userId + lpe);
};

export const generateUserId = (): string => {
  return random.uuid;
};
