import moment from 'moment-jalaali';

export const nime = moment('1401/12/17', 'jYYYY/jM/jD');

export function dateDistance(dateMiliseconds: number): number {
  return Math.ceil((dateMiliseconds - Date.now()) / 60 / 60 / 24 / 1000);
}
