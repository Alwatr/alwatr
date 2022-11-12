import {logger} from './config.js';

import type {AirlineInformation, FlightInformation, DynamicFlightInformation} from './type';

/**
 * Fetch airline flight information
 * then extract the flights of the airline from the request response
 * and return flight information list
 */
export async function getAirlineFlightListInformation(
    airlineInformation: AirlineInformation,
): Promise<Array<FlightInformation>> {
  // fetch airline flight list information
  let responseJson;
  try {
    const requestResponse = await fetchAirlineFullInformation(airlineInformation);
    if (!requestResponse.ok) {
      logger.error('getAirlineFlightListInformation', 'FETCH_DATA_FAILED', requestResponse.statusText);
      return [];
    }

    responseJson = await requestResponse.json();
  } catch (err) {
    logger.error('getAirlineFlightListInformation', 'FETCH_DATA_FAILED', (err as Error).message);
    return [];
  }

  // check airline exist
  // if not exists, remove from airline list
  if (responseJson.ayaMasiriYaftShod !== true) {
    // remove job!
    return [];
  }

  try {
    const parsedData = parseAirlineFullInformation(responseJson);
    return parsedData;
  } catch (err) {
    logger.error('getFlightData', 'PARSE_DATA_FAILED', (err as Error).stack);
    return [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fetchAirlineFullInformation(data: AirlineInformation): Promise<Response> {
  return fetch('https://api.sepehr360.ir//fa/FlightAvailability/Api/B2cOnewayFlightApi/Search', {
    method: 'POST',
    headers: {
      'authority': 'api.sepehr360.ir',
      'content-type': 'application/json',
    },

    body: `{
      currencyType: 'IRR',
      sortOrder: 1,
      pageSize: 20,
      pageNumber: 0,
      originAirportIataCode: '${data.origin}',
      destinationAirportIataCode: '${data.dest}',
      departureDate: '${data.date}',
    }`,
  });
}

/**
 * extract flight information list from airline json response
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseAirlineFullInformation(airlineFullInformation: any): Array<FlightInformation> {
  const flightHeaderList = airlineFullInformation.flightHeaderList; // dynamic flight information

  const flightHeaderInformationList: Array<DynamicFlightInformation> = [];

  // parse flight information and add to list
  for (const flightHeader of flightHeaderList) {
    try {
      flightHeaderInformationList.push(parseFlightHeader(flightHeader));
    } catch (err) {
      logger.error('parseFetchData', 'PARSE_DATA_FAILED', (err as Error).stack);
    }
  }

  // add fixed per airline information to dynamic per flight information and return it
  return flightHeaderInformationList.map((flight): FlightInformation => {
    return {
      ...flight,
      formattedDate: airlineFullInformation.formattedLocalDate,
    };
  });
}

/**
 * Parse Information about each flight
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseFlightHeader(flightHeader: any): DynamicFlightInformation {
  return {
    _id: flightHeader.cleanFlightNumber,
    price: +(flightHeader.formattedPrice as string).replace(/,/g, ''), // convert formatted price to number
    cabinType: flightHeader.cabinType,
    airlineIataCode: flightHeader.airlineIataCode,
    arrivalTime: flightHeader.arrivalTime,
    departureTime: flightHeader.cleanDepartureTime,
    seatCount: flightHeader.seatCount,
    _updatedBy: 'bot',
  };
}
