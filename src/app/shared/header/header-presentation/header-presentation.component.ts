import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-presentation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-presentation.component.html',
  styleUrls: ['./header-presentation.component.css']
})
export class HeaderPresentationComponent {
  // Permite que user sea null (cuando no hay usuario) o tenga la propiedad email
  @Input() user: { email: string | null } | null = null;
  @Output() logout = new EventEmitter<void>();
}