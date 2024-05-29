import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent implements OnInit {

  constructor (
    private router : Router,
    private route: ActivatedRoute,
  ) {
   
   
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      console.log('Current Route Query Params:', queryParams);
    });
    this.route.params.subscribe(params => {
      console.log('Current Route Params:', params);
    });

    const previousUrl = this.getPreviousUrl();
    console.log('Previous URL:', previousUrl);
  }

  getPreviousUrl(): string {
    const currentUrl = this.router.url;
    const navigation = this.router.getCurrentNavigation();
    const previousUrl = navigation?.previousNavigation?.finalUrl?.toString();
    return previousUrl || '/';
  }

  navigateBack(): void {
    const previousUrl = this.getPreviousUrl();
    this.router.navigateByUrl(previousUrl);
  }
}


