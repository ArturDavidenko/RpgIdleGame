import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStateService } from '../../../../core/auth/authState.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe, NgIf],
  templateUrl: './header.html',
  standalone: true,
  styleUrl: './header.scss',
})
export class Header {
  private authState = inject(AuthStateService);

  isAuth$ = this.authState.isAuthenticated$;

  logout() {
    this.authState.logout();
  }
}
