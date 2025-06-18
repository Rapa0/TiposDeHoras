import { Type } from '@angular/core';
import { DigitalClockComponent } from '../shared/time/digital-clock/digital-clock.component';
import { UniqueClockComponent } from '../shared/time/unique-clock/unique-clock.component';


export const CLOCK_REGISTRY: Record<number, Type<unknown> | undefined> = {
  1: DigitalClockComponent,
  2: UniqueClockComponent,
  // Agrega aquí (4, 5, …, 10) a medida que implementes más relojes.
};