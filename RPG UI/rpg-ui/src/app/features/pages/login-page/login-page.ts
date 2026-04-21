import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { AuthResponse, LoginRequest } from '../../../core/auth/DTOs/Dtos.models';
import { NgIf } from '@angular/common';
import { AuthStateService } from '../../../core/auth/authState.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  loginForm!: FormGroup;

  isSubmitting = false;
  isError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authState: AuthStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6)]
      ]
    });
  }

  onSubmit(): void {
    if (this.isSubmitting) return;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.isError = false;

    const request = this.loginForm.value as LoginRequest;

    this.authService.login(request)
      .subscribe({
        next: (res: AuthResponse) => {
          localStorage.setItem('token', res.token);

          this.isSubmitting = false;
          this.authState.login(res.token);
          this.router.navigate(['/']);
        },
        error: () => {
          this.isError = true;
          this.isSubmitting = false;
        }
      });
  }
}
