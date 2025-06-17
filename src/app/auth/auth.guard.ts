// src/app/auth/auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { AuthService } from './services/auth.service';  // tu servicio de autenticación

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // Supongamos que your AuthService expone currentUser o isLoggedIn
    if (this.auth.currentUser) {
      return true;   // puede acceder
    }
    // No está logeado → redirige a login, puedes pasar returnUrl si lo deseas
    return this.router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }
}