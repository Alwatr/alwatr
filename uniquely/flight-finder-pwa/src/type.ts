import type {JobDetail} from '@alwatr/type/flight-finder.js';

declare global {
  // eslint-disable-next-line no-var
  var appConfig: Record<string, string | undefined> | undefined;
}

export type NewJobDetail = {
  month: number;
  day: number;
} & Omit<JobDetail, 'date'>;
