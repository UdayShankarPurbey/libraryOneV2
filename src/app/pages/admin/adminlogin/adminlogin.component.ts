import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {
  
  loginForm : FormGroup;

  constructor(
    private fb : FormBuilder ,
    private router : Router,
    private adminService : AdminService,
    private message: NzMessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      password: ['' , Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.adminService.loginAdmin(this.loginForm.value)
      .subscribe(
        (res: any) => {
          console.log(res.data); // Handle successful response
          sessionStorage.setItem('accessTokenAdmin', res.data.accessToken);
          this.router.navigateByUrl('/admin/layout');
        },
        (error : any) => {
          console.error('Error occurred:', error.error); // Handle error response
          this.message.error(error?.error?.message); 
        }
      );
    } else {
      // Mark all fields as touched to trigger validation messages
      this.loginForm.markAllAsTouched();
    }
  }

}
