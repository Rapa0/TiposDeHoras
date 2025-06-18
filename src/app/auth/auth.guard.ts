import { Injectable } from '@angular/core';
import {
  CanActivate, Router, UrlTree,
  ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {

    // espera a que Firebase emita su primer authState
    await firstValueFrom(this.auth.ready$);

    return this.auth.currentUser
      ? true
      : this.router.createUrlTree(
          ['/login'],
          { queryParams: { returnUrl: state.url } }
        );
  }
}