import { Routes } from '@angular/router';
import { LayoutComponent } from './component/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { guardGuard } from './services/guard/guard.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path : 'login',
    component  : LoginComponent
  },
  {
    path : 'home',
    canActivate: [guardGuard],
    component : LayoutComponent
  },
  {
    path : '**',
    component : PageNotFoundComponent,
  }
  
];
