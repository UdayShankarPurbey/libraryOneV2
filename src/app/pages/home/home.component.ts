import { Component, OnInit } from '@angular/core';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { HomePopperComponent } from '../home-popper/home-popper.component';
import { Router, RouterLink } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NzModalModule,
    RouterLink,
    NzSelectModule,
    FormsModule
  
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{
  selectedValue : string | undefined;

  constructor (
    private modalService: NzModalService,
    private router : Router,

  ) {}
  ngOnInit(): void {
    this.showModal();
  }

  showModal() {
    const modalRef = this.modalService.create({
      nzContent: HomePopperComponent,
      nzFooter: null,
      nzWidth : '80%'
    });

    modalRef.getContentComponent().closeModal.subscribe(() => {
      setTimeout(() => {
        modalRef.destroy(); // Close the modal
      }, 2000); 
    });
  }

  logout() {
    sessionStorage.removeItem('login')
    this.router.navigateByUrl('/');
  }

  searchData() {
    if(this.selectedValue) {
      let routingLink = '/home/' + this.selectedValue;
      this.router.navigateByUrl(routingLink);
    }
  }

  dataLoader(data : any) {
    console.log(data);
  }
}
