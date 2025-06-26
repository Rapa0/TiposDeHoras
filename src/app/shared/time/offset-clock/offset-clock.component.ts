import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSliderComponent } from '../time-slider/time-slider.component';

@Component({
  selector: 'app-offset-clock',
  standalone: true,
  imports: [CommonModule, TimeSliderComponent],
  templateUrl: './offset-clock.component.html',
  styleUrls: ['./offset-clock.component.css']
})
export class OffsetClockComponent implements OnInit, OnDestroy {
  currentTime = new Date();
  private offsetMs = 0;
  private raf = 0;

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.loop();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.raf);
  }

  onTimeChange(adjusted: Date) {
    // Offset relativo: la diferencia entre la hora ajustada y la real
    this.offsetMs = adjusted.getTime() - Date.now();
  }

  private loop() {
    this.raf = requestAnimationFrame(() => {
      // Actualiza currentTime usando el offset
      this.zone.run(() => {
        this.currentTime = new Date(Date.now() + this.offsetMs);
      });
      this.loop();
    });
  }

  // Cálculo de ángulos:
  get secondDeg(): number {
    const s = this.currentTime.getSeconds() + this.currentTime.getMilliseconds()/1000;
    return s * 6;              // 360°/60s = 6° por segundo
  }
  get minuteDeg(): number {
    const m = this.currentTime.getMinutes() + this.currentTime.getSeconds()/60;
    return m * 6;              // 360°/60m = 6° por minuto
  }
  get hourDeg(): number {
    const h = (this.currentTime.getHours() % 12) + this.currentTime.getMinutes()/60;
    return h * 30;             // 360°/12h = 30° por hora
  }
}