import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent {
  newsletterForm : FormGroup;
  constructor(
    private fb : FormBuilder
  ) {
    this.newsletterForm = fb.group({
      email : ['']
    });
  }
  getData() {
    console.log(this.newsletterForm.value);
  }

}
