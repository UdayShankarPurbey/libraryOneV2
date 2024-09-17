import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
@Component({
  selector: 'app-management-modal',
  standalone: true,
  imports: [
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule
  ],
  templateUrl: './management-modal.component.html',
  styleUrl: './management-modal.component.css'
})
export class ManagementModalComponent {
  validateForm: FormGroup;

  constructor(
    private fb : FormBuilder,
  ) { 
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      image: ['', [Validators.required]]
    });
  }

  handleChange(event : any) {
    // You can use event.target.files to get the selected file
    console.log(event.target.files);
  }


}
