import {untilNextFrame} from '@alwatr/util';

import type {SignalMixinInterface} from './signal.js';
import type {Constructor} from '@alwatr/type';

export declare class ScheduleUpdateToFrameMixinInterface extends SignalMixinInterface {}

export function ScheduleUpdateToFrameMixin<T extends Constructor<SignalMixinInterface>>(
    superClass: T,
): Constructor<ScheduleUpdateToFrameMixinInterface> & T {
  class ScheduleUpdateToFrameMixinClass extends superClass {
    protected override async scheduleUpdate(): Promise<void> {
      await untilNextFrame();
      super.scheduleUpdate();
    }
  }
  return ScheduleUpdateToFrameMixinClass as unknown as Constructor<ScheduleUpdateToFrameMixinInterface> & T;
}
