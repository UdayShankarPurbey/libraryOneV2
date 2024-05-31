import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalLibraryComponent } from './digital-library.component';

describe('DigitalLibraryComponent', () => {
  let component: DigitalLibraryComponent;
  let fixture: ComponentFixture<DigitalLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalLibraryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DigitalLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
