import type {AlwatrDocumentObject} from '@alwatr/storage-client';

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

export interface SepehrResponse extends Record<string, unknown> {
  flightHeaderList: Array<SepehrFlightInformation>;
}

interface SepehrFlightInformation extends Record<string, unknown> {
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
