import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayScrollerComponent } from './day-scroller.component';

describe('DayScrollerComponent', () => {
  let component: DayScrollerComponent;
  let fixture: ComponentFixture<DayScrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayScrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
