import {fetch} from '@alwatr/fetch';

import {config, logger} from './config.js';
import {cityList} from './lib/city-list.js';
import {storageClient} from './lib/storage.js';

import type {Job, JobDetail, JobResult, SepehrResponse} from './lib/type.js';
import type {FetchOptions} from '@alwatr/fetch';

export async function crawlAllJobs(): Promise<void> {
  logger.logMethod('crawlAllJobs');
  const jobList = (await storageClient.getStorage()).data;
  const jobKeyList = Object.keys(jobList);
  let updated = false;

  for (let i = 0; i < jobKeyList.length; i++) {
    try {
      const job = jobList[jobKeyList[i]];
      const oldResultList = job.resultList;
      const resultList = await crawl(job.detail);
      job.resultList = resultList;
      if (differentObject(job.resultList, oldResultList)) {
        const message = makeMessage(job);
        await notify(config.notifier.to, message);
        logger.logOther(`Notified to ${config.notifier.to}!`);
        await storageClient.set(job);
        updated = true;
      }
    }
    catch (err) {
      logger.error('crawlAllJobs', 'crawling_failed', err);
    }
  }
  // for updating meta
  if (updated === false) await storageClient.set(jobList[jobKeyList[jobKeyList.length - 1]]);
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
      destinationAirportIataCode: detail.destination,
      departureDate: detail.date,
      sort: 1,
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
      airline: flightInformation.airlineName,
      airplane: flightInformation.airplaneName,
      arrivalTime: flightInformation.arrivalTime,
      flightId: flightInformation.cleanFlightNumber,
    });
  }

  jobResult.sort((a, b) => {
    const compare = a.price - b.price;
    if (compare != 0) {
      return compare;
    }
    else if (a.flightId > b.flightId) {
      return 1;
    }
    else if (a.flightId < b.flightId) {
      return -1;
    }
    else {
      return 0;
    }
  });

  return jobResult;
}

function extraFilterResult(jobResultList: Array<JobResult>, detail: JobDetail): Array<JobResult> {
  logger.logMethod('extraFilterResult');
  let filteredJobResultList: Array<JobResult> = jobResultList;

  if (detail.maxPrice != null) {
    const maxPrice = detail.maxPrice;
    filteredJobResultList = filteredJobResultList.filter((result) => {
      return result.price <= maxPrice;
    });
  }

  filteredJobResultList = filteredJobResultList.filter((result) => {
    return result.seatCount >= detail.seatCount;
  });

  if (detail.minHour != null && detail.maxHour != null) {
    const minHour = detail.minHour;
    const maxHour = detail.maxHour;
    filteredJobResultList = filteredJobResultList.filter((result) => {
      const resultTime = +result.time.trim().split(':')[0];
      return resultTime >= minHour && resultTime <= maxHour;
    });
  }

  return filteredJobResultList;
}

function makeMessage(job: Job): string {
  logger.logMethod('makeMessage');

  // prettier-ignore
  const resultListStr = job.resultList.length === 0 ? 'هیچ پروازی یافت نشد!'
  : job.resultList.map((jobResult) => `
    💰${jobResult.price.toLocaleString('en-US')} ⏰${jobResult.time} 💺${jobResult.seatCount} 🛫${jobResult.flightId}
  `).join('');

  return `
    تغییرات جدید در جستجوی ${job.id}:

    ${job.detail.description}

    ${cityList[job.detail.origin]} ✈️ ${cityList[job.detail.destination]}

    تاریخ: ${job.detail.date}
    حداکثر قیمت: ${job.detail.maxPrice ? job.detail.maxPrice.toLocaleString('en-US') : 'ندارد'}
    تعداد صندلی: ${job.detail.seatCount}
    ${job.detail.minHour && job.detail.minHour ? `از ساعت ${job.detail.minHour} تا ساعت ${job.detail.maxHour}` : '' }

    ${resultListStr}
  `.replaceAll('    ', '');
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
