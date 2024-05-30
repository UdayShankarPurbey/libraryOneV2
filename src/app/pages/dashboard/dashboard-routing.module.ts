import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicEducationComponent } from './basic-education/basic-education.component';
import { CareerDevelopmentComponent } from './career-development/career-development.component';
import { CulturalArchivesComponent } from './cultural-archives/cultural-archives.component';
import { HigherEducationComponent } from './higher-education/higher-education.component';
import { NewspapperArchivesComponent } from './newspapper-archives/newspapper-archives.component';
import { ResearchComponent } from './research/research.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path : '',
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
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
