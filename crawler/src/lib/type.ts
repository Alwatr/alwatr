import type {DocumentObject} from '@alwatr/storage-engine';

export interface AirlineInformation {
  origin: string;
  dest: string;
  date: string;
}

// list airline information
export interface AirlineList extends DocumentObject {
  informationList: Array<AirlineInformation>;
}

// dynamic per flight information
export interface DynamicFlightInformation extends DocumentObject {
  price: number;
  departureTime: string;
  arrivalTime: string;
  seatCount: number;
}

// fixed per airline information + dynamic per flight information
export interface FlightInformation extends DynamicFlightInformation {
  formattedDate: string;
}

export interface TelegramBotConfig extends DocumentObject {
  token: string;
}

export interface TelegramBotMessage extends DocumentObject {
  text: string;
}

export interface TelegramBotAdmin extends DocumentObject {
  chatId: number;
}
