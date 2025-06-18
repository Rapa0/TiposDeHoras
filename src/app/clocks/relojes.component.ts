import { Component, Type } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CLOCK_REGISTRY } from './clock-registry';


import { DigitalClockComponent } from '../shared/time/digital-clock/digital-clock.component';

@Component({
  selector: 'app-relojes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgComponentOutlet,
    DigitalClockComponent  
  ],
  templateUrl: './relojes.component.html',
  styleUrls: ['./relojes.component.css']
})
export class RelojesComponent {
  ids = Array.from({ length: 10 }, (_, i) => i + 1);
  selected: number | null = null;
  activeClock: Type<unknown> | null = null;

  toggle(id: number) {
    this.selected = this.selected === id ? null : id;
    this.activeClock = this.selected ? CLOCK_REGISTRY[this.selected] ?? null : null;
  }
}