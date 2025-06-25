import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSliderComponent } from '../time-slider/time-slider.component';

@Component({
  selector: 'app-hourglass-clock',
  standalone: true,
  imports: [CommonModule, TimeSliderComponent],
  templateUrl: './hourglass-clock.component.html',
  styleUrls: ['./hourglass-clock.component.css']
})
export class HourglassClockComponent implements OnInit, OnDestroy {
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

  /**
   * Actualiza el tiempo de forma continua usando requestAnimationFrame.
   */
  private updateTime(): void {
    this.rafId = requestAnimationFrame(() => {
      this.zone.run(() => {
        this.currentTime = new Date(Date.now() + this.offsetMs);
      });
      this.updateTime();
    });
  }

  // Porcentaje transcurrido para cada unidad:
  get hourPct(): number {
    return this.currentTime.getHours() / 24;
  }
  get minutePct(): number {
    return this.currentTime.getMinutes() / 60;
  }
  get secondPct(): number {
    return (this.currentTime.getSeconds() + this.currentTime.getMilliseconds() / 1000) / 60;
  }

  getTopFillPoints(pct: number): string {
    const fillY = 55 * (1 - pct);
    return `0,0 60,0 30,${fillY}`;
  }

  getBottomFillPoints(pct: number): string {
    const fillY = 110 - 55 * pct;
    return `0,110 60,110 30,${fillY}`;
  }
}