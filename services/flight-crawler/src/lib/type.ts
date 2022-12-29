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

export type SepehrResponse = Record<string, unknown> & {
  flightHeaderList: Array<SepehrFlightInformation>;
}

type SepehrFlightInformation = Record<string, unknown> & {
  airlineName: string,
  airlineIataCode: string,
  airplaneName: string,
  cleanFlightNumber: string,
  cleanDepartureTime: string,
  arrivalTime: string,
  originName: string,
  destinationName: string,
  cabinType: string,
  formattedPrice: string,
  durationTotalMinutes: number,
  seatCount: number,
}
