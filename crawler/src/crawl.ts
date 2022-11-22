import {logger} from './lib/config.js';
import {storage} from './lib/storage.js';
import {fetch} from '@alwatr/fetch';
import type {JobFilter, JobResult } from './lib/type.js';

export async function crawlAllJobs() {
  logger.logMethod('crawlAllJobs');
  const jobList = await storage.getAll();
  for (const jobId in jobList) {
    const job = jobList[jobId];
    const oldResultList = job.resultList;
    const resultList = await crawl(job.filter);
    job.resultList = resultList;
    if (differentObject(resultList, oldResultList)) {
      await notify(config.notify.to, makeMessage(resultList));
    }
    await storage.set(job);
  }
}

async function crawl(filter: JobFilter): Promise<Array<JobResult>> {
  logger.logMethodArgs('crawl', filter);
  const request = makeRequest(); // make fetch options
  const response = fetch({
    request,
    // retry, ...
  });
  let resultList = translateResponse(response);
  resultList = extraFilterResult(resultList);
  // TODO: ...
  return [];
}

function differentObject(obj1: unknown, obj2: unknown): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
