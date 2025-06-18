import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSliderComponent } from '../time-slider/time-slider.component';

@Component({
  selector: 'app-digital-clock',
  standalone: true,
  imports: [CommonModule, TimeSliderComponent],
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.css']
})
export class DigitalClockComponent {
  // Offsets iniciales (se pueden pasar desde el padre)
  @Input() initialHours = 0;
  @Input() initialMinutes = 0;
  @Input() initialSeconds = 0;

  display = '--:--:--';

  fmt(d: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }
}