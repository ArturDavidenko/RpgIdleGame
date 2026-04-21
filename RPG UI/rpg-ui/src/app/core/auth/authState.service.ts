import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthStateService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  private hasToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token && token !== 'undefined' && token !== 'null';
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }
}