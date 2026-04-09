import { Routes } from '@angular/router';
import { TestComponent } from './shared/components/test-component/test-component';
import { MainMenuPage } from './features/pages/main-menu-page/main-menu-page';
import { UserInventoryComponent } from './shared/components/user-inventory-component/user-inventory-component';

export const routes: Routes = [
  {
    path: '',
    component: MainMenuPage,
    pathMatch: 'full',
  },
  {
    path: 'testPage',
    component: TestComponent,
  },
  {
    path: 'UserInventory',
    component: UserInventoryComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
