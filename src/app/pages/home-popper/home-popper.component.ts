import { Component } from '@angular/core';

@Component({
  selector: 'app-home-popper',
  standalone: true,
  imports: [],
  templateUrl: './home-popper.component.html',
  styleUrl: './home-popper.component.css'
})
export class HomePopperComponent {
  data(event : any) {
    console.log(event);
  }

}
