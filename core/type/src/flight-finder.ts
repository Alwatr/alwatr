import type {AlwatrDocumentObject} from './storage.js';
import type {StringifyableRecord} from './type-helper.js';

export interface Job extends AlwatrDocumentObject {
  detail: JobDetail;
  resultList: JobResult[];
}

export interface JobDetail extends StringifyableRecord {
  origin: string;
  destination: string;
  date: string;
  seatCount: number;
  maxPrice: number | null;
  description: string;
  minHour: number | null;
  maxHour: number | null;
}

export interface JobResult extends StringifyableRecord {
  price: number;
  time: string;
  seatCount: number;
  airline: string;
  airplane: string;
  flightId: string;
  arrivalTime: string;
}
