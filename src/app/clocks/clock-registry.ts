import { Type } from '@angular/core';
import { DigitalClockComponent } from '../shared/time/digital-clock/digital-clock.component';
import { UniqueClockComponent } from '../shared/time/unique-clock/unique-clock.component';
import { RippleClockComponent } from '../shared/time/ripple-clock/ripple-clock.component';
import { SegmentClockComponent } from '../shared/time/segment-clock/segment-clock.component';
import { ConstellationClockComponent } from '../shared/time/constellation-clock/constellation-clock.component';
import { HourglassClockComponent } from '../shared/time/hourglass-clock/hourglass-clock.component';
import { HoneycombClockComponent } from '../shared/time/honeycomb-clock/honeycomb-clock.component';
import { WordClockComponent } from '../shared/time/word-clock/word-clock.component';
import { TreeRingClockComponent } from '../shared/time/tree-ring-clock/tree-ring-clock.component';
import { OffsetClockComponent }        from '../shared/time/offset-clock/offset-clock.component';



export const CLOCK_REGISTRY: Record<number, Type<unknown> | undefined> = {
  1: DigitalClockComponent,
  2: UniqueClockComponent,
  3: RippleClockComponent,
  4: SegmentClockComponent,
  5: ConstellationClockComponent,
  6: HourglassClockComponent,
  7: HoneycombClockComponent,
  8: WordClockComponent,
  9: TreeRingClockComponent,
  10: OffsetClockComponent

};