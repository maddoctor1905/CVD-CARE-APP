import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PinCodeTyperComponent} from './pin-code-typer.component';

describe('PinCodeTyperComponent', () => {
  let component: PinCodeTyperComponent;
  let fixture: ComponentFixture<PinCodeTyperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinCodeTyperComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinCodeTyperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
