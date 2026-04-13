import { Routes } from '@angular/router';
import { TestComponent } from './shared/components/test-component/test-component';
import { MainMenuPage } from './features/pages/main-menu-page/main-menu-page';
import { StashInventoryComponent } from './shared/components/stash-inventory-component/stash-inventory-component';

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
    path: 'StashInventory',
    component: StashInventoryComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
