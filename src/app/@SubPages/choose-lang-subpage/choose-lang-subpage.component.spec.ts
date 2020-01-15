import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseLangSubpageComponent } from './choose-lang-subpage.component';

describe('ChooseLangSubpageComponent', () => {
  let component: ChooseLangSubpageComponent;
  let fixture: ComponentFixture<ChooseLangSubpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseLangSubpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseLangSubpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
