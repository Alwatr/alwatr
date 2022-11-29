import type {ToastOptions} from '@ionic/core';

declare global {
  // eslint-disable-next-line no-var
  var appConfig: Record<string, string | undefined> | undefined;

  interface AlwatrSignals {
    readonly 'job-add': Pick<Job, 'filter'>;
    readonly 'job-delete': string;
    readonly 'job-list': Array<Job>;
    readonly toast: Partial<ToastOptions> & {message: string};
  }
  interface AlwatrRequestSignals {
    readonly 'job-list': Record<string, never>;
  }
}

export type dayParts = 'earlyMorning' | 'morning' | 'midday' | 'afternoon' | 'evening' | 'night';

export interface Job extends Record<string, unknown> {
  id: string;
  filter: JobFilter;
  resultList: Array<JobResult>;
}

export type JobFilter = {
  origin: string;
  dest: string;
  date: string;
  description?: string;
  seatCount: number;
  maxPrice: number;
  dayPart: Array<dayParts>;
};

export type NewJobFilter = {
  month: number;
  day: number;
} & Omit<JobFilter, 'date'>;

export type JobResult = {
  price: number;
  time: number;
  seatCount: number;
};

// TODO: Transfer this type in a package
type ServerResponseFailed = {
  ok: false;
  statusCode: number;
  errorCode: string;
  data?: Record<string, unknown>;
};

type ServerResponseSuccess<DataType> = {
  ok: true;
  statusCode?: number;
  data: DataType;
};

export type ServerResponse<DataType extends Record<string, unknown>> =
  | ServerResponseSuccess<DataType>
  | ServerResponseFailed;
