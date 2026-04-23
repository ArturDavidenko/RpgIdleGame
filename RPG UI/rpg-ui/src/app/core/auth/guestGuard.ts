import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthStateService } from "./authState.service";

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {

  constructor(
    private authState: AuthStateService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authState.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}