import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePopperComponent } from './home-popper.component';

describe('HomePopperComponent', () => {
  let component: HomePopperComponent;
  let fixture: ComponentFixture<HomePopperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePopperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
