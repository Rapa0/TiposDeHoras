// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  /* ---------- vistas públicas ---------- */
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component')
        .then(m => m.RegisterComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./auth/forgot-password/forgot-password.component')
        .then(m => m.ForgotPasswordComponent)
  },

  /* ---------- vista protegida: 10 relojes ---------- */
  {
    path: 'relojes',
    loadComponent: () =>
      import('./clocks/relojes.component')
        .then(m => m.RelojesComponent),
    canActivate: [AuthGuard]
  },

  /* ---------- página de bienvenida ---------- */
  {
    path: '',
    loadComponent: () =>
      import('./shared/welcome.component')
        .then(m => m.WelcomeComponent),
    pathMatch: 'full'
  },

  /* ---------- wildcard ---------- */
  { path: '**', redirectTo: '' }
];