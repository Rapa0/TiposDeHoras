import { Type } from '@angular/core';
import { DigitalClockComponent } from '../shared/time/digital-clock/digital-clock.component';
import { UniqueClockComponent } from '../shared/time/unique-clock/unique-clock.component';
import { RippleClockComponent } from '../shared/time/ripple-clock/ripple-clock.component';
import { SegmentClockComponent } from '../shared/time/segment-clock/segment-clock.component';
import { ConstellationClockComponent } from '../shared/time/constellation-clock/constellation-clock.component';

export const CLOCK_REGISTRY: Record<number, Type<unknown> | undefined> = {
  1: DigitalClockComponent,
  2: UniqueClockComponent,
  3: RippleClockComponent,
  4: SegmentClockComponent,
  5: ConstellationClockComponent,
  // Otros relojes (6, 7, …) conforme a nuevas ideas.
};