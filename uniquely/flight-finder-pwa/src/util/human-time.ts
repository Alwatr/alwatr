export function getHumanTime(timestamp: number): {
  humanTime: number;
  units: 'seconds' | 'minutes' | 'hours';
} {
  const time = Math.abs(timestamp);
  let humanTime = time / 1000;
  let units: 'seconds' | 'minutes' | 'hours' = 'seconds';

  if (time > 1000 * 60 * 60) {
    humanTime = time / (1000 * 60 * 60);
    units = 'hours';
  }
  else if (time > 1000 * 60) {
    humanTime = time / (1000 * 60);
    units = 'minutes';
  }

  return {humanTime, units};
}
