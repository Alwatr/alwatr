import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Job, JobDetail} from '@alwatr/type/flight-finder.js';
import type {ToastOptions} from '@ionic/core';

declare global {
  // eslint-disable-next-line no-var
  var appConfig: Record<string, string | undefined> | undefined;

  interface AlwatrSignals {
    readonly 'job-add': Pick<Job, 'detail'>;
    readonly 'job-delete': string;
    readonly 'job-document-storage': AlwatrDocumentStorage<Job>;
    readonly toast: Partial<ToastOptions> & {message: string};
  }
  interface AlwatrRequestSignals {
    readonly 'job-document-storage': null;
  }
}

export type NewJobDetail = {
  month: number;
  day: number;
} & Omit<JobDetail, 'date'>;
