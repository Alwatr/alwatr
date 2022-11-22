import {fetch} from '@alwatr/fetch';

import {config, logger} from './lib/config.js';
import {storage} from './lib/storage.js';

import type {JobFilter, JobResult} from './lib/type.js';
import type {FetchOptions} from '@alwatr/fetch';


export async function crawlAllJobs(): Promise<void> {
  logger.logMethod('crawlAllJobs');
  const jobList = await storage.getAll();
  // eslint-disable-next-line guard-for-in
  for (const jobId in jobList) {
    const job = jobList[jobId];
    const oldResultList = job.resultList;
    const resultList = await crawl(job.filter);
    job.resultList = resultList;
    if (differentObject(resultList, oldResultList)) {
      const message = makeMessage(resultList);
      await notify(config.notifier.to, message);
    }
    await storage.set(job);
  }
}

async function crawl(filter: JobFilter): Promise<Array<JobResult>> {
  logger.logMethodArgs('crawl', filter);
  const fetchOption = makeRequestOption(filter); // make fetch options
  const response = await makeRequest(fetchOption);
  if (response === null) throw new Error('make_request_failed');
  let resultList = await translateResponse(response);
  resultList = extraFilterResult(resultList);
  return resultList;
}

function differentObject(obj1: unknown, obj2: unknown): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function makeRequestOption(filter: JobFilter): Partial<FetchOptions> & {url: string} {
  logger.logMethod('makeRequest');
  const fetchOptions: Partial<FetchOptions> & {url: string} = {
    url: 'https://api.sepehr360.ir//fa/FlightAvailability/Api/B2cOnewayFlightApi/Search',
    method: 'POST',
    headers: {
      'authority': 'api.sepehr360.ir',
    },
    bodyJson: {
      currencyType: 'IRR',
      sortOrder: 1,
      pageSize: 20,
      pageNumber: 0,
      originAirportIataCode: filter.origin,
      destinationAirportIataCode: filter.dest,
      departureDate: filter.date,
    },
  };

  return fetchOptions;
}

async function makeRequest(option: Partial<FetchOptions> & {url: string}): Promise<Response | null> {
  const response = await fetch({
    ...option,
    retry: 5,
    timeout: 30_000,
  });
  if (!response.ok) {
    logger.error('makeRequest', 'fetch_data_failed', response.statusText);
    return null;
  }
  return response;
}

async function translateResponse(response: Response): Promise<Array<JobResult>> {
  logger.logMethod('translateResponse');
  const responseJson = await response.json();

  const jobResult: Array<JobResult> = [];
  for (const flightInformation of responseJson.flightHeaderList) {
    jobResult.push({
      price: +(flightInformation.formattedPrice as string).replace(/,/g, ''),
      seatCount: flightInformation.seatCount,
      time: flightInformation.cleanDepartureTime,
    });
  }

  return jobResult;
}

function extraFilterResult(jobResultList: Array<JobResult>): Array<JobResult> {
  logger.logMethod('extraFilterResult');
  return jobResultList;
}

function makeMessage(_jobResultList: Array<JobResult>): string {
  logger.logMethod('makeMessage');
  return '';
}

async function notify(_to: string, _message: string): Promise<void> {
  logger.logMethod('notify');
}
