import {bench} from './bench.js';

// 18,303,355/s with 44,597.25kb
bench('date-now', () => {
  Date.now();
});

// 12,177,203/s with 51,511.3kb
bench('new-date', () => {
  new Date();
});

// 677,056/s with 52,559.87kb
const dateTimeFormat = Intl.DateTimeFormat('fa');
bench('date-time-format-new', () => {
  dateTimeFormat.format(new Date());
});

// 9,770/s with 2,381,545.47kb
bench('new-date-time-format-new', () => {
  const dateTimeFormat = Intl.DateTimeFormat('fa');
  dateTimeFormat.format(new Date());
});

// 766,025/s with 2,227,060.74kb
bench('date-time-format-now', () => {
  dateTimeFormat.format(Date.now());
});

// 9,616/s with 1,784,446.98kb
bench('new-date-time-format-now', () => {
  const dateTimeFormat = Intl.DateTimeFormat('fa');
  dateTimeFormat.format(Date.now());
});

// 757,297/s with 1,626,062.85kb
bench('to-locale-date-string', () => {
  const time = Date.now();
  new Date(time).toLocaleDateString('fa');
});
