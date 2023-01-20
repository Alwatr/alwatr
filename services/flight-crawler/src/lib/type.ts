export type SepehrResponse = Record<string, unknown> & {
  flightHeaderList: Array<SepehrFlightInformation>;
};

type SepehrFlightInformation = Record<string, unknown> & {
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
};
