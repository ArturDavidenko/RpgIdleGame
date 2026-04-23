import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthStateService } from "./authState.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private authState: AuthStateService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authState.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}