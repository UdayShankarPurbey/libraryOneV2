import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspapperArchivesComponent } from './newspapper-archives.component';

describe('NewspapperArchivesComponent', () => {
  let component: NewspapperArchivesComponent;
  let fixture: ComponentFixture<NewspapperArchivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewspapperArchivesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewspapperArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
