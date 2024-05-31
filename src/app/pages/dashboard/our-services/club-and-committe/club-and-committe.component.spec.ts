import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubAndCommitteComponent } from './club-and-committe.component';

describe('ClubAndCommitteComponent', () => {
  let component: ClubAndCommitteComponent;
  let fixture: ComponentFixture<ClubAndCommitteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubAndCommitteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClubAndCommitteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
