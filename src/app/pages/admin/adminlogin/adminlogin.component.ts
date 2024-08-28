import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin/admin.service';

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
  ) {
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      password: ['' , Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle login logic here
      console.log(this.loginForm.value);
      // sessionStorage.setItem('login', '12346')
      // this.router.navigateByUrl('/main');
      this.adminService.loginAdmin(this.loginForm.value).subscribe((data : any) => {
        console.log(data);
      })
    
    } else {
      // Mark all fields as touched to trigger validation messages
      this.loginForm.markAllAsTouched();
    }
  }

}
