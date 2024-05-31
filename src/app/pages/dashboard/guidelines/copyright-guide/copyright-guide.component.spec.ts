import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightGuideComponent } from './copyright-guide.component';

describe('CopyrightGuideComponent', () => {
  let component: CopyrightGuideComponent;
  let fixture: ComponentFixture<CopyrightGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyrightGuideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopyrightGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
