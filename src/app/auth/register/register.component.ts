import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    @Inject(AuthService) private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  async onSubmit() {
    this.errorMsg = '';
    if (this.registerForm.invalid) {
      if (this.registerForm.errors?.['mismatch']) {
        this.errorMsg = 'Las contraseñas no coinciden.';
      } else {
        this.errorMsg = 'Por favor, completa todos los campos correctamente.';
      }
      return;
    }

    const { email, password } = this.registerForm.value;
    try {
      await this.auth.register(email, password);
      // Si registras y quieres que vaya directo al login:
      await this.auth.logout();
      this.router.navigate(['/login']);
    } catch (err: any) {
      this.errorMsg = err.message || 'Error al registrar.';
    }
  }
}