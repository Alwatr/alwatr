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

// TODO: Transfer this type in a package
type ServerResponseFailed = {
  ok: false;
  statusCode: number;
  errorCode: string;
  data?: Record<string, unknown>;
  _id: number;
};

type ServerResponseSuccess<DataType> = {
  ok: true;
  statusCode?: number;
  data: DataType;
};

export type ServerResponse<DataType extends Record<string, unknown>> =
  | ServerResponseSuccess<DataType>
  | ServerResponseFailed;
