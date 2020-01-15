import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FirstInstallLayoutComponent} from './default-layout.component';

describe('DefaultLayoutComponent', () => {
  let component: FirstInstallLayoutComponent;
  let fixture: ComponentFixture<FirstInstallLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FirstInstallLayoutComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstInstallLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
