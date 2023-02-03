import moment from 'moment-jalaali';

export const nime = moment('1401/12/17', 'jYYYY/jM/jD');

export function dateDistance(dateMilliseconds: number): number {
  return Math.ceil((dateMilliseconds - Date.now()) / 60 / 60 / 24 / 1000);
}

export function nextDayCountdownDuration(hour: number): number {
  const now = new Date();
  const sendTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0, 0, 0);

  let duration = sendTime.valueOf() - now.valueOf();
  if (duration < 0) {
    duration += 86400000; // it's after hour, try hour tomorrow.
  }

  return duration;
}
