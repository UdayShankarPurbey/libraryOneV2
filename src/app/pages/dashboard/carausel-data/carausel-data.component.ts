import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carausel-data',
  standalone: true,
  imports: [],
  templateUrl: './carausel-data.component.html',
  styleUrl: './carausel-data.component.css'
})
export class CarauselDataComponent implements OnInit{

  constructor(
    private activeRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      console.log(params);
    });
    
  }

}
