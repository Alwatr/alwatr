import {fetch} from '@alwatr/fetch';

import {config, logger} from './lib/config.js';
import {storage} from './lib/storage.js';

import type {Job, JobDetail, JobResult, SepehrResponse} from './lib/type.js';
import type {FetchOptions} from '@alwatr/fetch';

export async function crawlAllJobs(): Promise<void> {
  logger.logMethod('crawlAllJobs');
  const jobList = await storage.getAll();
  for (const jobId in jobList) {
    if (!Object.prototype.hasOwnProperty.call(jobList, jobId)) continue;
    const job = jobList[jobId];
    const oldResultList = job.resultList;
    const resultList = await crawl(job.detail);
    job.resultList = resultList;
    if (differentObject(resultList, oldResultList)) {
      const message = makeMessage(job);
      try {
        await notify(config.notifier.to, message);
        logger.logOther(`Notified to ${config.notifier.to}!`);
      }
      catch (err) {
        logger.error('crawlAllJobs', 'notify_failed', (err as Error).stack || err);
      }
    }
    await storage.set(job);
  }
}

async function crawl(detail: JobDetail): Promise<Array<JobResult>> {
  logger.logMethodArgs('crawl', detail);
  const fetchOption = makeRequestOption(detail);
  const response = await makeRequest(fetchOption);
  let resultList = await translateResponse(response);
  resultList = extraFilterResult(resultList, detail);
  return resultList;
}

function differentObject(obj1: unknown, obj2: unknown): boolean {
  return JSON.stringify(obj1) !== JSON.stringify(obj2);
}

function makeRequestOption(detail: JobDetail): Partial<FetchOptions> & {url: string} {
  logger.logMethod('makeRequest');
  const fetchOptions: Partial<FetchOptions> & {url: string} = {
    url: 'https://api.sepehr360.ir//fa/FlightAvailability/Api/B2cOnewayFlightApi/Search',
    method: 'POST',
    headers: {
      authority: 'api.sepehr360.ir',
    },
    bodyJson: {
      currencyType: 'IRR',
      sortOrder: 1,
      pageSize: 20,
      pageNumber: 0,
      originAirportIataCode: detail.origin,
      destinationAirportIataCode: detail.dest,
      departureDate: detail.date,
    },
  };

  return fetchOptions;
}

async function makeRequest(option: Partial<FetchOptions> & {url: string}): Promise<Response> {
  const response = await fetch({
    ...option,
    retry: 5,
    timeout: 30_000,
  });
  if (!response.ok) {
    throw new Error('fetch_failed');
  }
  return response;
}

async function translateResponse(response: Response): Promise<Array<JobResult>> {
  logger.logMethod('translateResponse');
  const responseJson = (await response.json()) as SepehrResponse;

  const jobResult: Array<JobResult> = [];
  for (const flightInformation of responseJson.flightHeaderList) {
    jobResult.push({
      price: +(flightInformation.formattedPrice as string).replaceAll(',', ''),
      seatCount: flightInformation.seatCount,
      time: flightInformation.cleanDepartureTime,
    });
  }

  return jobResult;
}

function extraFilterResult(jobResultList: Array<JobResult>, detail: JobDetail): Array<JobResult> {
  logger.logMethod('extraFilterResult');
  let filteredJobResultList: Array<JobResult> = jobResultList;

  if (detail.maxPrice != null) {
    filteredJobResultList = filteredJobResultList.filter((job) => {
      return job.price >= detail.maxPrice;
    });
  }

  filteredJobResultList.filter((job) => {
    return job.seatCount >= detail.seatCount;
  });

  return filteredJobResultList;
}

function makeMessage(job: Job): string {
  logger.logMethod('makeMessage');
  let message = `🛫

  Flight from ${job.detail.origin} to ${job.detail.dest} on the ${job.detail.date}

  Description: ${job.detail.description}
  `;

  job.resultList.forEach((jobResult) => {
    message += '\n\n' + `Price: ${jobResult.price}\nTime: ${jobResult.time}\nSeat Count: ${jobResult.seatCount}`;
  });

  return message;
}

async function notify(to: string, message: string): Promise<void> {
  await fetch({
    url: config.notifier.host,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.notifier.token}`,
    },
    bodyJson: {to, message},
  });
}
