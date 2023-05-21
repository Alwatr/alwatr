import moment from 'moment-jalaali';

export const ghadir = moment('1402/4/16', 'jYYYY/jM/jD');

export function dateDistance(dateMilliseconds: number): number {
  return Math.ceil((dateMilliseconds - Date.now()) / 60 / 60 / 24 / 1000);
}
