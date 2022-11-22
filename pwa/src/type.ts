export interface Job {
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
