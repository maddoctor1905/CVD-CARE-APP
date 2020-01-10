import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCollapsileComponent } from './card-collapsile.component';

describe('CardCollapsileComponent', () => {
  let component: CardCollapsileComponent;
  let fixture: ComponentFixture<CardCollapsileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCollapsileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCollapsileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
