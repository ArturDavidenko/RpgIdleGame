import { Injectable } from '@angular/core';
import { AuthResponse, LoginRequest, RegisterRequest } from './DTOs/Dtos.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(private http: HttpClient) {}

  login(request: LoginRequest) {
    return this.http.post<AuthResponse>(`${environment.apiBaseUrl}/Auth/login`, request);
  }

  register(request: RegisterRequest) {
    return this.http.post<{ message: string }>(`${environment.apiBaseUrl}/Auth/register`, request);
  }
}
