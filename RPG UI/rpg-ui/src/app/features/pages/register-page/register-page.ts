import { Component } from '@angular/core';
import { RegisterRequest } from '../../../core/auth/DTOs/Dtos.models';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
    isSubmitting = false;
    isSuccess = false;
    isError = false;

    registerForm!: FormGroup;

    constructor(
      
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.registerForm = this.fb.group({
        email: [
          '',
          [
            Validators.required,
            Validators.maxLength(100),
            Validators.email
          ]
        ],
        userName: [
          '',
          [
            Validators.required,
            Validators.maxLength(50)
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50)
          ]
        ]
      });
    }

    get email() { return this.registerForm.get('email'); }
    get userName() { return this.registerForm.get('userName'); }
    get password() { return this.registerForm.get('password'); }

    onSubmit(): void {
      if (this.isSubmitting) return;

      if (this.registerForm.invalid) {
        this.registerForm.markAllAsTouched();
        return;
      }

      this.isSubmitting = true;
      this.isError = false;

      const request = this.registerForm.value as RegisterRequest;

      this.authService.register(request).subscribe({
        next: () => {
          this.isSuccess = true;
          this.isSubmitting = false;
          //this.router.navigate(['/login']);
        },
        error: () => {
          this.isError = true;
          this.isSubmitting = false;
        }
      });
    }
} 
