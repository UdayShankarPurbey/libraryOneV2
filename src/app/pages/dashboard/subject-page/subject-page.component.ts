import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-subject-page',
  standalone: true,
  imports: [],
  templateUrl: './subject-page.component.html',
  styleUrl: './subject-page.component.css'
})
export class SubjectPageComponent implements OnInit{

  constructor(
    private activeRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      console.log(params);
    });
    
  }

}
