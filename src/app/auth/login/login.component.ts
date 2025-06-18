import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    this.errorMsg = '';
    if (this.loginForm.invalid) {
      this.errorMsg = 'Por favor completa todos los campos.';
      return;
    }
    const { email, password } = this.loginForm.value;
    try {
      await this.auth.login(email, password);
      this.router.navigate(['/']);
    } catch {
      this.errorMsg = 'Credenciales incorrectas.';
    }
  }
}