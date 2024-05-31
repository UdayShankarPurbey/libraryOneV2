import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SublayoutComponent } from './sublayout.component';

describe('SublayoutComponent', () => {
  let component: SublayoutComponent;
  let fixture: ComponentFixture<SublayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SublayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SublayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
