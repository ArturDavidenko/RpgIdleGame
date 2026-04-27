import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { InventoryFacade } from "../inventory/facade/inventory-facade.service";

@Injectable({
    providedIn: 'root'
})
export class AuthStateService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router, private inventoryFacade: InventoryFacade) {
    this.bootstrap();
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private hasToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token && token !== 'undefined' && token !== 'null';
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true);

    this.inventoryFacade.init();
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  private bootstrap() {
    const token = localStorage.getItem('token');

    if (token) {
      this.isAuthenticatedSubject.next(true);
      this.inventoryFacade.init();
    }
  }
}