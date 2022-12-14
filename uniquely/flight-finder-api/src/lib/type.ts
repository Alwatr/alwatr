import type {AlwatrDocumentObject} from '@alwatr/storage-client';

export interface Job extends AlwatrDocumentObject {
  detail: JobDetail;
  resultList: Array<JobResult>;
}

export type dayParts = 'earlyMorning' | 'morning' | 'midday' | 'afternoon' | 'evening' | 'night';

export interface JobDetail extends Record<string, unknown> {
  origin: string;
  destination: string;
  date: string;
  seatCount: number;
  maxPrice: number | null;
  dayPart: Array<dayParts>;
  description: string;
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
