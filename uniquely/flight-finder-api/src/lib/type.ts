import type {AlwatrDocumentObject} from '@alwatr/type';

export type Job = AlwatrDocumentObject & {
  detail: JobDetail;
  resultList: Array<JobResult>;
}

export type JobDetail = Record<string, unknown> & {
  origin: string;
  destination: string;
  date: string;
  seatCount: number;
  maxPrice: number | null;
  description: string;
  minHour: number | null;
  maxHour: number | null;
}

export type JobResult = Record<string, unknown> & {
  price: number;
  time: string;
  seatCount: number;
  airline: string,
  airplane: string,
  flightId: string,
  arrivalTime: string,
}
