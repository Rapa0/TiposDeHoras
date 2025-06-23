import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSliderComponent } from '../time-slider/time-slider.component';

interface Star {
  x: number;
  y: number;
}

@Component({
  selector: 'app-constellation-clock',
  standalone: true,
  imports: [CommonModule, TimeSliderComponent],
  templateUrl: './constellation-clock.component.html',
  styleUrls: ['./constellation-clock.component.css']
})
export class ConstellationClockComponent implements OnInit, OnDestroy {
  currentTime: Date = new Date();
  private offsetMs = 0;
  private rafId = 0;

  // Dimensiones moduladas para cada cluster
  readonly hoursWidth = 350;
  readonly hoursHeight = 350;
  readonly minutesWidth = 350;
  readonly minutesHeight = 350;
  readonly secondsWidth = 350;
  readonly secondsHeight = 350;

  // Arrays de posiciones para las estrellas
  hoursStars: Star[] = [];
  minutesStars: Star[] = [];
  secondsStars: Star[] = [];

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    this.hoursStars = this.generateStars(24, this.hoursWidth, this.hoursHeight);
    this.minutesStars = this.generateStars(60, this.minutesWidth, this.minutesHeight);
    this.secondsStars = this.generateStars(60, this.secondsWidth, this.secondsHeight);
    this.updateTime();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
  }

  /**
   * Calcula el offset al recibir un Date del slider.
   */
  onTimeChange(adjusted: Date): void {
    this.offsetMs = adjusted.getTime() - Date.now();
  }

  /**
   * Bucle de actualización del tiempo usando requestAnimationFrame.
   */
  private updateTime(): void {
    this.rafId = requestAnimationFrame(() => {
      this.zone.run(() => {
        this.currentTime = new Date(Date.now() + this.offsetMs);
      });
      this.updateTime();
    });
  }

  /**
   * Genera un array de estrellas con posiciones aleatorias dentro de un área dada.
   */
  private generateStars(count: number, maxWidth: number, maxHeight: number): Star[] {
    const stars: Star[] = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * maxWidth,
        y: Math.random() * maxHeight
      });
    }
    return stars;
  }

  // Accesores para obtener la unidad actual de tiempo
  get currentHour(): number {
    return this.currentTime.getHours();
  }
  get currentMinute(): number {
    return this.currentTime.getMinutes();
  }
  get currentSecond(): number {
    return this.currentTime.getSeconds();
  }
}