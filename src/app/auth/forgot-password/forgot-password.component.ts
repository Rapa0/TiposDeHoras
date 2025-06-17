// src/app/auth/forgot-password/forgot-password.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup;
  message: string = '';
  errorMsg: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    @Inject(AuthService) private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onSubmit() {
    this.message = '';
    this.errorMsg = '';

    if (this.forgotForm.invalid) return;

    this.isLoading = true;
    const email = this.forgotForm.get('email')?.value;
    try {
      await this.auth.forgotPassword(email);
      this.message = 'Se ha enviado un correo para restablecer tu contraseña.';
    } catch (err: any) {
      this.errorMsg = err.message || 'Error al enviar el correo.';
    } finally {
      this.isLoading = false;
    }
  }
}