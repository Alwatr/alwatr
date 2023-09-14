import type {Stringifyable, StringifyableRecord} from './type-helper.js';

export interface ClickSignalType<T extends Stringifyable = Stringifyable> extends StringifyableRecord {
  readonly x: number;
  readonly y: number;
  readonly altKey: boolean;
  readonly ctrlKey: boolean;
  readonly metaKey: boolean;
  detail: T;
}
