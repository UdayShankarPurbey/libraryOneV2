import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-adminlayout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule, 
    NzLayoutModule, 
    NzMenuModule,
    RouterLink,
  ],
  templateUrl: './adminlayout.component.html',
  styleUrl: './adminlayout.component.css'
})
export class AdminlayoutComponent {
  isCollapsed = false;

}
