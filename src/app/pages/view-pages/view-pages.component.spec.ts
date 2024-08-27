import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPagesComponent } from './view-pages.component';

describe('ViewPagesComponent', () => {
  let component: ViewPagesComponent;
  let fixture: ComponentFixture<ViewPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
