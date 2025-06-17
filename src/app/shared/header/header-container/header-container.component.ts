import { Component } from '@angular/core';
import { HeaderPresentationComponent } from '../header-presentation/header-presentation.component';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderPresentationComponent],
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.css']
})
export class HeaderContainerComponent {
  constructor(public auth: AuthService) {}
}