import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekScrollerComponent } from './day-scroller.component';

describe('DayScrollerComponent', () => {
  let component: WeekScrollerComponent;
  let fixture: ComponentFixture<WeekScrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekScrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
