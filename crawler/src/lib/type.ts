import type {DocumentObject} from '@alwatr/storage-client';

export interface Job extends DocumentObject {
  filter: JobFilter;
  resultList: Array<JobResult>;
}

export interface JobFilter extends Record<string, unknown> {
  origin: string;
  dest: string;
  date: string;
  minPrice: number;
  dayPart: Array<'earlyMorning' | 'morning' | 'midday' | 'afternoon' | 'evening' | 'night'>;
}

export interface JobResult extends Record<string, unknown> {
  price: number;
  time: number;
  seatCount: number;
}

export interface SepehrResponse extends Record<string, unknown> {
  flightHeaderList: Array<SepehrFlightInformation>;
}

interface SepehrFlightInformation extends Record<string, unknown> {
  formattedPrice: string;
  seatCount: number;
  cleanDepartureTime: number;
}
