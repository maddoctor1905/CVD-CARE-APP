import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpSubpageComponent } from './otp-subpage.component';

describe('OtpSubpageComponent', () => {
  let component: OtpSubpageComponent;
  let fixture: ComponentFixture<OtpSubpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpSubpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpSubpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
