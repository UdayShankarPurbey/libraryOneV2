import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../../../services/management/management.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-management-list',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzDividerModule,
  ],
  templateUrl: './management-list.component.html',
  styleUrl: './management-list.component.css'
})
export class ManagementListComponent implements OnInit {

  managementList: any = [];

  constructor(
    private management : ManagementService
  ) { }

  ngOnInit(): void {
    this.management.getManagementList().subscribe(
      (res : any) => {
        this.managementList = res?.data;
      },
      (error) => {
        console.error(error);
      }
    )
  }

}
