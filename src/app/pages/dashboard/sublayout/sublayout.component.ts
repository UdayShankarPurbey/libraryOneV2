
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-sublayout',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './sublayout.component.html',
  styleUrl: './sublayout.component.css'
})
export class SublayoutComponent implements OnInit {

  form : FormGroup;

  constructor(
    private fb : FormBuilder
  ) {
    this.form = this.fb.group({
      language: [''],
      searchData : ['']
    });
    
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(data => {
      //todo : implement changes logic here
      console.log(data);
    })
  }


  searchData() {
    console.log(this.form.value);
  }

}
