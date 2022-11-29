import type {AlwatrDocumentObject} from '@alwatr/fetch';
import type {ToastOptions} from '@ionic/core';

declare global {
  // eslint-disable-next-line no-var
  var appConfig: Record<string, string | undefined> | undefined;

  interface AlwatrSignals {
    readonly 'job-add': Pick<Job, 'detail'>;
    readonly 'job-delete': string;
    readonly 'job-list': Array<Job>;
    readonly toast: Partial<ToastOptions> & {message: string};
  }
  interface AlwatrRequestSignals {
    readonly 'job-list': Record<string, never>;
  }
}

export type dayParts = 'earlyMorning' | 'morning' | 'midday' | 'afternoon' | 'evening' | 'night';

export interface Job extends AlwatrDocumentObject {
  detail: JobDetail;
  resultList: Array<JobResult>;
}

export interface JobDetail extends Record<string, unknown> {
  origin: string;
  dest: string;
  date: string;
  seatCount: number;
  maxPrice: number | null;
  dayPart: Array<'earlyMorning' | 'morning' | 'midday' | 'afternoon' | 'evening' | 'night'>;
  description: string | null;
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
