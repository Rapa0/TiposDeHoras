import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderContainerComponent } from './shared/header/header-container/header-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderContainerComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent { }