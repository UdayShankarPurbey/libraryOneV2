import { Routes } from '@angular/router';
import { LayoutComponent } from './component/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { guardGuard } from './services/guard/guard.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { BasicEducationComponent } from './pages/basic-education/basic-education.component';
import { CareerDevelopmentComponent } from './pages/career-development/career-development.component';
import { CulturalArchivesComponent } from './pages/cultural-archives/cultural-archives.component';
import { HigherEducationComponent } from './pages/higher-education/higher-education.component';
import { NewspapperArchivesComponent } from './pages/newspapper-archives/newspapper-archives.component';
import { ResearchComponent } from './pages/research/research.component';

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
        path : 'basic_Education',
        component : BasicEducationComponent
      },
      {
        path : 'career_Development',
        component : CareerDevelopmentComponent
      },
      {
        path : 'cultural_Archives',
        component : CulturalArchivesComponent
      },
      {
        path : 'higher_Education',
        component : HigherEducationComponent
      },
      {
        path : 'newsPapper_Archives',
        component : NewspapperArchivesComponent
      },
      {
        path : 'research',
        component : ResearchComponent
      },
    ]
  },
  
  {
    path : '**',
    component : PageNotFoundComponent,
  }
  
];
