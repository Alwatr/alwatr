export interface AirlineInterface {
  origin: string;
  destination: string;
  date: string;
  time: string;
  maxPrice: number;
  foundFlights?: number;
  price?: number;
}
