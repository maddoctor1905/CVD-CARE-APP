import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPhonenumberSubpageComponent } from './enter-phonenumber-subpage.component';

describe('EnterPhonenumberSubpageComponent', () => {
  let component: EnterPhonenumberSubpageComponent;
  let fixture: ComponentFixture<EnterPhonenumberSubpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterPhonenumberSubpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterPhonenumberSubpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
