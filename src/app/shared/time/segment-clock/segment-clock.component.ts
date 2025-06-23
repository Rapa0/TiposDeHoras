import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSliderComponent } from '../time-slider/time-slider.component';

@Component({
  selector: 'app-segment-clock',
  standalone: true,
  imports: [CommonModule, TimeSliderComponent],
  templateUrl: './segment-clock.component.html',
  styleUrls: ['./segment-clock.component.css']
})
export class SegmentClockComponent implements OnInit, OnDestroy {
  private offsetMs = 0;
  currentTime = new Date();
  private raf = 0;

  constructor(private zone: NgZone) {}

  ngOnInit() { this.loop(); }
  ngOnDestroy() { cancelAnimationFrame(this.raf); }

  onTimeChange(adjusted: Date) {
    this.offsetMs = adjusted.getTime() - Date.now();
  }

  private loop() {
    this.raf = requestAnimationFrame(() => {
      this.zone.run(() => {
        this.currentTime = new Date(Date.now() + this.offsetMs);
      });
      this.loop();
    });
  }

  get hours()   { return this.currentTime.getHours(); }
  get minutes() { return this.currentTime.getMinutes(); }
  get seconds() { return this.currentTime.getSeconds(); }

  // Arrays para ngFor
  get H24() { return Array.from({ length: 24 }, (_, i) => i); }
  get M60() { return Array.from({ length: 60 }, (_, i) => i); }
  get S60() { return Array.from({ length: 60 }, (_, i) => i); }
}