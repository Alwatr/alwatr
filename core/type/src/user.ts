import type {AlwatrDocumentObject} from './storage.js';

export const genderCS = ['male', 'female'] as const;
export type Gender = typeof genderCS[number];

export interface User extends AlwatrDocumentObject {
  /**
   * User global unique id (verifiable)
   */
  id: string;

  /**
   * User full name
   */
  fullName: string;

  gender?: Gender;

  email?: string;

  phoneNumber?: string;
}
