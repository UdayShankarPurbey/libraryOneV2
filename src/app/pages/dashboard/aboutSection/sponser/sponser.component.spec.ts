import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponserComponent } from './sponser.component';

describe('SponserComponent', () => {
  let component: SponserComponent;
  let fixture: ComponentFixture<SponserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SponserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
