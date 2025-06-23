import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSliderComponent } from '../time-slider/time-slider.component';

@Component({
  selector: 'app-ripple-clock',
  standalone: true,
  imports: [CommonModule, TimeSliderComponent],
  templateUrl: './ripple-clock.component.html',
  styleUrls: ['./ripple-clock.component.css']
})
export class RippleClockComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationId: number = 0;
  // El offset en milisegundos que se obtiene con el slider.
  private offsetMs: number = 0;
  // La hora actual ajustada (sistema + offset).
  currentTime: Date = new Date();

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    // Iniciamos el reloj con la hora actual.
    this.currentTime = new Date();
  }

  ngAfterViewInit(): void {
    const canvasEl = this.canvas.nativeElement;
    // Se fija el tamaño del canvas.
    canvasEl.width = 800;
    canvasEl.height = 400;
    this.ctx = canvasEl.getContext('2d')!;
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
  }

  /**
   * Se invoca cuando el slider emite un nuevo valor.
   * Ajusta el offset respecto al tiempo real.
   */
  onTimeChange(adjusted: Date): void {
    this.offsetMs = adjusted.getTime() - Date.now();
  }

  /**
   * Bucle de animación que se ejecuta en cada frame.
   * Actualiza la hora actual usando el offset y redibuja en el canvas.
   */
  private animate(): void {
    this.animationId = requestAnimationFrame(() => {
      this.zone.run(() => {
        // La hora actual es la del sistema ajustada con el offset.
        this.currentTime = new Date(Date.now() + this.offsetMs);
        this.draw();
      });
      this.animate();
    });
  }

  /**
   * Dibuja en el canvas tres ondas senoidales para representar horas, minutos y segundos.
   */
  private draw(): void {
    const canvasEl = this.canvas.nativeElement;
    const ctx = this.ctx;
    const width = canvasEl.width;
    const height = canvasEl.height;

    // Limpia el canvas.
    ctx.clearRect(0, 0, width, height);
    // Fondo oscuro.
    ctx.fillStyle = '#001';
    ctx.fillRect(0, 0, width, height);

    // Extraer componentes del tiempo.
    const hours = this.currentTime.getHours();
    const minutes = this.currentTime.getMinutes();
    const seconds = this.currentTime.getSeconds();
    const ms = this.currentTime.getMilliseconds();

    // Dibuja onda de horas: movimiento muy lento.
    this.drawSineWave(ctx, 0.005, (hours / 24) * Math.PI * 2, '#FFD700', 0.5, 50);
    // Onda de minutos: movimiento intermedio.
    this.drawSineWave(ctx, 0.01, (minutes / 60) * Math.PI * 2, '#00C8FF', 0.5, 30);
    // Onda de segundos: movimiento rápido (suavizado con milisegundos).
    this.drawSineWave(ctx, 0.02, ((seconds + ms / 1000) / 60) * Math.PI * 2, '#C800FF', 0.7, 10);

    // Dibuja la hora digital en la parte inferior.
    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#fff';
    const timeText = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
    ctx.fillText(timeText, 20, height - 30);
  }

  /**
   * Dibuja una onda senoidal en el canvas.
   * @param ctx Contexto del canvas.
   * @param freq Frecuencia de la onda.
   * @param phase Fase inicial de la onda.
   * @param color Color de la línea.
   * @param amplitudeFactor Factor para escalar la amplitud.
   * @param verticalOffset Desplazamiento vertical adicional.
   */
  private drawSineWave(
    ctx: CanvasRenderingContext2D,
    freq: number,
    phase: number,
    color: string,
    amplitudeFactor: number,
    verticalOffset: number
  ): void {
    const canvasEl = this.canvas.nativeElement;
    const width = canvasEl.width;
    const height = canvasEl.height;
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      // La posición Y se calcula para generar una onda suave.
      const y = verticalOffset + amplitudeFactor * 20 * Math.sin(freq * x + phase) + (height / 2 - 50);
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  /**
   * Formatea un número para que tenga dos dígitos.
   */
  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }
}