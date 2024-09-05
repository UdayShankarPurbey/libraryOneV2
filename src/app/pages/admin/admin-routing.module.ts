import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminlayoutComponent } from '../../component/adminlayout/adminlayout.component';
import { ManagementListComponent } from './management-list/management-list.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'login',
    pathMatch : 'full' 
  },
  {
    path : 'login',
    component : AdminloginComponent
  },
  {
    path : 'layout',
    component : AdminlayoutComponent,
    children : [
      {
        path : '',
        component : ManagementListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
