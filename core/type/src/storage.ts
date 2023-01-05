import type {AlwatrServiceResponseSuccessWithMeta} from './service-response.js';

export type AlwatrDocumentObject = {
  id: string;
  meta?: {
    rev: number;
    created: number;
    updated: number;
  };
};

export type AlwatrStorageMeta = {
  formatVersion: number;
  reversion: number;
  lastUpdated: number;
  lastAutoId: number;
};

export type AlwatrDocumentStorage<T extends AlwatrDocumentObject> = Omit<
  AlwatrServiceResponseSuccessWithMeta<Record<string, T>, AlwatrStorageMeta>,
  'statusCode' | 'errorCode'
>;
