import type {AlwatrDocumentObject} from '@alwatr/fetch';
import type {ToastOptions} from '@ionic/core';

declare global {
  // eslint-disable-next-line no-var
  var appConfig: Record<string, string | undefined> | undefined;

  interface AlwatrSignals {
    readonly toast: Partial<ToastOptions> & {message: string};
    readonly 'job-add': Pick<Job, 'detail'>;
    readonly loading: Array<loadingPromised>;
    readonly 'job-list': Array<Job>;
    readonly 'job-delete': string;
  }
  interface AlwatrRequestSignals {
    readonly 'job-list': Record<string, never>;
    readonly loading: {
      key: loadingPromised;
      status: 'start' | 'end';
    };
  }
}

export type loadingPromised = 'job-add' | 'job-list' | 'job-delete';
export type dayParts = 'earlyMorning' | 'morning' | 'midday' | 'afternoon' | 'evening' | 'night';

export interface Job extends AlwatrDocumentObject {
  detail: JobDetail;
  resultList: Array<JobResult>;
}

export interface JobDetail {
  origin: string;
  dest: string;
  date: string;
  seatCount: number;
  maxPrice: number | null;
  dayPart: Array<'earlyMorning' | 'morning' | 'midday' | 'afternoon' | 'evening' | 'night'>;
  description: string;
}

export type NewJobDetail = {
  month: number;
  day: number;
} & Omit<JobDetail, 'date'>;

export type JobResult = {
  price: number;
  time: number;
  seatCount: number;
};
