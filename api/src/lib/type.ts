import type {DocumentObject} from '@alwatr/storage-engine';

export interface Job extends DocumentObject {
  origin: string;
  dest: string;
  date: string;
  minPrice: number;
  dayPart: Array<'earlyMorning' | 'morning' | 'midday' | 'afternoon' | 'evening' | 'night'>;
  flightList: Array<FlightInformation>;
}

export interface FlightInformation {
  price: number;
  departureTime: number;
  seatCount: number;
}
