import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="welcome-container">
      <h1>Bienvenido</h1>
      <p class="welcome-message">
        Estás logeado en una página de relojes, felicitaciones
      </p>
    </div>
  `,
  styles: [`
    .welcome-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
    }
    h1 {
      margin-bottom: 1rem;
      font-size: 2.5rem;
    }
    .welcome-message {
      font-size: 1.5rem;
      color: #444;
    }
  `]
})
export class WelcomeComponent { }