import type {StringifyableRecord} from '@alwatr/type';

interface SepehrFlightInformation extends StringifyableRecord {
  airlineName: string;
  airlineIataCode: string;
  airplaneName: string;
  cleanFlightNumber: string;
  cleanDepartureTime: string;
  arrivalTime: string;
  originName: string;
  destinationName: string;
  cabinType: string;
  formattedPrice: string;
  durationTotalMinutes: number;
  seatCount: number;
}

export interface SepehrResponse extends StringifyableRecord {
  flightHeaderList: Array<SepehrFlightInformation>;
}

