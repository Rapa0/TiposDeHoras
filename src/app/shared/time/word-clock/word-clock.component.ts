import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSliderComponent } from '../time-slider/time-slider.component';

@Component({
  selector: 'app-word-clock',
  standalone: true,
  imports: [CommonModule, TimeSliderComponent],
  templateUrl: './word-clock.component.html',
  styleUrls: ['./word-clock.component.css']
})
export class WordClockComponent implements OnInit, OnDestroy {
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

  get timeWords(): string {
    const phraseHM = this.getHourMinutePhrase();
    const sec = this.currentTime.getSeconds();
    const secWord = this.numberToWordExact(sec);
    return `${phraseHM} con ${secWord} segundos`;
  }

  private getHourMinutePhrase(): string {
    const h24 = this.currentTime.getHours();
    const m = this.currentTime.getMinutes();
    const hour12 = (h24 % 12) || 12;
    const hourWord = this.numberToWordExact(hour12);

    if (m === 0) {
      return hour12 === 1
        ? 'Es la una en punto'
        : `Son las ${hourWord} en punto`;
    }
    if (m === 15) {
      return hour12 === 1
        ? 'Es la una y cuarto'
        : `Son las ${hourWord} y cuarto`;
    }
    if (m === 30) {
      return hour12 === 1
        ? 'Es la una y media'
        : `Son las ${hourWord} y media`;
    }
    if (m === 45) {
      const nextHour = (hour12 % 12) + 1;
      const nextWord = this.numberToWordExact(nextHour);
      return nextHour === 1
        ? 'Un cuarto para la una'
        : `Un cuarto para las ${nextWord}`;
    }

    const minuteWord = this.numberToWordExact(m);
    return hour12 === 1
      ? `Es la una y ${minuteWord}`
      : `Son las ${hourWord} y ${minuteWord}`;
  }

  private numberToWordExact(n: number): string {
    const words: { [k: number]: string } = {
      0: 'cero', 1: 'uno', 2: 'dos', 3: 'tres', 4: 'cuatro',
      5: 'cinco', 6: 'seis', 7: 'siete', 8: 'ocho', 9: 'nueve',
      10: 'diez', 11: 'once', 12: 'doce', 13: 'trece',
      14: 'catorce', 15: 'quince', 16: 'dieciséis',
      17: 'diecisiete', 18: 'dieciocho', 19: 'diecinueve',
      20: 'veinte', 21: 'veintiuno', 22: 'veintidós',
      23: 'veintitrés', 24: 'veinticuatro', 25: 'veinticinco',
      26: 'veintiséis', 27: 'veintisiete', 28: 'veintiocho',
      29: 'veintinueve', 30: 'treinta', 31: 'treinta y uno',
      32: 'treinta y dos', 33: 'treinta y tres', 34: 'treinta y cuatro',
      35: 'treinta y cinco', 36: 'treinta y seis', 37: 'treinta y siete',
      38: 'treinta y ocho', 39: 'treinta y nueve', 40: 'cuarenta',
      41: 'cuarenta y uno', 42: 'cuarenta y dos', 43: 'cuarenta y tres',
      44: 'cuarenta y cuatro', 45: 'cuarenta y cinco', 46: 'cuarenta y seis',
      47: 'cuarenta y siete', 48: 'cuarenta y ocho', 49: 'cuarenta y nueve',
      50: 'cincuenta', 51: 'cincuenta y uno', 52: 'cincuenta y dos',
      53: 'cincuenta y tres', 54: 'cincuenta y cuatro',
      55: 'cincuenta y cinco', 56: 'cincuenta y seis',
      57: 'cincuenta y siete', 58: 'cincuenta y ocho',
      59: 'cincuenta y nueve'
    };
    return words[n] || n.toString();
  }
}