import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';    // Para *ngIf, etc.
import { RouterModule } from '@angular/router';      // Para routerLink

@Component({
  selector: 'app-header-presentation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-presentation.component.html',
  styleUrls: ['./header-presentation.component.css']
})
export class HeaderPresentationComponent {
  // Se permite que email pueda ser string o null
  @Input() user: { email: string | null } | null = null;
  
  @Output() logout = new EventEmitter<void>();
}