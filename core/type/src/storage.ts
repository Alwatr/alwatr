import {AlwatrServiceResponseSuccessWithMeta} from './service-response.js';
import {StringifyableRecord} from './type-helper.js';

export interface AlwatrDocumentObject extends StringifyableRecord {
  id: string;
  meta?: {
    rev: number;
    created: number;
    updated: number;
  };
}

export interface AlwatrStorageMeta extends StringifyableRecord {
  id: string;
  formatVersion: number;
  reversion: number;
  lastUpdated: number;
  lastAutoId: number;
}

// export type AlwatrDocumentStorage<T extends AlwatrDocumentObject> = Omit<
//   AlwatrServiceResponseSuccessWithMeta<Record<string, T>, AlwatrStorageMeta>,
//   'statusCode' | 'errorCode'
// >;

export type AlwatrDocumentStorage<T extends AlwatrDocumentObject = AlwatrDocumentObject> =
  AlwatrServiceResponseSuccessWithMeta<Record<string, T>, AlwatrStorageMeta>;
