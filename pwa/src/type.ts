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
    readonly 'job-list': void;
  }
}

export interface Job extends Record<string, unknown> {
  _id: string;
  filter: JobFilter;
  resultList: Array<JobResult>;
}

export interface JobFilter extends Record<string, unknown> {
  origin: string;
  dest: string;
  date: string;
  maxPrice: number;
  dayPart: Array<'earlyMorning' | 'morning' | 'midday' | 'afternoon' | 'evening' | 'night'>;
}

export interface JobResult extends Record<string, unknown> {
  price: number;
  time: number;
  seatCount: number;
}

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
