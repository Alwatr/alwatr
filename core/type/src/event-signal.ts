import type {Stringifyable} from './type-helper.js';

export type ClickSignalType<T extends Stringifyable = Stringifyable> = {
  readonly x: number;
  readonly y: number;
  readonly altKey: boolean;
  readonly ctrlKey: boolean;
  readonly metaKey: boolean;
  detail: T;
};
