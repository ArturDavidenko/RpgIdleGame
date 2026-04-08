import { Routes } from '@angular/router';
import { TestComponent } from './shared/components/test-component/test-component';
import { MainMenuPage } from './features/pages/main-menu-page/main-menu-page';

export const routes: Routes = [
  {
    path: '',
    component: MainMenuPage,
    pathMatch: 'full',
  },
  // Тестовая страница
  {
    path: 'testPage',
    component: TestComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
