import { Routes } from '@angular/router';
import { TestComponent } from './shared/components/test-component/test-component';
import { MainMenuPage } from './features/pages/main-menu-page/main-menu-page';
import { StashInventoryComponent } from './shared/components/stash-inventory-component/stash-inventory-component';
import { LoginPage } from './features/pages/login-page/login-page';
import { RegisterPage } from './features/pages/register-page/register-page';
import { AuthGuard } from './core/auth/authGuard';
import { GuestGuard } from './core/auth/guestGuard';

export const routes: Routes = [
  {
    path: '',
    component: MainMenuPage,
    pathMatch: 'full',
  },
  {
    path: 'testPage',
    component: TestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'StashInventory',
    component: StashInventoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginPage,
    canActivate: [GuestGuard],
  },
  {
    path: 'register',
    component: RegisterPage,
    canActivate: [GuestGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
