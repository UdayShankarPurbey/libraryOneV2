import { CommonModule } from '@angular/common';
import { Component, importProvidersFrom, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzCarouselComponent, NzCarouselModule } from 'ng-zorro-antd/carousel';

@Component({
  selector: 'app-view-pages',
  standalone: true,
  imports: [
    CommonModule,
    NzCarouselModule,
    FormsModule,
  ],
  host: { ngSkipHydration: 'true' }, // Verify if this is required and valid for your project
  templateUrl: './view-pages.component.html',
  styleUrl: './view-pages.component.css'
})
export class ViewPagesComponent {
  @ViewChild(NzCarouselComponent) carousel!: NzCarouselComponent;

  constructor (
    private router : Router
  ) {}

  slides = [
    {
      text: `I have been using pagedone for several months now, and I must say that it has made my life a lot easier. The platform's intuitive interface and ease of use have allowed me to manage my finances more effectively and make informed investment decisions. I particularly like the product's auto-tracking feature, which has saved me a lot of time and effort.`
    },
    {
      text: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,`
    },
    {
      text: `One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted.`
    }
  ];

  thumbs = [
    { src: 'https://pagedone.io/asset/uploads/1704349534.png', alt: 'Emily image' },
    { src: 'https://pagedone.io/asset/uploads/1704349572.png', alt: 'Ethan image' },
    { src: 'https://pagedone.io/asset/uploads/1704349514.png', alt: 'Olivia image' }
  ];

  selectSlide(index: number): void {
    if (this.carousel) {
      this.carousel.goTo(index);
    }
  }

  onCarouselChange(index: number): void {
    console.log('Current slide index:', index);
  }

  redirection(route : any) {
    this.router.navigateByUrl(`/${route}`);
  }
  

}
