import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSliderComponent } from '../time-slider/time-slider.component';

@Component({
  selector: 'app-unique-clock',
  standalone: true,
  imports: [CommonModule, TimeSliderComponent],
  templateUrl: './unique-clock.component.html',
  styleUrls: ['./unique-clock.component.css']
})
export class UniqueClockComponent {
  // Fecha que llega del slider 
  currentTime: Date = new Date();

  // Porcentajes de llenado
  hourPercent = 0;
  minutePercent = 0;
  secondPercent = 0;

  // Cuando el slider emite un nuevo Date, recalculamos los porcentajes
  onTimeChange(adjusted: Date) {
    this.currentTime = adjusted;
    const h = adjusted.getHours();
    const m = adjusted.getMinutes();
    const s = adjusted.getSeconds();
    this.hourPercent   = (h / 24) * 100;
    this.minutePercent = (m / 60) * 100;
    this.secondPercent = (s / 60) * 100;
  }
}