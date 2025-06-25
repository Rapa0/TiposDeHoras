import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSliderComponent } from '../time-slider/time-slider.component';

@Component({
  selector: 'app-tree-ring-clock',
  standalone: true,
  imports: [CommonModule, TimeSliderComponent],
  templateUrl: './tree-ring-clock.component.html',
  styleUrls: ['./tree-ring-clock.component.css']
})
export class TreeRingClockComponent implements OnInit, OnDestroy {
  readonly Math = Math;

  currentTime = new Date();
  private offsetMs = 0;
  private rafId = 0;

  readonly size = 300;
  readonly cx = 150;
  readonly cy = 150;
  readonly radii = [50, 90, 130]; 

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    this.tick();
  }
  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
  }
  onTimeChange(adjusted: Date): void {
    this.offsetMs = adjusted.getTime() - Date.now();
  }

  private tick(): void {
    this.rafId = requestAnimationFrame(() => {
      this.zone.run(() => {
        this.currentTime = new Date(Date.now() + this.offsetMs);
      });
      this.tick();
    });
  }

  get hourFrac(): number {
    const h = this.currentTime.getHours();       
    const m = this.currentTime.getMinutes();
    return (h + m / 60) / 24;
  }

  get minuteFrac(): number {
    const m = this.currentTime.getMinutes();
    const s = this.currentTime.getSeconds();
    return (m + s / 60) / 60;
  }

  get secondFrac(): number {
    const s = this.currentTime.getSeconds();
    const ms = this.currentTime.getMilliseconds();
    return (s + ms / 1000) / 60;
  }

  dashOffset(radius: number, frac: number): number {
    const circumference = 2 * Math.PI * radius;
    return circumference * (1 - frac);
  }

  get secondMarker(): { x: number; y: number } {
    const angle = this.secondFrac * 2 * Math.PI - Math.PI / 2;
    const r = this.radii[2];
    return { x: this.cx + r * Math.cos(angle), y: this.cy + r * Math.sin(angle) };
  }
}