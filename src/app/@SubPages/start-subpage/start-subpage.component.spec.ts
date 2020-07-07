import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSubpageComponent } from './start-subpage.component';

describe('ChooseLangSubpageComponent', () => {
  let component: StartSubpageComponent;
  let fixture: ComponentFixture<StartSubpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartSubpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartSubpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
