import { Component, OnInit } from '@angular/core';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { HomePopperComponent } from '../home-popper/home-popper.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NzModalModule
  
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{

  constructor (
    private modalService: NzModalService,

  ) {}
  ngOnInit(): void {
    this.showModal();
    
  }

  showModal() {
    this.modalService.create({
      nzContent: HomePopperComponent,
      nzFooter: null,
      nzWidth : '80%'
    });
  }
}
