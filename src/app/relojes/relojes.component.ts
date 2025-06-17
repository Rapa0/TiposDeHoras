// src/app/relojes/relojes.component.ts
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-relojes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './relojes.component.html',
  styleUrls: ['./relojes.component.css']
})
export class RelojesComponent {
  // Creamos un array con valores del 1 al 10.
  relojes: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  constructor(private router: Router) {}

  /**
   * Se puede definir una navegación para cada botón si en el futuro se requiere
   * navegar a la vista específica de cada reloj.
   */
  navigateToReloj(id: number) {
    console.log('Navegando al reloj', id);
    // Por ahora, podrías simplemente hacer algo o habilitar la navegación:
    // this.router.navigate(['/relojes', id]);
  }
}