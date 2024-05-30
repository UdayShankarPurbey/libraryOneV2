import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalArchivesComponent } from './cultural-archives.component';

describe('CulturalArchivesComponent', () => {
  let component: CulturalArchivesComponent;
  let fixture: ComponentFixture<CulturalArchivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CulturalArchivesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CulturalArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
