import type {AlwatrDocumentObject, AlwatrDocumentStorage} from '@alwatr/type';
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

export interface Job extends AlwatrDocumentObject {
  detail: JobDetail;
  resultList: Array<JobResult>;
}

export interface JobDetail {
  origin: string;
  destination: string;
  date: string;
  seatCount: number;
  maxPrice: number | null;
  minHour: number | null;
  maxHour: number | null;
  description: string;
}

export type NewJobDetail = {
  month: number;
  day: number;
} & Omit<JobDetail, 'date'>;

export type JobResult = {
  price: number;
  time: string;
  seatCount: number;
  airline: string;
  airplane: string;
  flightId: string;
  arrivalTime: string;
};
