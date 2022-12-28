import type {AlwatrDocumentObject} from '@alwatr/type';

export interface Job extends AlwatrDocumentObject {
  detail: JobDetail;
  resultList: Array<JobResult>;
}

export interface JobDetail extends Record<string, unknown> {
  origin: string;
  destination: string;
  date: string;
  seatCount: number;
  maxPrice: number | null;
  description: string;
  minHour: number | null;
  maxHour: number | null;
}

export interface JobResult extends Record<string, unknown> {
  price: number;
  time: string;
  seatCount: number;
  airline: string,
  airplane: string,
  flightId: string,
  arrivalTime: string,
}
