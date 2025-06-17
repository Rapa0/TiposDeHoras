// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { LoginComponent }           from './auth/login/login.component';
import { RegisterComponent }        from './auth/register/register.component';
import { ForgotPasswordComponent }  from './auth/forgot-password/forgot-password.component';
import { WelcomeComponent }         from './shared/welcome.component';
import { RelojesComponent }         from './relojes/relojes.component';
import { AuthGuard }                from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login',           component: LoginComponent },
  { path: 'register',        component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'relojes',
    component: RelojesComponent,
    canActivate: [AuthGuard]
  },
  { path: '',                 component: WelcomeComponent },
  { path: '**',               redirectTo: '' }
];