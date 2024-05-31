import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor (
    private router : Router,

  ) {}

  logout() {
    sessionStorage.removeItem('login')
    this.router.navigateByUrl('/');
  }

  libraryData() {
    this.router.navigateByUrl('/main');
  }
}
