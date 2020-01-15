import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstInstallPageComponent } from './first-install-page.component';

describe('FirstInstallPageComponent', () => {
  let component: FirstInstallPageComponent;
  let fixture: ComponentFixture<FirstInstallPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstInstallPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstInstallPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
