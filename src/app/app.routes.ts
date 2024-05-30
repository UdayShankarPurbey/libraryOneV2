import { Routes } from '@angular/router';
import { LayoutComponent } from './component/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { guardGuard } from './services/guard/guard.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';

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
    path : 'main',
    component : HomeComponent
  },
  {
    path : 'home',
    canActivate: [guardGuard],
    component : LayoutComponent,
    children : [
      {
        path : '',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  
  {
    path : '**',
    component : PageNotFoundComponent,
  }
  
];
