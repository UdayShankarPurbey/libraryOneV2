import { Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AskHelpComponent } from '../ask-help/ask-help.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    AskHelpComponent
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

  @ViewChild(AskHelpComponent) askhelpModal!: AskHelpComponent;

  openHelpModal(): void {
    this.askhelpModal.showModal();
  }
}
