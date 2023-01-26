import moment, {type Moment} from 'moment-jalaali';

export const nime = moment('1401/12/17', 'jYYYY/jM/jD');

export function dateDistance(date: Moment): number {
  return Math.ceil((date.valueOf() - Date.now()) / 60 / 60 / 24 / 1000);
}
