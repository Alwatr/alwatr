import type {AlwatrDocumentObject} from './storage.js';

export const genderCS = ['male', 'female'] as const;
export type Gender = typeof genderCS[number];

export interface User extends AlwatrDocumentObject {
  /**
   * User global unique id (verifiable)
   */
  id: string;

  /**
   * Link pass epoch number, started from 1 and increased by token revoke.
   */
  lpe: number;

  /**
   * User authorization permissions list.
   */
  permissions?: Array<string> | 'root';

  fullName: string;

  phoneNumber: number;

  gender: Gender;

  email?: string;

  landlinePhone?: string;

  /**
   * Country Code.
   */
  country: string;

  /**
   * Province Code.
   */
  province?: string;

  /**
   * City Code.
   */
  city?: string;

  /**
   * User full address.
   */
  address?: string;

  /**
   * Postal code
   */
  postalCode?: string;
}

export type UserAuth = {
  id: string;
  token: string;
}
