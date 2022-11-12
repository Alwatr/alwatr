import {getAirlineFlightListInformation} from './airline-information.js';
import {logger} from './config.js';
import {airlineStorage, flightStorage} from './storage.js.js';

import type {AirlineInformation} from './type';

export function isFlightNew(flightNumber: string): boolean {
  return !flightStorage.has(flightNumber);
}

export function review(): void {
  logger.logMethod('checkAirlineFlightList');

  const currentAirlineList = airlineStorage.get('currentAirline')?.informationList || [];
  logger.logProperty('currentAirline', currentAirlineList);

  currentAirlineList.forEach(async (flightGeneralInfo) => {
    await reviewAirline(flightGeneralInfo);
  });
}

export async function reviewAirline(airlineInformation: AirlineInformation, _notify = true): Promise<void> {
  logger.logMethodArgs('reviewAirline', {airlineInformation: airlineInformation});

  const flightInformationList = await getAirlineFlightListInformation(airlineInformation);

  // check for new flight
  // notify if found
  for (const flightData of flightInformationList) {
    if (isFlightNew(flightData._id)) {
      logger.logProperty('newFlight', flightData);
      // if (_notify) await notifyNewFlight(flightData);
    }

    // save new flight,
    // and update old flight
    flightStorage.set(flightData);
  }
}
