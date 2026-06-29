import { Routes } from '@angular/router';
import { TestComponent } from './shared/components/test-component/test-component';
import { MainMenuPage } from './features/pages/main-menu-page/main-menu-page';
import { LoginPage } from './features/pages/login-page/login-page';
import { RegisterPage } from './features/pages/register-page/register-page';
import { AuthGuard } from './core/auth/authGuard';
import { GuestGuard } from './core/auth/guestGuard';
import { InventoryStashPage } from './features/pages/inventory-stash-page/inventory-stash-page';

export const routes: Routes = [
  {
    path: '',
    component: MainMenuPage,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'testPage',
    component: TestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'StashInventory',
    component: InventoryStashPage,
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
