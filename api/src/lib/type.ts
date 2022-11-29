import type {AlwatrDocumentObject} from '@alwatr/storage-client';

export interface Job extends AlwatrDocumentObject {
  filter: JobFilter;
  description: string | null;
  resultList: Array<JobResult>;
}

export interface JobFilter extends Record<string, unknown> {
  origin: string;
  dest: string;
  date: string;
  seatCount: number;
  maxPrice: number | null;
  dayPart: Array<'earlyMorning' | 'morning' | 'midday' | 'afternoon' | 'evening' | 'night'> | 'all';
}

export interface JobResult extends Record<string, unknown> {
  price: number;
  time: number;
  seatCount: number;
}
