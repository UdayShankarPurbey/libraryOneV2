import { Routes } from '@angular/router';
import { LayoutComponent } from './component/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { guardGuard } from './services/guard/guard.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewPagesComponent } from './pages/view-pages/view-pages.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'general',
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
    path : 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)

  },
  {
    path : 'general',
    component : ViewPagesComponent
  },
  {
    path : '**',
    component : PageNotFoundComponent,
  }
  
];
