export type JSON = Record<string, unknown>;

export interface DocumentObject {
  _id: string;
  _rev?: number;
  _created?: number;
  _updated?: number;
}

export type DocumentListStorage<DocType extends DocumentObject> =
  Record<string, DocType | undefined> & {_last?: string};
