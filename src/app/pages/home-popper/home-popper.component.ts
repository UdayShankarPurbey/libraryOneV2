import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-popper',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './home-popper.component.html',
  styleUrl: './home-popper.component.css'
})
export class HomePopperComponent {
  
  constructor(
    private router : Router
  ) { }

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();


  clickedData(data : any) {
    let routingLink = '/home/' + data;
    this.router.navigateByUrl(routingLink);
    this.closeModal.emit();

  }

}
