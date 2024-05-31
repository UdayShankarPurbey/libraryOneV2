import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic-page',
  standalone: true,
  imports: [],
  templateUrl: './topic-page.component.html',
  styleUrl: './topic-page.component.css'
})
export class TopicPageComponent implements OnInit{

  constructor(
    private activeRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      console.log(params);
    });
    
  }

}
