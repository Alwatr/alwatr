import type {AlwatrDocumentObject} from '@alwatr/storage-client';

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

export interface JobResult extends Record<string, unknown> {
  price: number;
  time: number;
  seatCount: number;
}
