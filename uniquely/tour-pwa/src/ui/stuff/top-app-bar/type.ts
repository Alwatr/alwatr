// import type {IconButtonContent} from '../../old/button/icon-button.js';

export interface TopAppBarContent {
  /**
   * @default ```'small'```
   */
  type?: 'center' | 'small' | 'medium' | 'large';

  /**
   * @default ```""```
   */
  headline?: string;

  /**
   * @default ```'loading'```
   */
  headlineKey?: string;

  /**
   * @default ```{icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'}```
   */
  startIcon?: unknown;

  /**
   * @default ```[]```
   */
  endIconList?: Array<unknown>;

  /**
   * @default ```2```
   */
  tinted?: number;

  /**
   * @default ```0```
   */
  elevated?: number;
}
