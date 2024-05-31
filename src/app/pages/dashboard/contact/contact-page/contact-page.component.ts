import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {
  
  name: string = '';
  email: string = '';
  message: string = '';
  submitted: boolean = false;

  onSubmit() {
    // You can add your form submission logic here, e.g., sending the form data to a backend server.
    this.submitted = true;

    // Reset form fields
    this.name = '';
    this.email = '';
    this.message = '';
  }


}
