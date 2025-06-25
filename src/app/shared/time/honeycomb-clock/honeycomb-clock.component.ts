import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSliderComponent } from '../time-slider/time-slider.component';

@Component({
  selector: 'app-honeycomb-clock',
  standalone: true,
  imports: [CommonModule, TimeSliderComponent],
  templateUrl: './honeycomb-clock.component.html',
  styleUrls: ['./honeycomb-clock.component.css']
})
export class HoneycombClockComponent implements OnInit, OnDestroy {
  currentTime: Date = new Date();
  private offsetMs = 0;
  private rafId = 0;

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    this.updateTime();
  }
  
  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
  }
  
  onTimeChange(adjusted: Date): void {
    this.offsetMs = adjusted.getTime() - Date.now();
  }
  
  private updateTime(): void {
    this.rafId = requestAnimationFrame(() => {
      this.zone.run(() => {
        this.currentTime = new Date(Date.now() + this.offsetMs);
      });
      this.updateTime();
    });
  }

  get hours(): number {
    return this.currentTime.getHours();
  }
  
  get minutes(): number {
    return this.currentTime.getMinutes();
  }
  
  get seconds(): number {
    return this.currentTime.getSeconds();
  }

  get hoursArray(): number[] {
    return Array.from({ length: 24 }, (_, i) => i);
  }
  
  get minutesArray(): number[] {
    return Array.from({ length: 60 }, (_, i) => i);
  }
  
  get secondsArray(): number[] {
    return Array.from({ length: 60 }, (_, i) => i);
  }
}