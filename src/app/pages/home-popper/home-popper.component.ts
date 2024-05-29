import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-popper',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './home-popper.component.html',
  styleUrl: './home-popper.component.css'
})
export class HomePopperComponent {
  data(event : any) {
    console.log(event);
  }

}
