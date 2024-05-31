import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarauselDataComponent } from './carausel-data.component';

describe('CarauselDataComponent', () => {
  let component: CarauselDataComponent;
  let fixture: ComponentFixture<CarauselDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarauselDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarauselDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
