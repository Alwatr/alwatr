import type {DocumentObject} from '@alwatr/storage-engine';

export type Job = {
  origin: string;
  dest: string;
  date: string;
  flightList: Record<string, FlightInformation>;
};

export interface FlightInformation extends DocumentObject {
  price: number;
  departureTime: string;
  arrivalTime: string;
  seatCount: number;
  formattedDate: string;
}
