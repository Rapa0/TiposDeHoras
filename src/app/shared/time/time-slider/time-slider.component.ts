import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-time-slider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './time-slider.component.html',
  styleUrls: ['./time-slider.component.css']
})
export class TimeSliderComponent implements OnInit, OnDestroy {
  // Valores iniciales recibidos desde el componente padre (por ejemplo, 0)
  @Input() initialHours = 0;
  @Input() initialMinutes = 0;
  @Input() initialSeconds = 0;
  // Emite la nueva fecha ajustada cada vez que hay un cambio (o se actualiza cada segundo)
  @Output() timeChange = new EventEmitter<Date>();

  // Offsets para horas, minutos y segundos
  offsetHours: number = 0;
  offsetMinutes: number = 0;
  offsetSeconds: number = 0;

  // Hora local
  private now: Date = new Date();
  private sub!: Subscription;

  // Cadenas para mostrar la hora local y ajustada en formato HH:MM:SS
  get localStr(): string {
    return this.formatTime(this.now);
  }
  get adjStr(): string {
    return this.formatTime(this.calcAdjusted());
  }

  ngOnInit(): void {
    this.offsetHours = this.initialHours;
    this.offsetMinutes = this.initialMinutes;
    this.offsetSeconds = this.initialSeconds;
    this.emit();
    // Actualiza la hora cada segundo
    this.sub = interval(1000).subscribe(() => {
      this.now = new Date();
      this.emit();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private calcAdjusted(): Date {
    const d = new Date(this.now);
    d.setHours(d.getHours() + this.offsetHours);
    d.setMinutes(d.getMinutes() + this.offsetMinutes);
    d.setSeconds(d.getSeconds() + this.offsetSeconds);
    return d;
  }

  private emit(): void {
    this.timeChange.emit(this.calcAdjusted());
  }

  private formatTime(d: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }
}