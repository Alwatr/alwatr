import moment from 'moment-jalaali';

export const nime = moment('1401/12/17', 'jYYYY/jM/jD');

export function dateDistance(dateMilliseconds: number): number {
  return Math.ceil((dateMilliseconds - Date.now()) / 60 / 60 / 24 / 1000);
}
